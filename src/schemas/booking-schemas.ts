import Joi from "joi";

export const bookingSchema = Joi.object({
  roomid: Joi.number().required(),
});
