import { Authorization } from "@prisma/client";

import { prisma } from "../prisma";

export async function createAuthorization(
  data: Omit<Authorization, "id" | "createdAt" | "updatedAt">,
) {
  await prisma.authorization.create({
    data,
  });
}

export async function findAuthorization(userId: string, clientId: string) {
  return await prisma.authorization.findUnique({
    where: {
      userId_clientId: {
        userId,
        clientId,
      },
    },
  });
}
