import { Booking } from ".prisma/client";
import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createBooking(data: Omit<Booking, "id" | "createdAt" | "updatedAt">) {
  return await prisma.booking.create({
    data: {
      ...data,
    },
  });
}
