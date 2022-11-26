import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
    },
  });
}

export async function createRoom() {
  return prisma.room.createMany({
    data: {
      name: faker.name.findName(),
      hotelId: 1,
      capacity: Number(faker.random.numeric()),
    },
  });
}
