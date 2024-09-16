import Joi from "joi";

export const createOwnerInfoSchema = Joi.object({
  fullName: Joi.string().max(100).min(5).required(),
  bio: Joi.string().max(1000).min(10).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().optional(),
  summary: Joi.string().max(30).min(5).required(),
  socialLinks: Joi.array().items(Joi.string()).optional().default([]),
});

export const updateOwnerInfoSchema = Joi.object({
  fullName: Joi.string().max(100).min(5).optional(),
  bio: Joi.string().max(1000).min(10).optional(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().optional(),
  summary: Joi.string().max(30).min(5).optional(),
  socialLinks: Joi.array().items(Joi.string()).optional().default([]),
});
