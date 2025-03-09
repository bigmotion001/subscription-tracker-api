import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this subscription"],
      trim: true,
      maxLength: [20, "Name cannot be more than 20 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this subscription"],

      default: 0.0,
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "NGN"],
      default: "USD",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },

    category:{
        type: String,
        enum: ["Food", "Sports", "Entertainment", "Internet"],
        default: "Internet",
        
    },

    paymentMethod: {
      type: String,
      required: [true, "Please provide a payment method for this subscription"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Cancelled", "Expired"],
      default: "Active",
    },

    startDate: {
      type: Date,
     
      default:new Date()
    },

    renewalDate:{
        type: Date,
      
        validate: {
          validator: function (value) {
            return value > this.startDate;
    
          },
          message: "Renewal date must be after start date",
        },

    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate renewal date if missing.

// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function (next) {
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }
  
    next();
  });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
