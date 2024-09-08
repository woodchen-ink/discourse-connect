import { Client } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getClientByClientId(
  clientId: string,
): Promise<Client | null> {
  return prisma.client.findUnique({ where: { clientId } });
}

export async function createClient(data: Omit<Client, "id">): Promise<Client> {
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
    },
  });
}
