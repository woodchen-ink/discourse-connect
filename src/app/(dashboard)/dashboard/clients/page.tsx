import { redirect } from "next/navigation";

import { getClientsByUserId } from "@/lib/dto/client";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddClientButton } from "@/components/clients/add-client";

// 创建 Prisma 客户端实例
async function fetchClients(userId: string) {
  return await getClientsByUserId(userId);
}

export default async function ClientsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("sign-in");
  }
  const clients = await fetchClients(user.id as string);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clients</h1>
        <div className="mb-4">
          {/* <Input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        /> */}
        </div>

        <AddClientButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Client Secret Key</TableHead>
            <TableHead>Redirect URI</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.clientId}</TableCell>
              <TableCell>{client.clientSecret}</TableCell>
              <TableCell>{client.redirectUri}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
