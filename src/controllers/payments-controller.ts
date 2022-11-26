import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { PaymentProcess } from "@/protocols";

export async function getPaymentByTicketId(
  req: AuthenticatedRequest,
  res: Response
) {
  const ticketId = req.query.ticketId as string;
  const { userId } = req;

  try {
    const paymentData = await paymentsService.getPaymentByTicketId(
      userId,
      Number(ticketId)
    );
    return res.status(httpStatus.OK).send(paymentData);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postNewPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentProcess = req.body as PaymentProcess;

  try {
    const newProcess = await paymentsService.insertNewPaymentProcess(
      userId,
      paymentProcess
    );
    return res.status(httpStatus.OK).send(newProcess);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
