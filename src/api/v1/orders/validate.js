const { celebrate, Joi, errors, Segments } = require("celebrate");

export const createRules = celebrate({
  [Segments.BODY]: Joi.object().keys({
    items: Joi.array()
      .items({
        unitCost: Joi.number().required(),
        quantity: Joi.number().required(),
        productAttributes: Joi.object(),
        productId: Joi.string().required(),
      })
      .min(1)
      .required(),
  }),
});
