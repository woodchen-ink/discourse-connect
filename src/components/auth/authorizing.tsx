"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDiscourseSSOUrl } from "@/actions/discourse-sso-url";

export function Authorizing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<unknown | null>(null);

  const signInCallback = useCallback(async () => {
    try {
      const url = await getDiscourseSSOUrl(searchParams.toString());
      router.push(url);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    // Delay 3s get sso url go to ...
    const timer = setTimeout(signInCallback, 3);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {error ? (
        <p className="text-center">授权异常，登录失败！</p>
      ) : (
        <p className="text-center"> 获取授权信息，等待跳转中，请稍等...</p>
      )}
    </>
  );
}
