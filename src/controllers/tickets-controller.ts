import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/ticket-service";

export async function getAllTicketTypes(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const result = await ticketService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAllTicketsByUser(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { userId } = req;
    const result = await ticketService.getAllUserTickets(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
