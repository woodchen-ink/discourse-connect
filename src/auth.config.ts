import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";
import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { AUTH_NONCE } from "@/lib/constants";
import { createUser, getUserById, updateUser } from "@/lib/dto/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        sso: {},
        sig: {},
      },
      authorize: async (credentials) => {
        const DISCOUSE_SECRET = process.env.DISCOUSE_SECRET as string;
        const sso = credentials.sso as string;
        const sig = credentials.sig;
        // 校验数据正确性
        if (hmacSHA256(sso, DISCOUSE_SECRET).toString(Hex) != sig) {
          throw new Error("Request params is invalid  (code: -1001).");
        }
        // 校验 nonce
        const cookieStore = cookies();
        let searchParams = new URLSearchParams(atob(sso as string));
        const nonce = searchParams.get("nonce");
        if (!cookieStore.has(AUTH_NONCE) || !nonce) {
          throw new Error("Request params is invalid (code: -1002).");
        }
        if (cookieStore.get(AUTH_NONCE)?.value != nonce) {
          throw new Error("Request params is invalid (code: -1003).");
        }
        cookieStore.delete(AUTH_NONCE);

        const id = searchParams.get("external_id");
        const email = searchParams.get("email");
        const username = searchParams.get("username");
        const name = searchParams.get("name");
        const avatarUrl = searchParams.get("avatar_url");
        const isAdmin = searchParams.get("admin") == "true";
        if (!id || !email || !username) {
          throw new Error("User not found.");
        }

        // 查数据库是否有人
        let dbUser = await getUserById(id);
        if (dbUser) {
          // 更新
          dbUser = await updateUser(id, {
            username,
            email,
            name,
            avatarUrl,
            role: isAdmin ? UserRole.ADMIN : UserRole.USER,
            updatedAt: new Date(),
          });
        } else {
          // 创建
          dbUser = await createUser({
            id,
            username,
            email,
            name,
            avatarUrl,
            role: isAdmin ? UserRole.ADMIN : UserRole.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        return dbUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
