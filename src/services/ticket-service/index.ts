import { notFoundError } from "@/errors";
import { TicketType } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getAllTicketTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.findAllTicketsTypes();
  return result;
}

async function getAllUserTickets(userId: number) {
  const enrollmentData = await enrollmentRepository.findWithAddressByUserId(
    userId
  );

  if (!enrollmentData) throw notFoundError();

  const userTickets = await ticketRepository.findAllTicketsByUser(
    enrollmentData.id
  );

  if (!userTickets) throw notFoundError();

  return userTickets;
}

const ticketService = {
  getAllTicketTypes,
  getAllUserTickets,
};

export default ticketService;
