import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
import { workflowClient } from "../config/upstach.js";

export const createSubscription = async (req, res, next) => {
  try {
    //check if user exists
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    //ckecking if user has already subscribed to this plan
    const existingSubscription = await Subscription.findOne({
      name: req.body.name,
      user: req.userId,
    });
    if (existingSubscription)
      return res.status(400).json({
        message: `You have already subscribed to this plan on ${existingSubscription.startDate.toDateString()}`,
      });

    // Get the current date

    const startDate = new Date();

    //peroids

    let renewalPeriod = 1;
    if (req.body.frequency === "monthly") {
      renewalPeriod = 30;
    } else if (req.body.frequency === "daily") {
      renewalPeriod = 1;
    }

    // Calculate the renewal date (e.g., 1 month later)
    const renewalDate = new Date(startDate);
    renewalDate.setDate(startDate.getDate() + renewalPeriod);

    //Format the dates to a readable string (optional)
    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const subscription = await Subscription.create({
      name: req.body.name,
      price: req.body.price,

      currency: req.body.currency,

      frequency: req.body.frequency,
      category: req.body.category,
      paymentMethod: req.body.paymentMethod,
      startDate: formatDate(startDate),
      renewalDate: formatDate(renewalDate),

      user: req.userId,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (err) {
    next(err);
  }
};

//get all subscriptions
export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({})
      .sort()
      .populate({ path: "user", select: "-password" });
    return res.status(200).json({
      message: "Subscription created successfully",
      subscriptions,
    });
  } catch (e) {
    next(e);
  }
};

//get a subscription
export const subscription = async (req, res, next) => {
  try {
    const subId = req.params.id.toString();
    console.log("sub issssss", subId);

    const subscription = await Subscription.findById(subId)
      .sort()
      .populate({ path: "user", select: "-password" });

    //check if subscription exist
    if (!subscription)
      return res.status(401).json({ message: "Subscription does not exist" });

    return res.status(200).json({
      message: "Subscription found successfully",
      subscription,
    });
  } catch (e) {
    next(e);
  }
};

//update a subscription
export const updateSubscription = async (req, res, next) => {
  try {
    const subId = await Subscription.findById(req.params.id);
    console.log(subId.user);
    console.log(req.userId);
    //check if subid exist
    if (!subId) {
      return res.status(400).json({ message: "Invalid Sunscription Id" });
    }
    //check if user is the owner
    if (req.userId.toString() !== subId.user.toString())
      return res.status(400).json({ message: "You can not update this" });
    const updatedSub = await Subscription.findOneAndUpdate({ ...req.body });

    return res.status(200).json({
      message: "Subscription Updated successfully",
      updatedSub,
    });
  } catch (e) {
    next(e);
  }
};
