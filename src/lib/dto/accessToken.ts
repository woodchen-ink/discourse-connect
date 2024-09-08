import { AccessToken } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createAccessToken(
  data: Omit<AccessToken, "id">,
): Promise<AccessToken> {
  return prisma.accessToken.create({ data });
}

export async function getAccessTokenByToken(token: string) {
  return prisma.accessToken.findUnique({
    where: { token },
    include: { user: true },
  });
}
