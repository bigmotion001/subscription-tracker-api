import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowrouter from "./routes/workflow.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware)



app.get("/", (req, res)=>{
    res.send("Welcome subscription tracking api");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflow", workflowrouter);

app.use(errorMiddleware);






app.listen(PORT, async ()=>{
   await connectDB();
    console.log("server running on port " + PORT);
})

export default app;