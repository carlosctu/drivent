import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

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

const ticketRepository = {
  findTicketById,
  updateTicketStatus
};

export default ticketRepository;
