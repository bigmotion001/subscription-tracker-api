import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import connectDB from "./db/db.js";



const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("Welcome subscription tracking api");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/vi/user", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);






app.listen(PORT, async ()=>{
   await connectDB();
    console.log("server running on port " + PORT);
})

export default app;