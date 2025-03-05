import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength:2,
    },
    email:{
        type: String,
        required: [true, "User email is required"],
        trim: true,
        unique:true,
        
        lowercase: true,
       
    },
    password:{
        type: String,
        required: [true, "User password is required"],
        minLength:6,
        maxLength:50,

    }

}, { timestamps: true })

export default mongoose.model("User", userSchema);