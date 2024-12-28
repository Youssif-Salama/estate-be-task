import { AppError, CatchAsyncErrors } from "../../services/error.handler.service.js";
import { decodeToken, verifyToken } from "../../utils/jwt/jwt.utils.js";
import User from "../models/user.model.js";

export const checkUserExistence=(forWhat)=>CatchAsyncErrors(async(req,res,next)=>{
  const {email}=req.body;
  const findUser=await User.findOne({email});
  if(forWhat=="login" && !findUser) throw new AppError("user not found please signup first",404);
  if(forWhat=="signup" && findUser) throw new AppError("user with this email already exists",400);
  next();
})


export const authentication = CatchAsyncErrors(async (req, res, next) => {
  const token = req.header("token");

  if (!token) throw new AppError("Unauthorized access", 401);
  const isValidToken = await verifyToken(token);
    if (!isValidToken) throw new AppError("Unauthorized access", 401);
    const decodedToken=await decodeToken(token);
    req.decodedToken=decodedToken;
    next();
});

export const authorization = (actorRole) => {
  return CatchAsyncErrors((req, res, next) => {
    const { role } = req.decodedToken;

    if (typeof actorRole === "string") {
      if (role === actorRole) {
        next();
      } else {
        throw new AppError("Access denied", 403);
      }
    } else {
      if (actorRole.includes(role)) {
        next();
      } else {
        throw new AppError("Access denied", 403);
      }
    }
  });
};
