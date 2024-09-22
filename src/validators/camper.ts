import Joi from "joi";

export const createCamperSchema = Joi.object({
  name: Joi.string().max(100).min(5).trim().required().messages({
    "string.base": "نام کمپر باید یک رشته باشد.",
    "string.empty": "نام کمپر نمی تواند خالی باشد.",
    "string.min": "نام کمپر حداقل باید 5 حرف داشته باشد.",
    "string.max": "نام کمپر حداکثر باید 100 حرف داشته باشد.",
    "any.required": "نام کمپر اجبار می باشد."
  }),
  price: Joi.number().integer().min(100).required().messages({
    "number.base": "قیمت کمپر باید یک عدد باشد.",
    "number.empty": "قیمت کمپر نمی تواند خالی باشد.",
    "number.min": "قیمت کمپر باید از 100 به بالا باشد.",
    "number.integer": "قیمت کمپر باید عدد صحیح باشد.",
    "any.required": "قیمت کمپر اجباری می باشد.",
  }),
  description: Joi.string().trim().max(1000).min(5).required().messages({
    "string.base": "توضیحات کمپر باید یک رشته باشد.",
    "string.empty": "توضیحات کمپر نمی تواند خالی باشد.",
    "string.min": "توضیحات کمپر حداقل باید 5 حرف داشته باشد.",
    "string.max": "توضیحات کمپر حداکثر باید 1000 حرف داشته باشد.",
    "any.required": "توضیحات کمپر اجباری می باشد."
  }),
});

export const updateCamperSchema = Joi.object({
  name: Joi.string().max(100).min(5).trim().optional().messages({
    "string.base": "نام کمپر باید یک رشته باشد.",
    "string.empty": "نام کمپر نمی تواند خالی باشد.",
    "string.min": "نام کمپر حداقل باید 5 حرف داشته باشد.",
    "string.max": "نام کمپر حداکثر باید 100 حرف داشته باشد.",
  }),
  price: Joi.number().integer().min(100).optional().messages({
    "number.base": "قیمت کمپر باید یک عدد باشد.",
    "number.empty": "قیمت کمپر نمی تواند خالی باشد.",
    "number.min": "قیمت کمپر باید از 100 به بالا باشد.",
    "number.integer": "قیمت کمپر باید عدد صحیح باشد.",
  }),
  description: Joi.string().trim().max(1000).min(5).optional().messages({
    "string.base": "توضیحات کمپر باید یک رشته باشد.",
    "string.empty": "توضیحات کمپر نمی تواند خالی باشد.",
    "string.min": "توضیحات کمپر حداقل باید 5 حرف داشته باشد.",
    "string.max": "توضیحات کمپر حداکثر باید 1000 حرف داشته باشد.",
  }),
});
