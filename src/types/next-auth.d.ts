import { UserRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = User & {
  username?: string;
  avatarUrl?: string;
  role: UserRole;
};

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    avatarUrl?: string;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
