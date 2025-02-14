import { Prisma as PrismaType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getClientByClientId(clientId: string) {
  return prisma.client.findUnique({ where: { clientId } });
}

export async function createClient(
  data: PrismaType.ClientUncheckedCreateInput,
) {
  return prisma.client.create({ data });
}

export async function getClientsByUserId(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      clientId: true,
      clientSecret: true,
      redirectUri: true,
      createdAt: true,
    },
  });
}

export async function getClientById(id: string) {
  return await prisma.client.findUnique({
    where: {
      id,
    },
  });
}
