import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";

async function validateRoom(roomId: number) {
  const result = await roomRepository.listRoom(roomId);
  if (!result) throw notFoundError();
}

async function validateRoomVacancies(roomId: number) {
  const { capacity } = await roomRepository.listAvailableVacancies(roomId);

  if (capacity <= 0) throw forbiddenError();
}

async function getBooking(userId: number) {
  const result = await bookingRepository.listUserBooking(userId);

  if (!result.Room) throw notFoundError();

  return result;
}

async function insertBooking(roomId: number, userId: number) {
  await validateRoom(roomId);

  const userTicket = await ticketRepository.listUserTickets(userId);

  if (userTicket.TicketType.isRemote || userTicket.status == "RESERVED" || !userTicket.TicketType.includesHotel)
    throw forbiddenError();

  await validateRoomVacancies(roomId);

  const result = await bookingRepository.upsertUserBooking({ roomId, userId });

  return result;
}

async function updateBooking(userId: number, id: number, roomId: number) {
  await validateRoom(roomId);

  const hasBooking = await bookingRepository.listUniqueBooking(id);

  if (!hasBooking) throw notFoundError();
  if (hasBooking.userId !== userId) throw forbiddenError();

  await validateRoomVacancies(roomId);

  const result = await bookingRepository.updateUserBooking(id, roomId);

  return result;
}

const bookingService = {
  getBooking,
  insertBooking,
  updateBooking,
};

export default bookingService;
