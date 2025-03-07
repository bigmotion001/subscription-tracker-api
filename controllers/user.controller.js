import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    //check userid from token
    const users = await User.find({}).select("-password");
    if (!users) return res.status(404).json({success: false, message: "User not found" });

    //send the user
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get a user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {   
    res.status(404).json({ message: error.message });
  }
};
