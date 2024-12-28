import {Router} from "express";
import { checkUserExistence } from "../middlewares/auth.middlewares.js";
import { login, signup } from "../../controllers/auth.controllers.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { validateAddUser } from "../validations/user.validations.js";

const authRouter=Router();

// signup
authRouter.post("/signup",validate(validateAddUser),checkUserExistence("signup"),signup);

// login
authRouter.post("/login",checkUserExistence("login"),login)

export default authRouter;