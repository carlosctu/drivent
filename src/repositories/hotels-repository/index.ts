import { HotelRooms } from "./../../protocols";
import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany({});
}

async function findAllHotelRooms(hotelId: number): Promise<HotelRooms[]> {
  return prisma.hotel.findMany({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

const hotelsRepository = { findAllHotels, findAllHotelRooms };

export default hotelsRepository;
