"use server";

import WordArray from "crypto-js/lib-typedarrays";

import { verify } from "@/lib/discourse-verify";
import { getClientByClientId } from "@/lib/dto/client";
import { createCode } from "@/lib/dto/code";

export async function handleDiscourseCallbackAction(searchParams: string) {
  const params = new URLSearchParams(searchParams);
  const sig = params.get("sig") as string;
  const sso = params.get("sso") as string;
  const oauth = params.get("oauth") as string;

  const user = await verify(sso, sig);
  // code redirect ...
  const oauthParams = new URLSearchParams(atob(oauth));
  const client = await getClientByClientId(
    oauthParams.get("client_id") as string,
  );
  if (!client) {
    throw new Error("Client Id invalid (code: -1004).");
  }

  const redirect_uri = new URL(client.redirectUri);
  if (oauthParams.has("state")) {
    redirect_uri.searchParams.append("state", oauthParams.get("state") || "");
  }
  const code = WordArray.random(32).toString();
  redirect_uri.searchParams.append("code", code);

  // storage
  try {
    await createCode({
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      clientId: client.id,
      userId: user.id,
    });
  } catch {
    throw new Error("Create code error (code: -1005).");
  }

  return redirect_uri.toString();
}
