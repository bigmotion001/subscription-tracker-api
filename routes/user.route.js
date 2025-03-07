import express from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", verifyToken, getUsers);

router.get("/user", verifyToken, getUser);

router.post("/", (req, res) => {
  res.send("create a new user");
});
router.post("/:id", (req, res) => {
  res.send("update a user");
});
router.delete("/:id", (req, res) => {
  res.send("delete a user");
});

export default router;
