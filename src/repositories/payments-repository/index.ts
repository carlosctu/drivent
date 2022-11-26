import { Payment } from "@/protocols";
import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function insertTicketPayment(payment: Payment) {
  return prisma.payment.create({
    data: payment,
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  insertTicketPayment,
};

export default paymentRepository;
