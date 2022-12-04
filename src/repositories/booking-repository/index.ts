import { Booking } from ".prisma/client";
import { prisma } from "@/config";

async function listUserBooking(userId: number) {
  return prisma.booking.findMany({
    where: {
      id: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

//async function insertBooking(data: BookingParams) {
//  return prisma.booking.create({
//    data: {
//      ...data,
//    },
//  });
//}

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
