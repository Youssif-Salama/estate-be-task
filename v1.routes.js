import {Router} from "express";
import estateRouter from "./src/modules/routes/estate.routes.js";
import authRouter from "./src/modules/routes/auth.routes.js";
import userRouter from "./src/modules/routes/user.routes.js";

const v1Router=Router();


v1Router.use("/auth",authRouter);
v1Router.use("/user",userRouter);
v1Router.use("/estate",estateRouter);


export default v1Router;