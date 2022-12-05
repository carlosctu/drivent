import { prisma } from "@/config";

async function listAvailableVacancies(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    select: { capacity: true },
  });
}

async function listRoom(roomId: number) {
  return prisma.room.findUnique({
    where: { id: roomId },
  });
}

const roomRepository = { listAvailableVacancies, listRoom };

export default roomRepository;
