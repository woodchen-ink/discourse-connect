import { Code } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createCode(data: Omit<Code, "id" | "deletedAt">) {
  return prisma.code.create({ data });
}

export async function getUnexpiredCodeByCode(code: string) {
  const now = new Date();
  return prisma.code.findFirst({
    where: {
      code,
      expiresAt: { gt: now },
      deletedAt: null,
    },
    include: { client: true, user: true },
  });
}

export async function deleteCode(code: string) {
  await prisma.code.update({
    where: { code },
    data: { deletedAt: new Date() },
  });
}
