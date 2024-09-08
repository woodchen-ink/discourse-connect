"use server";

import { createClient, getClientByClientId } from "@/lib/dto/client";
import { getCurrentUser } from "@/lib/session";
import { generateRandomKey, generateSecretWords } from "@/lib/utils";

export async function AddClientAction(formData: FormData) {
  const name = formData.get("name") as string;
  const home = formData.get("home") as string;
  const logo = formData.get("logo") as string;
  const redirectUri = formData.get("redirectUri") as string;
  const description = formData.get("description") as string;

  const user = await getCurrentUser();

  // Generate a unique client ID and secret
  let clientId = generateRandomKey();
  while (await getClientByClientId(clientId)) {
    clientId = generateRandomKey();
  }
  const clientSecret = generateSecretWords();

  try {
    const newClient = await createClient({
      name,
      home,
      logo,
      redirectUri,
      description,
      clientId,
      clientSecret,
      userId: user?.id || "",
    });

    console.log("New client created:", newClient);
    return { success: true, client: newClient };
  } catch (error) {
    console.error("Error creating client:", error);
    return { success: false, error: "Failed to create client" };
  }
}
