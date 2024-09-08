import { redirect } from "next/navigation";

import { getClientByClientId } from "@/lib/dto/client";
import { prisma } from "@/lib/prisma";
import { AuthorizationCard } from "@/components/auth/authorization-card";

export interface AuthorizeParams extends Record<string, string> {
  scope: string;
  response_type: string;
  client_id: string;
  redirect_uri: string;
}

export default async function OAuthAuthorization({
  searchParams,
}: {
  searchParams: AuthorizeParams;
}) {
  if (
    !searchParams.response_type ||
    !searchParams.client_id ||
    !searchParams.redirect_uri
  ) {
    throw new Error("Params invalid");
  }

  const client = await getClient({
    clientId: searchParams.client_id,
    redirectUri: searchParams.redirect_uri,
  });

  if (!client) {
    throw new Error("Client not found");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <AuthorizationCard client={client} />
    </div>
  );
}

async function getClient({
  clientId,
  redirectUri,
}: {
  clientId: string;
  redirectUri: string;
}) {
  const client = await getClientByClientId(clientId);

  if (client && client.redirectUri === redirectUri) {
    return client;
  }

  return null;
}
