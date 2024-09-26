import { cookies } from "next/headers";
import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";
import WordArray from "crypto-js/lib-typedarrays";

import { AUTH_NONCE } from "@/lib/constants";

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL as string;
const discourseHost = process.env.DISCOURSE_HOST as string;
const clientSecret = process.env.DISCOURSE_SECRET as string;

export async function POST(_req: Request) {
  const nonce = WordArray.random(16).toString();
  const return_url = `${hostUrl}/authorize`;
  const sso = btoa(`nonce=${nonce}&return_sso_url=${return_url}`);
  const sig = hmacSHA256(sso, clientSecret).toString(Hex);

  cookies().set(AUTH_NONCE, nonce, { maxAge: 60 * 10 });
  return Response.json({
    sso_url: `${discourseHost}/session/sso_provider?sso=${sso}&sig=${sig}`,
  });
}
