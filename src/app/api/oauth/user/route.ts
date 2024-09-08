import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

import { getAccessTokenByToken } from "@/lib/dto/accessToken";

export async function GET(req: Request) {
  const authorization = req.headers.get("Authorization");
  const token = authorization?.slice(7); // remove "Bearer "
  if (!token) {
    return new NextResponse("Invalid access token (code: -1000).", {
      status: 400,
    });
  }
  const accessToken = await getAccessTokenByToken(token);
  if (!accessToken) {
    return new NextResponse("Invalid access token (code: -1001).", {
      status: 400,
    });
  }

  let user = accessToken.user;

  return Response.json({
    id: user.id,
    email: user.email,
    username: user.username,
    admin: user.role == UserRole.ADMIN,
    avatar_url: user.avatarUrl,
    name: user.name,
  });
}
