import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
    });

    if (!client) {
      return new Response("Not Found", { status: 404 });
    }

    if (client.userId !== user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const home = formData.get("home") as string;
    const logo = formData.get("logo") as string;
    const redirectUri = formData.get("redirectUri") as string;
    const description = formData.get("description") as string;

    // 验证必填字段
    if (!name || !home || !logo || !redirectUri) {
      return new Response("Missing required fields", { status: 400 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: {
        name,
        home,
        logo,
        redirectUri,
        description,
      },
    });

    return Response.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
    });

    if (!client) {
      return new Response("Not Found", { status: 404 });
    }

    if (client.userId !== user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    // 删除相关的授权记录
    await prisma.authorization.deleteMany({
      where: { clientId: params.id },
    });

    // 删除相关的访问令牌
    await prisma.accessToken.deleteMany({
      where: { clientId: params.id },
    });

    // 删除相关的授权码
    await prisma.code.deleteMany({
      where: { clientId: params.id },
    });

    // 删除客户端
    await prisma.client.delete({
      where: { id: params.id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting client:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
