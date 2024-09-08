import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { getUserById } from "./lib/dto/user";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (!session.user) {
        return session;
      }

      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.username) {
        session.user.username = token.username;
      }
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.picture) {
        session.user.avatarUrl = token.picture;
      }
      if (token.role) {
        session.user.role = token.role;
      }

      session.user.name = token.name;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);
      if (!dbUser) return token;

      token.username = dbUser.username;
      token.email = dbUser.email;
      token.picture = dbUser.avatarUrl;
      token.name = dbUser.name;
      token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
  debug: process.env.NODE_ENV !== "production",
});
