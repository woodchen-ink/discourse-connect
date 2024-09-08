"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircleCode } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button";

interface DiscourseData {
  sso_url: string;
}

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const signIn = () => {
    React.startTransition(async () => {
      const response = await fetch("/api/auth/discourse", { method: "POST" });
      if (!response.ok || response.status !== 200) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "内部服务异常",
          description: response.statusText,
        });
      } else {
        let data: DiscourseData = await response.json();
        router.push(data.sso_url);
      }
    });
  };

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsLoading(true);
          signIn();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <MessageCircleCode className="mr-2 size-4" />
        )}{" "}
        数字牧民社区
      </button>
    </div>
  );
}
