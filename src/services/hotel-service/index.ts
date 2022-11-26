import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { Hotel } from "@prisma/client";

async function getHotels(): Promise<Hotel[]> {
  const result = await hotelsRepository.findAllHotels();
  if (!result) throw notFoundError();
  return result;
}

const hotelService = {
  getHotels,
};

export default hotelService;
