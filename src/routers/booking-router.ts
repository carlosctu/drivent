import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createNewBooking, getUserBooking, updateUserBooking } from "@/controllers";
import { bookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getUserBooking)
  .post("/", validateBody(bookingSchema), createNewBooking)
  .put("/:bookingId", validateBody(bookingSchema), updateUserBooking);

export { bookingRouter };
