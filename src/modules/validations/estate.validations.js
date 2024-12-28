import Joi from "joi";

export const validateAddEstate = Joi.object({
    name: Joi.string().trim().required().label("Estate Name"),
    type: Joi.string()
      .valid("residential", "commercial", "industrial")
      .required()
      .label("Estate Type"),
    location: Joi.object({
      address: Joi.string().required().label("Address"),
      city: Joi.string().required().label("City"),
      state: Joi.string().required().label("State"),
      postalCode: Joi.string()
        .pattern(/^\d{5}(-\d{4})?$/)
        .required()
        .label("Postal Code"),
    }).required(),
    price: Joi.number().min(0).required().label("Price"),
    description: Joi.string().max(500).optional().label("Description"),
    userId: Joi.string().required().label("User ID"),
  });


export const validateUpdateEstate =Joi.object({
    name: Joi.string().trim().optional().label("Estate Name"),
    type: Joi.string()
      .valid("residential", "commercial", "industrial")
      .optional()
      .label("Estate Type"),
    location: Joi.object({
      address: Joi.string().optional().label("Address"),
      city: Joi.string().optional().label("City"),
      state: Joi.string().optional().label("State"),
      postalCode: Joi.string()
        .pattern(/^\d{5}(-\d{4})?$/)
        .optional()
        .label("Postal Code"),
    }).optional(),
    price: Joi.number().min(0).optional().label("Price"),
    description: Joi.string().max(500).optional().label("Description"),
    userId: Joi.string().optional().label("User ID"),
  });
