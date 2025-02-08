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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base text-muted-foreground">
            管理您的 OAuth 应用程序
          </h2>
        </div>
        <AddClientButton />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">应用名称</TableHead>
              <TableHead className="w-[200px]">Client ID</TableHead>
              <TableHead className="w-[200px]">Client Secret</TableHead>
              <TableHead>回调地址</TableHead>
              <TableHead className="w-[140px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="font-mono text-sm">
                  {client.clientId}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {client.clientSecret}
                </TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {client.redirectUri}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      编辑
                    </Button>
                    <Button variant="destructive" size="sm">
                      删除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
