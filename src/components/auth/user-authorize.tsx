"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/user-authorize";
import { useSession } from "next-auth/react";

interface UserAuthorizeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>;
}

interface SignInResult {
  error?: string;
  ok?: boolean;
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
      const result = (await signIn({ ...data })) as SignInResult;
      if (result?.error) {
        setError(result.error);
      } else {
        // 更新 session
        await update();
        // 登录成功后重定向到控制台
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [data, isLoading, update, router]);

  useEffect(() => {
    signInCallback();
  }, [signInCallback]);

  return (
    <>
      {error ? (
        <p className="text-center">登录异常，授权失败！</p>
      ) : (
        <p className="text-center">账号信息验证中，请稍等...</p>
      )}
    </>
  );
}
