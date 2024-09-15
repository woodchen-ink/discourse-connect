import { AccessToken } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createAccessToken(
  data: Omit<AccessToken, "id">,
): Promise<AccessToken> {
  return prisma.accessToken.create({ data });
}

export async function getAccessTokenByToken(token: string) {
  const now = new Date();
  return prisma.accessToken.findFirst({
    where: {
      token,
      expiresAt: {
        gt: now,
      },
    },
    include: { user: true },
  });
}
