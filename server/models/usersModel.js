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


const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    duedate: {
      type: Date,
      default: null,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const taskModel = mongoose.model("task", taskSchema);
