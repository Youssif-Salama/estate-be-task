import { AppError, CatchAsyncErrors } from "../../services/error.handler.service.js";
import Estate from "../models/estate.model.js";

export const attachUserIdInEstate = CatchAsyncErrors(async(req,res,next)=>{
  const {_id}=req.decodedToken;
  if(!_id) throw new AppError("Unauthorized access",401);
  req.body.userId=_id;
  next();
})


export const checkIfEstateMine=CatchAsyncErrors(async(req,res,next)=>{
  const {_id}=req.decodedToken;
  const {id}=req.params;
  const findEstate=await Estate.findById(id);
  if(!findEstate) throw new AppError("estate not found",404);
  if(_id==findEstate.userId) next();
  else throw new AppError("Unauthorized access",401);
})