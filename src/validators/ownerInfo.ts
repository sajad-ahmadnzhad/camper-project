import Joi from "joi";

export const createOwnerInfoSchema = Joi.object({
  fullName: Joi.string().max(100).min(5).required().messages({
    "string.base": "نام باید یک رشته باشد.",
    "string.empty": "نام نمی تواند خالی باشد.",
    "string.min": "نام حداقل باید 5 حرف داشته باشد.",
    "string.max": "نام حداکثر باید 100 حرف داشته باشد.",
    "any.required": "نام اجباری می باشد.",
  }),
  bio: Joi.string().max(1000).min(10).required().messages({
    "string.base": "بیوگرافی باید یک رشته باشد.",
    "string.empty": "بیوگرافی نمی تواند خالی باشد.",
    "string.min": "بیوگرافی حداقل باید 10 حرف داشته باشد.",
    "string.max": "بیوگرافی حداکثر باید 1000 حرف داشته باشد.",
    "any.required": "بیوگرافی اجباری می باشد.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
      "string.base": "شماره تلفن باید یک رشته باشد.",
      "string.empty": "شماره تلفن نمی تواند خالی باشد.",
      "any.required": "شماره تلفن اجباری می باشد.",
      "string.pattern.base": "شماره موبایل وارد شده نادرست می باشد.",
    }),
  email: Joi.string().email().optional().messages({
    "string.base": "ایمیل باید یک رشته باشد.",
    "string.empty": "ایمیل نمی تواند خالی باشد.",
    "string.email": "ایمیل نادرست می باشد.",
  }),
  summary: Joi.string().max(30).min(5).required().messages({
    "string.base": "خلاصه باید یک رشته باشد.",
    "string.empty": "خلاصه نمی تواند خالی باشد.",
    "string.min": "خلاصه حداقل باید 5 حرف داشته باشد.",
    "string.max": "خلاصه حداکثر باید 30 حرف داشته باشد.",
    "any.required": "خلاصه اجباری می باشد.",
  }),
  instagram: Joi.string().max(100).optional().messages({
    "string.base": "لینک اینستاگرام باید یک رشته باشد.",
    "string.empty": "لینک اینستاگرام نمی تواند خالی باشد.",
    "string.max": "لینک اینستاگرام حداکثر باید 100 حرف داشته باشد.",
    "any.required": "لینک اینستاگرام اجباری می باشد.",
  }),
  telegram: Joi.string().max(100).optional().messages({
    "string.base": "لینک تلگرام باید یک رشته باشد.",
    "string.empty": "لینک تلگرام نمی تواند خالی باشد.",
    "string.max": "لینک تلگرام حداکثر باید 30 حرف داشته باشد.",
    "any.required": "لینک تلگرام اجباری می باشد.",
  }),
  whatsapp: Joi.string().max(100).optional().messages({
    "string.base": "لینک واتساپ باید یک رشته باشد.",
    "string.empty": "لینک واتساپ نمی تواند خالی باشد.",
    "string.max": "لینک واتساپ حداکثر باید 30 حرف داشته باشد.",
    "any.required": "لینک واتساپ اجباری می باشد.",
  }),
});

export const updateOwnerInfoSchema = Joi.object({
  fullName: Joi.string().max(100).min(5).optional().messages({
    "string.base": "نام باید یک رشته باشد.",
    "string.empty": "نام نمی تواند خالی باشد.",
    "string.min": "نام حداقل باید 5 حرف داشته باشد.",
    "string.max": "نام حداکثر باید 100 حرف داشته باشد.",
  }),
  bio: Joi.string().max(1000).min(10).optional().messages({
    "string.base": "بیوگرافی باید یک رشته باشد.",
    "string.empty": "بیوگرافی نمی تواند خالی باشد.",
    "string.min": "بیوگرافی حداقل باید 10 حرف داشته باشد.",
    "string.max": "بیوگرافی حداکثر باید 1000 حرف داشته باشد.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^09\d{9}$/)
    .optional()
    .messages({
      "string.base": "شماره تلفن باید یک رشته باشد.",
      "string.empty": "شماره تلفن نمی تواند خالی باشد.",
      "string.pattern.base": "شماره موبایل وارد شده نادرست می باشد.",
    }),
  email: Joi.string().email().optional().messages({
    "string.base": "ایمیل باید یک رشته باشد.",
    "string.empty": "ایمیل نمی تواند خالی باشد.",
    "string.email": "ایمیل نادرست می باشد.",
  }),
  summary: Joi.string().max(30).min(5).optional().messages({
    "string.base": "خلاصه باید یک رشته باشد.",
    "string.empty": "خلاصه نمی تواند خالی باشد.",
    "string.min": "خلاصه حداقل باید 5 حرف داشته باشد.",
    "string.max": "خلاصه حداکثر باید 30 حرف داشته باشد.",
  }),
  instagram: Joi.string().max(100).optional().messages({
    "string.base": "آیدی اینستاگرام باید یک رشته باشد.",
    "string.empty": "آیدی اینستاگرام نمی تواند خالی باشد.",
    "string.max": "آیدی اینستاگرام حداکثر باید 100 حرف داشته باشد.",
    "any.required": "آیدی اینستاگرام اجباری می باشد.",
  }),
  telegram: Joi.string().max(100).optional().messages({
    "string.base": "آیدی تلگرام باید یک رشته باشد.",
    "string.empty": "آیدی تلگرام نمی تواند خالی باشد.",
    "string.max": "آیدی تلگرام حداکثر باید 30 حرف داشته باشد.",
    "any.required": "آیدی تلگرام اجباری می باشد.",
  }),
  whatsapp: Joi.string().max(100).optional().messages({
    "string.base": "لینک واتساپ باید یک رشته باشد.",
    "string.empty": "لینک واتساپ نمی تواند خالی باشد.",
    "string.max": "لینک واتساپ حداکثر باید 30 حرف داشته باشد.",
    "any.required": "لینک واتساپ اجباری می باشد.",
  }),
});
