"use server";

import { cookies } from "next/headers";
import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";
import WordArray from "crypto-js/lib-typedarrays";

import { AUTH_NONCE } from "@/lib/constants";

const appHost = process.env.NEXT_PUBLIC_HOST_URL;
const oauthSecret = process.env.DISCOUSE_SECRET || "";

export async function getDiscourseSSOUrl(searchParams: string) {
  console.log(`searchParams: ${searchParams}`);

  const nonce = WordArray.random(16).toString();
  const return_url = `${appHost}/discourse/callback?oauth=${btoa(searchParams)}`;
  const sso = btoa(`nonce=${nonce}&return_sso_url=${encodeURI(return_url)}`);
  const sig = hmacSHA256(sso, oauthSecret).toString(Hex);
  cookies().set(AUTH_NONCE, nonce, { maxAge: 60 * 10 });

  return `https://shuzimumin.com/session/sso_provider?sso=${sso}&sig=${sig}`;
}
