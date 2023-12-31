import { User } from "../models/User.js"
import  jwt  from "jsonwebtoken"

export const isAuthenticated = async(req,res,next) =>{

    const {token} = req.cookies
    // console.log("got cookies from frontend: ", token)
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Login First"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id)  // this user will be used in next controller function means it will be passed to next()
    next()
} 