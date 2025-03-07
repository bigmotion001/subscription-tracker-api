import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized"});
        }
  try {
    //decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    if(!decoded){
        return res.status(401).json({success: false, message: "Unauthorized, token expired"});
    }
    //extract userid from the decoded token
   
    req.userId = decoded.userId;
    next();
    

    
    
  } catch (error) {
    next(error)
    
  }
}
