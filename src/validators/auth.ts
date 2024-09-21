import Joi from "joi";

export const authSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_]+$/).trim()
    .required()
    .messages({
      "string.base": "نام کاربری باید یک رشته باشد.",
      "string.empty": "نام کاربری نمی تواند خالی باشد.",
      "any.required": "نام کاربری اجباری می باشد.",
      "string.pattern.base": "نام کاربری اشتباه می باشد.",
    }),
  password: Joi.string().max(30).min(8).trim().required().messages({
    "string.base": "کلمه عبور باید یک رشته باشد.",
    "string.empty": "کلمه عبور نمی تواند خالی باشد.",
    "string.max": "کلمه عبور حداکثر باید 30 حرف داشته باشد.",
    "string.min": "کلمه عبور حداقل باید 8 حرف داشته باشد.",
    "any.required": "کلمه عبور اجباری می باشد.",
  }),
});
