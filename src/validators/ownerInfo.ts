import Joi from "joi";

export const createOwnerInfoSchema = Joi.object({
  fullName: Joi.string().max(100).min(5).required().messages({
    "string.base": "نام باید یک رشته باشد.",
    "string.empty": "نام نمی تواند خالی باشد.",
    "string.min": "نام حداقل باید 5 حرف داشته باشد.",
    "string.max": "نام حداکثر باید 100 حرف داشته باشد.",
    "string.required": "نام اجباری می باشد.",
  }),
  bio: Joi.string().max(1000).min(10).required().messages({
    "string.base": "بیوگرافی باید یک رشته باشد.",
    "string.empty": "بیوگرافی نمی تواند خالی باشد.",
    "string.min": "بیوگرافی حداقل باید 10 حرف داشته باشد.",
    "string.max": "بیوگرافی حداکثر باید 1000 حرف داشته باشد.",
    "string.required": "بیوگرافی اجباری می باشد.",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "شماره تلفن باید یک رشته باشد.",
    "string.empty": "شماره تلفن نمی تواند خالی باشد.",
    "string.required": "شماره تلفن اجباری می باشد.",
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
    "string.required": "خلاصه اجباری می باشد.",
  }),
  socialLinks: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "لینک شبکه اجتماعی باید یک رشته باشد.",
        "string.empty": "لینک شبکه اجتماعی نمی تواند خالی باشد.",
      })
    )
    .optional()
    .default([])
    .messages({
      "array.base": "لینک های شبکه اجتماعی باید یک آرایه باشد.",
      "array.empty": "لینک های شبکه اجتماعی نمی تواند خالی باشد.",
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
  phoneNumber: Joi.string().optional().messages({
    "string.base": "شماره تلفن باید یک رشته باشد.",
    "string.empty": "شماره تلفن نمی تواند خالی باشد.",
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
  socialLinks: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "لینک شبکه اجتماعی باید یک رشته باشد.",
        "string.empty": "لینک شبکه اجتماعی نمی تواند خالی باشد.",
      })
    )
    .optional()
    .default([])
    .messages({
      "array.base": "لینک های شبکه اجتماعی باید یک آرایه باشد.",
      "array.empty": "لینک های شبکه اجتماعی نمی تواند خالی باشد.",
    }),
});
