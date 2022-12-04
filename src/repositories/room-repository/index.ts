import { prisma } from "@/config";

async function countAvailableVacancies(roomId: number) {
  return prisma.room.count({
    where: { id: roomId },
  });
}

async function listRoom(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
  });
}

const roomRepository = { countAvailableVacancies, listRoom };

export default roomRepository;
