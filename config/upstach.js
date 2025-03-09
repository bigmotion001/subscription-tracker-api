import { Client as WorkflowClient } from "@upstash/workflow";
import dotenv from "dotenv";
dotenv.config();

export const workflowClient = new WorkflowClient({
  baseUrl: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
});
