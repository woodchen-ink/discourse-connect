"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/user-authorize";
import { useSession } from "next-auth/react";

interface UserAuthorizeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>;
}

export function UserAuthorize({
  className,
  data,
  ...props
}: UserAuthorizeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>(null);
  const { update } = useSession();
  const router = useRouter();

  const signInCallback = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await signIn({ ...data, redirectTo: "/dashboard" });
      // 更新 session
      await update();
      router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [data, isLoading, update, router]);

  useEffect(() => {
    const timer = setTimeout(signInCallback, 5);
    return () => {
      clearTimeout(timer);
    };
  }, [signInCallback]);

  return (
    <>
      {error ? (
        <p className="text-center">登录异常，授权失败！</p>
      ) : (
        <p className="text-center">账号信息验证中，准备跳转中，请稍等...</p>
      )}
    </>
  );
}
