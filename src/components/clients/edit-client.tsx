"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Client } from ".prisma/client";

interface EditClientFormProps {
  client: Client;
}

export function EditClientForm({ client }: EditClientFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`/api/clients/${client.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("更新失败");
      }

      router.refresh();
      toast({
        title: "更新成功",
        description: "应用信息已更新",
      });
      router.push("/dashboard/clients");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "更新失败",
        description: error instanceof Error ? error.message : "未知错误",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>编辑应用</CardTitle>
        <CardDescription>修改应用的基本信息</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">应用名称</Label>
            <Input
              id="name"
              name="name"
              defaultValue={client.name}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="home">应用主页</Label>
            <Input
              id="home"
              name="home"
              defaultValue={client.home}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="logo">应用图标</Label>
            <Input
              id="logo"
              name="logo"
              defaultValue={client.logo}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="redirectUri">回调地址</Label>
            <Input
              id="redirectUri"
              name="redirectUri"
              defaultValue={client.redirectUri}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">应用描述</Label>
            <Input
              id="description"
              name="description"
              defaultValue={client.description || ""}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/clients")}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button type="submit" disabled={isLoading}>
              保存
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
