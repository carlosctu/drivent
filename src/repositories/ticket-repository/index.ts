import { prisma } from "@/config";
import { TicketStatus, TicketType } from "@prisma/client";

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      TicketType: true,
      Enrollment: true,
    },
  });
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: TicketStatus.PAID },
  });
}

async function findAllTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findAllTicketsByUser(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findTicketById,
  updateTicketStatus,
  findAllTicketsTypes,
  findAllTicketsByUser,
};

export default ticketRepository;
