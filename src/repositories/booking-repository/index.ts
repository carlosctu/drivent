import { Room } from "@prisma/client";
import { Booking } from ".prisma/client";
import { prisma } from "@/config";

export type UserBooking = {
  id: number;
  Room: Room;
};

async function listUserBooking(userId: number): Promise<UserBooking> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function listUniqueBooking(bookingId: number) {
  return prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
}

async function upsertUserBooking(data: Partial<Booking>) {
  return prisma.booking.upsert({
    where: {
      id: data.id || 0,
    },
    create: data as Booking,
    update: {
      roomId: data.roomId,
    },
  });
}

async function updateUserBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: { id },
    data: { roomId },
  });
}
const bookingRepository = {
  listUserBooking,
  upsertUserBooking,
  listUniqueBooking,
  updateUserBooking
};

export default bookingRepository;
