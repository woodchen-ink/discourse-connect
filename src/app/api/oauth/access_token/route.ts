import { NextResponse } from "next/server";

import { createAccessToken } from "@/lib/dto/accessToken";
import { deleteCode, getUnexpiredCodeByCode } from "@/lib/dto/code";
import { generateRandomKey } from "@/lib/utils";

export async function POST(req: Request) {
  const formData = await req.formData();

  // get code
  const code = formData.get("code") as string;
  if (!code) {
    return new NextResponse("Invalid code params.", { status: 400 });
  }
  const authorizeCode = await getUnexpiredCodeByCode(code);
  await deleteCode(code);
  if (!authorizeCode) {
    return new NextResponse("Invalid code credentials.", { status: 400 });
  }

  // verify redirect uri
  if (authorizeCode.client.redirectUri !== formData.get("redirect_uri")) {
    return new NextResponse("Invalid redirect uri.", { status: 400 });
  }

  // generate access token
  const expiresIn = 3600 * 24 * 7;
  const token = "at_" + generateRandomKey(32);
  await createAccessToken({
    token,
    expiresAt: new Date(Date.now() + expiresIn * 1000),
    clientId: authorizeCode.client.id,
    userId: authorizeCode.user.id,
  });

  return Response.json({
    access_token: token,
    expires_in: expiresIn,
    token_type: "bearer",
  });
}
