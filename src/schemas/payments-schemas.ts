import Joi from "joi";

export const processValidationSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().min(12).max(16).required(),
    name: Joi.string().min(3).required(),
    expirationDate: Joi.string().min(5).required(),
    cvv: Joi.string().min(3).required(),
  }).required(),
});
