//middleware to protect routes
import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.headers.token;

        const decoded= jwt.verify (token, process.env.JWT_SECRET)
        console.log("decoded JWT:", decoded);
        const user = await User.findById(decoded.userID).select("-password");
        console.log("user found:", user);
        if(!user) return res.json({success: false, message:"User not found"});

        req.user =user;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
        
    }
}