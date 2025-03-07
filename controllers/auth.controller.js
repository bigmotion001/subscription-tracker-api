import User from "../models/user.model.js";

import bycrypt from "bcryptjs";
import { generateToken } from "../utilis/generateToken.js";

//register user
export const Register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    //check if all fields are filled
    if (!name || !email || !password) {
      const error = new Error("Please fill in all fields");
      error.status = 409;
      throw error;
    }

    //**check if user exists */
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }

    //check if email is email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error("Invalid email format");
      error.status = 409;
      throw error;
    }

    //check if password is greater than 6 characters
    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters");
      error.status = 409;
      throw error;
    }

    //hash password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    //create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //check if user is created
    if (newUser) {
      //generate token
      const token = generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "User Registered successfully",
        data: {
          ...newUser._doc,
          password: undefined,
          token,
        },
        
      });
    }
  } catch (err) {
    next(err);
  }
};

// //login user
export const Login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        //check if all fields are filled
        if(!email || !password){
            const error = new Error("Please fill in all fields");
            error.status = 409;
            throw error;
        }
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            const error = new Error("User does not exist");
            error.status = 409;
            throw error;
        }
        //check if password is correct
        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch){
            const error = new Error("Password is incorrect");
            error.status = 409;
            throw error;
        }
    //generate token
    const token = generateToken(user._id, res);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            ...user._doc,
            password: undefined,
            token,
        },
    });

    }catch(err){
        next(err)
    }
};

// //logout user
export const Logout = async (req, res, next) => {
    try{
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });

    }catch(err){
        next(err)
    }
};
