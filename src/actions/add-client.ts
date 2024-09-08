"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { generateClientKeyId, generateSecretKey } from "@/lib/utils";

export async function AddClientAction(formData: FormData) {
  const name = formData.get("name") as string;
  const home = formData.get("home") as string;
  const logo = formData.get("logo") as string;
  const redirectUri = formData.get("redirectUri") as string;
  const description = formData.get("description") as string;

  const user = await getCurrentUser();

  // Generate a unique client ID and secret
  let clientId = generateClientKeyId();
  while (await findClientByClientId(clientId)) {
    clientId = generateClientKeyId();
  }
  const clientSecret = generateSecretKey();

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        home,
        logo,
        redirectUri,
        description,
        clientId,
        clientSecret,
        userId: user?.id,
      },
    });

    console.log("New client created:", newClient);
    return { success: true, client: newClient };
  } catch (error) {
    console.error("Error creating client:", error);
    return { success: false, error: "Failed to create client" };
  }
}

async function findClientByClientId(clientId: string) {
  return await prisma.client.findUnique({
    where: {
      clientId,
    },
  });
}
