import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


export const mongodbConnect = async() => {
    try {
        console.log(process.env.DB_URI);
        await mongoose.connect(`${process.env.DB_URI}/users`);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}
