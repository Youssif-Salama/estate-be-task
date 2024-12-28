import Joi from "joi";

export const validateAddUser =Joi.object({
    fullName: Joi.string()
      .max(100)
      .required()
      .label("Full Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password"),
    role: Joi.string()
      .valid("user", "admin")
      .optional()
      .label("Role"),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .label("Phone"),
  });

export const validateUpdateUser =Joi.object({
    fullName: Joi.string()
      .max(100)
      .optional()
      .label("Full Name"),
    email: Joi.string()
      .email()
      .optional()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .optional()
      .label("Password"),
    role: Joi.string()
      .valid("user", "admin")
      .optional()
      .label("Role"),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .label("Phone"),
  });