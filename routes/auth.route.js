import express from "express";
const router = express.Router();

router.post('/register', (req, res) => {
res.send("Register")	
});
router.post('/login', (req, res) => {
res.send("login")	
});
router.post('/logout', (req, res) => {
res.send("logout")	
});



export default router;