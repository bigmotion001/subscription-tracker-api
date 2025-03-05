import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Get all subscriptions")
})
router.get("/:id", (req, res)=>{
    res.send("Get a subscriptions")
})
router.post("/", (req, res)=>{
    res.send("create a subscriptions")
})
router.put("/:id", (req, res)=>{
    res.send("update a  subscriptions")
})
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