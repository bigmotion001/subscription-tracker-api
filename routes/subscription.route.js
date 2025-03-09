import express from "express";
import { createSubscription, getSubscriptions, subscription, updateSubscription} from "../controllers/subscription.controller.js";

import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getSubscriptions)
router.get("/:id", verifyToken, subscription);

router.post("/", verifyToken, createSubscription)
router.put("/:id", verifyToken, updateSubscription)
router.delete("/:id", (req, res)=>{
    res.send("delete a subscriptions")
})
router.get("/user/:id", (req, res)=>{
    res.send("Get a subscriptions for a user")
})
router.put("/:id/cancel", (req, res)=>{
    res.send("cancel a subscriptions for a user")
})
router.get("/all-upcoming-renewals", (req, res)=>{
    res.send("get all coming renewals subscriptions")
})










export default router;