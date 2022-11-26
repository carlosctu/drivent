import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany({});
}

const hotelsRepository = { findAllHotels };

export default hotelsRepository;
