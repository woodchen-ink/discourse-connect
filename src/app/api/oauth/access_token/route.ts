import { NextResponse } from "next/server";

import { createAccessToken } from "@/lib/dto/accessToken";
import { deleteCode, getCodeByCode } from "@/lib/dto/code";
import { generateRandomKey } from "@/lib/utils";

export async function POST(req: Request) {
  const formData = await req.formData();
  const code = formData.get("code") as string;
  if (!code) {
    console.log(`code: ${code}`);
    return new NextResponse("Invalid code credentials.", { status: 400 });
  }
  const authorizeCode = await getCodeByCode(code);
  await deleteCode(code);
  if (!authorizeCode) {
    console.log(`code: ${code}`);
    return new NextResponse("Invalid code credentials.", { status: 400 });
  }
  if (authorizeCode.client.redirectUri !== formData.get("redirect_uri")) {
    console.log(
      `redirectUri: ${authorizeCode.client.redirectUri} !== formData.get("redirect_uri"): ${formData.get("redirect_uri")}`,
    );
    return new NextResponse("Invalid redirect uri.", { status: 400 });
  }

  const expiresIn = 3600 * 24 * 7;
  const token = "tk_" + generateRandomKey();
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
