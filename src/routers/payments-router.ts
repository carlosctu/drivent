import { processValidationSchema } from "./../schemas/payments-schemas";
import {
  getPaymentByTicketId,
  postNewPayment,
} from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(processValidationSchema), postNewPayment);

export { paymentsRouter };
