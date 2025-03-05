import express from "express";
const router = express.Router();
 
router.get("/", (req, res)=>{
    res.send("Get All Users")
})
router.get("/:id", (req, res)=>{
    res.send("Get a single user details")
})
router.post("/", (req, res)=>{
    res.send("create a new user")
})
router.post("/:id", (req, res)=>{
    res.send("update a user")
})
router.delete("/:id", (req, res)=>{
    res.send("delete a user")
})




export default router;