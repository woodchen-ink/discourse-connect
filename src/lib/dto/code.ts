import { Code } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createCode(data: Omit<Code, "id">) {
  return prisma.code.create({ data });
}

export async function getCodeByCode(code: string) {
  return prisma.code.findUnique({
    where: { code },
    include: { client: true, user: true },
  });
}

export async function deleteCode(code: string) {
  await prisma.code.delete({ where: { code } });
}
