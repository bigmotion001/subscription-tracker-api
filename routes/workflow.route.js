import express from "express";
const router = express.Router();
import {sendReminders} from "../controllers/workflow.controller.js";

router.post("/subscription/reminder", sendReminders);





export default router;