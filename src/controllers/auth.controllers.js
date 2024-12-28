import User from "../modules/models/user.model.js";
import { AppError, CatchAsyncErrors } from "../services/error.handler.service.js";
import { comparePassword } from "../utils/bcrypt/bcrypt.utils.js";
import { makeToken } from "../utils/jwt/jwt.utils.js";

const signup=CatchAsyncErrors(async(req,res)=>{
  const {email,password,phone,fullName,role}=req.body;
  const createNewUser=await User.create({email,password,phone,fullName,role});
  if(!createNewUser) throw new AppError("failed to signup",404);
  res.status(201).json({
    message:"signed up successfully"
  })
})



const login=CatchAsyncErrors(async(req,res)=>{
  const {email,password}=req.body;
  const findUser=await User.findOne({email});
  if(!findUser) throw new AppError("email not found",404);
  const isValidPassword=await comparePassword(password,findUser.password);
  if(!isValidPassword) throw new AppError("password is invalid",400);
  const token=await makeToken({_id:findUser._id,role:findUser.role});
  res.status(200).json({
    message:"logged in successfully",
    token
  })
})



export {login,signup};