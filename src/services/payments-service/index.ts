import { PaymentProcess, Payment } from "./../../protocols";
import { notFoundError, requestError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getPaymentByTicketId(
  userId: number,
  ticketId: number
): Promise<Payment> {
  if (!ticketId || isNaN(ticketId)) throw requestError(400, "BadRequest");

  const ticketData = await validateUserTicket(userId, ticketId);

  return paymentRepository.findPaymentByTicketId(ticketData.id);
}

async function insertNewPaymentProcess(
  userId: number,
  paymentProcess: PaymentProcess
): Promise<Payment> {
  if (!paymentProcess.ticketId || !paymentProcess.cardData)
    throw requestError(400, "BadRequest");

  const ticketData = await validateUserTicket(userId, paymentProcess.ticketId);

  const payment = {
    ticketId: paymentProcess.ticketId,
    value: ticketData.TicketType.price,
    cardIssuer: paymentProcess.cardData.issuer,
    cardLastDigits: paymentProcess.cardData.number.toString().slice(-4),
    updatedAt: new Date(),
  } as Payment;

  await ticketRepository.updateTicketStatus(paymentProcess.ticketId);

  return paymentRepository.insertTicketPayment(payment);
}

async function validateUserTicket(userId: number, ticketId: number) {
  const ticketData = await ticketRepository.findTicketById(ticketId);
  if (!ticketData) throw notFoundError();

  if (userId !== ticketData.Enrollment.userId) throw unauthorizedError();
  return ticketData;
}

const paymentsService = {
  getPaymentByTicketId,
  insertNewPaymentProcess,
};

export default paymentsService;
