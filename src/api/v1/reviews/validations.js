import Joi from "@hapi/joi";

export const createReviewValidation = Joi.object({
  body: Joi.string(),
  rating: Joi.number().max(5).min(0).required(),
});
