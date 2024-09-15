import "server-only";

import WordArray from "crypto-js/lib-typedarrays";

import { getClientByClientId } from "@/lib/dto/client";
import { createCode } from "@/lib/dto/code";

export async function getAuthorizeUrl(params: URLSearchParams) {
  // client
  const client = await getClientByClientId(params.get("client_id") as string);
  if (!client) {
    throw new Error("Client Id invalid (code: -1004).");
  }

  // redirect url
  const redirect_uri = new URL(client.redirectUri);
  if (params.has("state")) {
    redirect_uri.searchParams.append("state", params.get("state") || "");
  }
  const code = WordArray.random(32).toString();
  redirect_uri.searchParams.append("code", code);

  // storage code
  try {
    await createCode({
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      clientId: client.id,
      userId: client.userId,
    });
  } catch {
    throw new Error("Create code error (code: -1005).");
  }

  return redirect_uri.toString();
}
