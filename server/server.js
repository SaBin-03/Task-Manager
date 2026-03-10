import dotenv from "dotenv"
import express from "express"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.get("/",(req,res) => {
    return res.status(200).json({success:true,message:"Hello"});
})


app.listen(PORT,()=>{
    console.log("Server Started");
})
