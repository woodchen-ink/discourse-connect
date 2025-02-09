import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getStats() {
  const [userCount, clientCount] = await Promise.all([
    prisma.user.count(),
    prisma.client.count(),
  ]);

  const clients = await prisma.client.findMany({
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return {
    userCount,
    clientCount,
    recentClients: clients,
  };
}

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const stats = await getStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>用户统计</CardTitle>
            <CardDescription>系统中的总用户数</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.userCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>应用统计</CardTitle>
            <CardDescription>系统中的总应用数</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.clientCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>最近创建的应用</CardTitle>
          <CardDescription>显示最近创建的 10 个应用</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>应用名称</TableHead>
                <TableHead>创建者</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>Client ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.user.username}</TableCell>
                  <TableCell>
                    {new Date(client.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono">{client.clientId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
