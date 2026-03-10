import dotenv from "dotenv"
import express from "express"
import serverRouter from "./routes/intialServer.js";
import { mongodbConnect } from "./models/databaseConnect.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.get("/",(req,res) => {
    return res.status(200).json({success:true,message:"Hello"});
})

app.use(serverRouter);

app.listen(PORT,()=>{
    mongodbConnect();
    console.log("Server Started");
})
