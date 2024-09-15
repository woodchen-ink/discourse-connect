import { Suspense } from "react";
import { redirect } from "next/navigation";

import { discourseCallbackVerify } from "@/lib/discourse/verify";
import { findAuthorization } from "@/lib/dto/authorization";
import { getClientByClientId } from "@/lib/dto/client";
import { getAuthorizeUrl } from "@/lib/oauth/authorize-url";
import { AuthorizationCard } from "@/components/auth/authorization-card";

export interface DiscourseCallbackParams extends Record<string, string> {
  sig: string;
  sso: string;
  oauth: string;
}

export default async function DiscourseCallbackPage({
  searchParams,
}: {
  searchParams: DiscourseCallbackParams;
}) {
  const oauthParams = new URLSearchParams(atob(searchParams.oauth));
  // check client info
  const client = await getClientByClientId(
    oauthParams.get("client_id") as string,
  );
  if (!client) {
    throw new Error("Client Id invalid (code: -1004).");
  }

  // verify discourse callback
  const user = await discourseCallbackVerify(
    searchParams.sso,
    searchParams.sig,
  );

  // check authorization
  const authorization = await findAuthorization(user.id, client.id);

  if (authorization) {
    const redirectUrl = await getAuthorizeUrl(oauthParams);
    return redirect(redirectUrl);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Suspense>
          <AuthorizationCard client={client} oauthParams={searchParams.oauth} />
        </Suspense>
      </div>
    </main>
  );
}
