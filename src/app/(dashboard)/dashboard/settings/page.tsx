import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>个人资料</CardTitle>
          <CardDescription>查看和管理您的个人信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium">用户名</p>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">邮箱</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">昵称</p>
            <p className="text-sm text-muted-foreground">{user.name || "-"}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">角色</p>
            <p className="text-sm text-muted-foreground">
              {user.role === "ADMIN" ? "管理员" : "普通用户"}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">论坛版主</p>
            <p className="text-sm text-muted-foreground">
              {user.moderator ? "是" : "否"}
            </p>
          </div>
          {user.groups && user.groups.length > 0 && (
            <div className="grid gap-1">
              <p className="text-sm font-medium">用户组</p>
              <p className="text-sm text-muted-foreground">
                {user.groups.join(", ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
