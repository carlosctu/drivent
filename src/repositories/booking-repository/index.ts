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

async function upsertUserBooking(data: Partial<Booking>) {
  return prisma.booking.upsert({
    where: {
      id: data.id || 0,
    },
    create: data as Booking,
    update: data,
  });
}

const bookingRepository = {
  listUserBooking,
  upsertUserBooking,
};

export default bookingRepository;
