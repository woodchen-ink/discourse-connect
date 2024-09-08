"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleDiscourseCallbackAction } from "@/actions/discourse-callback";

export function Authorizing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const signInCallback = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const url = await handleDiscourseCallbackAction(searchParams.toString());
      router.push(url);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(signInCallback, 3);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {error ? (
        <p className="text-center">登录异常，授权失败！</p>
      ) : (
        <p className="text-center"> 授权信息验证，准备跳转中，请稍等...</p>
      )}
    </>
  );
}
