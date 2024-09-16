import Joi from "joi";

export const createCamperSchema = Joi.object({
  name: Joi.string().max(100).min(5).trim().required(),
  price: Joi.number().integer().min(100).required(),
  description: Joi.string().trim().max(1000).min(5).optional(),
});

export const updateCamperSchema = Joi.object({
  name: Joi.string().max(100).min(5).trim().optional(),
  price: Joi.number().integer().min(100).optional(),
  description: Joi.string().trim().max(1000).min(5).optional(),
});
