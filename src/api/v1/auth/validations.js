import Joi from "@hapi/joi";

export const signupValidation = Joi.object({
  phoneNumber: Joi.string()
    // eslint-disable-next-line no-useless-escape
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .message("Invalid phone number"),
  email: Joi.string().email().required(),
  password: Joi.string().required("Password is required"),
});
