import { getClientByClientId } from "@/lib/dto/client";
import { Authorizing } from "@/components/auth/authorizing";

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
  // params invalid
  if (
    !searchParams.response_type ||
    !searchParams.client_id ||
    !searchParams.redirect_uri
  ) {
    throw new Error("Params invalid");
  }

  // client invalid
  const client = await getClientByClientId(searchParams.client_id);
  if (!client || client.redirectUri !== searchParams.redirect_uri) {
    throw new Error("Client not found");
  }

  // Authorizing ...
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Authorizing />
    </div>
  );
}
