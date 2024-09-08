"use server";

import { signIn as nextSignIn } from "@/auth";

export async function signIn(data: Record<string, any>) {
  return nextSignIn("credentials", data);
}
