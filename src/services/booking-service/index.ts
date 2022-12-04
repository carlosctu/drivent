import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";

async function validateRoom(roomId: number) {
  const result = await roomRepository.listRoom(roomId);
  if (!result) throw notFoundError();
}

async function getBooking(userId: number) {
  const result = await bookingRepository.listUserBooking(userId);

  if (!result) throw notFoundError();

  return result;
}

async function insertBooking(roomId: number, userId: number) {
  await validateRoom(roomId);

  const userTicket = await ticketRepository.listUserTickets(userId);

  if (userTicket.TicketType.isRemote || userTicket.status == "RESERVED" || !userTicket.TicketType.includesHotel)
    throw forbiddenError();

  const result = await bookingRepository.upsertUserBooking({ roomId, userId });

  if (!result) throw notFoundError();

  return result.id;
}

async function updateBooking(userId: number, id: number, roomId: number) {
  await validateRoom(roomId);

  const hasBooking = await getBooking(userId);

  if (!hasBooking) throw notFoundError();

  const roomHasVacancies = await roomRepository.countAvailableVacancies(roomId);

  if (roomHasVacancies <= 0) throw forbiddenError();

  const result = await bookingRepository.upsertUserBooking({ id, roomId });

  if (!result) throw notFoundError();

  return result.id;
}

const bookingService = {
  getBooking,
  insertBooking,
  updateBooking,
};

export default bookingService;
