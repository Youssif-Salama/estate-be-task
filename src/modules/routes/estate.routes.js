import {Router} from "express";
import { authentication, authorization } from "../middlewares/auth.middlewares.js";
import { attachUserIdInEstate, checkIfEstateMine } from "../middlewares/estate.middlewares.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { validateAddEstate } from "../validations/estate.validations.js";
import { attachAddQuery, attachDeleteQuery, attachGetQuery, attachUpdateQuery } from "../../middlewares/Attach.Query.js";
import Estate from "../models/estate.model.js";
import { filterQuery, pagination } from "../../middlewares/features.middlewares.js";
import { execute } from "../../middlewares/Execution.js";

const estateRouter=Router();

// add estate
estateRouter.post("/",authentication,authorization("admin"),attachUserIdInEstate,validate(validateAddEstate),attachAddQuery(Estate),execute(
  {
    status: 201,
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


// get all estates
estateRouter.get("/",attachGetQuery(Estate),pagination(10),execute(
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

// get my estates
estateRouter.get("/mine/:id",authentication,attachGetQuery(Estate),filterQuery({fieldName:"userId",paramName:"id"}),pagination(10),execute(
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

// get one estates
estateRouter.get("/:id",attachGetQuery(Estate),filterQuery({fieldName:"userId",paramName:"id"}),execute(
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


// update estate
estateRouter.put("/:id",authentication,authorization("admin"),checkIfEstateMine,attachUpdateQuery(Estate),filterQuery({fieldName:"_id",paramName:"id"}),execute(
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

// delete estate
estateRouter.delete("/:id",authentication,authorization("admin"),checkIfEstateMine,attachDeleteQuery(Estate),filterQuery({fieldName:"_id",paramName:"id"}),execute(
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

export default estateRouter;