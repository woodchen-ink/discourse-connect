"use server";

import { createAuthorization } from "@/lib/dto/authorization";
import { getAuthorizeUrl } from "@/lib/oauth/authorize-url";

export async function handleAuthorizeAction(
  oauth: string,
  userId: string,
  clientId: string,
  scope: string,
) {
  const oauthParams = new URLSearchParams(atob(oauth));
  const redirectUrl = getAuthorizeUrl(oauthParams);

  // 保存授权
  await createAuthorization({
    userId,
    clientId,
    scope,
  });

  return redirectUrl;
}
