import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


export const mongodbConnect = async() => {
    try {
        await mongoose.connect(`${process.env.DB_URI}/users`);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}
