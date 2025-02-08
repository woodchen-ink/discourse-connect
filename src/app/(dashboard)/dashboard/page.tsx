import Link from "next/link";
import { AppWindow, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AppWindow className="h-6 w-6" />
              应用管理
            </CardTitle>
            <CardDescription>
              管理您的 OAuth 应用，查看应用详情和统计信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/clients">
              <Button className="w-full">查看应用</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              账号设置
            </CardTitle>
            <CardDescription>
              管理您的账号信息，包括个人资料和安全设置
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/settings">
              <Button className="w-full" variant="outline">
                设置
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
