"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddClientAction } from "@/actions/add-client";
import { Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddClientButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await AddClientAction(formData);

    setIsLoading(false);

    if (response.success) {
      setOpen(false);
      router.refresh();
      toast({
        title: "应用创建成功",
        description: "您可以开始使用新创建的应用了",
      });
    } else {
      toast({
        variant: "destructive",
        title: "创建失败",
        description: response.error,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建应用
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>创建新应用</DialogTitle>
            <DialogDescription>
              添加一个新的 OAuth 应用以使用 Q58 Connect 服务
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">应用名称</Label>
              <Input
                id="name"
                name="name"
                placeholder="例如：我的博客"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="home">应用主页</Label>
              <Input
                id="home"
                name="home"
                placeholder="https://example.com"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">应用图标</Label>
              <Input
                id="logo"
                name="logo"
                placeholder="https://example.com/logo.png"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="redirectUri">回调地址</Label>
              <Input
                id="redirectUri"
                name="redirectUri"
                placeholder="https://example.com/oauth/callback"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">应用描述</Label>
              <Input
                id="description"
                name="description"
                placeholder="简单描述一下您的应用"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button type="submit" disabled={isLoading}>
              创建
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
