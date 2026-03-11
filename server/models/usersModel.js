import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry:{
        type:Date,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isloggedin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:null
    }
  },
  { timestamps: true },
);


export const UserModel = mongoose.model("User",userSchema);
