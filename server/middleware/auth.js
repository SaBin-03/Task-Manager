import jwt from "jsonwebtoken";
import { UserModel } from "../models/usersModel.js";


export const isAuth = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json(
        {success:false,
        message:"No authheader" }
    );


    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.ATOKEN);

        const {id} = decoded;

        const user = await UserModel.findById(id);

        if(!user) return res.status(404).json(
            {
                success:false,
                message :"User Not Found"
            }
        )

        req.UserId = user._id;

        next();

    } catch (error) {
        console.log(error);
    }
}
