import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createNewBooking, getUserBooking, updateUserBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getUserBooking)
  .post("/", createNewBooking)
  .put("/:bookingId", updateUserBooking);

export { bookingRouter };
