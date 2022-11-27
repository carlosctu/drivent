import { HotelRooms } from "./../../protocols";
import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { Hotel } from "@prisma/client";

async function getHotels(): Promise<Hotel[]> {
  const result = await hotelsRepository.findAllHotels();
  if (!result) throw notFoundError();
  return result;
}

async function getRooms(hotelId: number): Promise<HotelRooms[]> {
  const result = await hotelsRepository.findAllHotelRooms(hotelId);
  if (!result) throw notFoundError();
  return result;
}

const hotelService = {
  getHotels,
  getRooms,
};

export default hotelService;
