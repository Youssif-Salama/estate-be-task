import {Router} from "express";
import { authentication } from "../middlewares/auth.middlewares.js";
import { attachDeleteQuery, attachGetQuery, attachUpdateQuery } from "../../middlewares/Attach.Query.js";
import User from "../models/user.model.js";
import { filterQuery, pagination } from "../../middlewares/features.middlewares.js";
import { execute } from "../../middlewares/Execution.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { validateUpdateUser } from "../validations/user.validations.js";

const userRouter=Router();

// get all users
userRouter.get("/",authentication,attachGetQuery(User),pagination(10),execute(
  {
    status: 200,
    result: {
      message: "success"
    }
  },
  {
    status: 400,
    result: {
      message: "fail"
    }
  }
))


// get one user
userRouter.get("/:id",authentication,attachGetQuery(User),filterQuery({ fieldName:"_id", paramName:"id" }),execute(
  {
    status: 200,
    result: {
      message: "success"
    }
  },
  {
    status: 400,
    result: {
      message: "fail"
    }
  }
))

// update my account
userRouter.put("/:id",authentication,validate(validateUpdateUser),attachUpdateQuery(User),filterQuery({ fieldName:"_id", paramName:"id" }),execute(
  {
    status: 200,
    result: {
      message: "success"
    }
  },
  {
    status: 400,
    result: {
      message: "fail"
    }
  }
))


// delete my account
userRouter.delete("/:id",authentication,attachDeleteQuery(User),filterQuery({ fieldName:"_id", paramName:"id" }),execute(
  {
    status: 200,
    result: {
      message: "success"
    }
  },
  {
    status: 400,
    result: {
      message: "fail"
    }
  }
))

export default userRouter;