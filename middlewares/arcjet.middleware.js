import aj from "../config/arcjet.js";

//arcjet middleware
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {requested: 5});
    if (decision.isDenied()) {
        //check rate limit
            if (decision.reason.isRateLimit()) return res.status(429).json({error: "Rate limit exceeded, slow down!"});
            
            //check bot
            if (decision.reason.isBot()) return res.status(403).json({error: "Bots are not allowed!"})
        //none of the above
            return res.status(403).json({error: decision.reason.code|| "Forbidden"})
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default arcjetMiddleware;
