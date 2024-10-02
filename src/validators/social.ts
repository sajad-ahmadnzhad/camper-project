import Joi from "joi";

export const createSocialSchema = Joi.object({
  platform: Joi.string().required().messages({
    "string.base": "شبکه اجتماعی باید یک رشته باشد.",
    "string.empty": "شبکه اجتماعی نمی تواند خالی باشد.",
    "any.required": "شبکه اجتماعی اجباری می باشد.",
  }),
  url: Joi.string().required().messages({
    "string.base": "شبکه اجتماعی باید یک رشته باشد.",
    "string.empty": "شبکه اجتماعی نمی تواند خالی باشد.",
    "any.required": "شبکه اجتماعی اجباری می باشد.",
  }),
});

export const updateSocialSchema = Joi.object({
  platform: Joi.string().optional().messages({
    "string.base": "شبکه اجتماعی باید یک رشته باشد.",
    "string.empty": "شبکه اجتماعی نمی تواند خالی باشد.",
    "any.required": "شبکه اجتماعی اجباری می باشد.",
  }),
  url: Joi.string().optional().messages({
    "string.base": "شبکه اجتماعی باید یک رشته باشد.",
    "string.empty": "شبکه اجتماعی نمی تواند خالی باشد.",
    "any.required": "شبکه اجتماعی اجباری می باشد.",
  }),
});
