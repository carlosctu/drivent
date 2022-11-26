import { getAllTicketsByUser, getAllTicketTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getAllTicketsByUser)
  .get("/types", getAllTicketTypes);

export { ticketsRouter };
