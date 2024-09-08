import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verify } from "./lib/discourse-verify";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        sso: {},
        sig: {},
      },
      authorize: async (credentials) => {
        const sso = credentials.sso as string;
        const sig = credentials.sig as string;
        const user = await verify(sso, sig);
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
