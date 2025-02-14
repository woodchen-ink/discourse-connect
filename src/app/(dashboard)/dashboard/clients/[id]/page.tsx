import { notFound, redirect } from "next/navigation";

import { getClientById } from "@/lib/dto/client";
import { getCurrentUser } from "@/lib/session";
import { EditClientForm } from "@/components/clients/edit-client";

interface EditClientPageProps {
  params: {
    id: string;
  };
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const client = await getClientById(params.id);
  if (!client) {
    notFound();
  }

  // 检查是否是应用的所有者
  if (client.userId !== user.id) {
    redirect("/dashboard/clients");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-base text-muted-foreground">编辑应用</h2>
      </div>

      <EditClientForm client={client} />
    </div>
  );
}
