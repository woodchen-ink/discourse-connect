"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDiscourseSSOUrl } from "@/actions/discourse-sso-url";

export function Authorizing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<unknown | null>(null);
  const [progress, setProgress] = useState(0);

  const signInCallback = useCallback(async () => {
    try {
      const url = await getDiscourseSSOUrl(searchParams.toString());
      router.push(url);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    // 模拟进度条
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 300);

    // Delay 3s get sso url go to ...
    const timer = setTimeout(signInCallback, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      {error ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">授权异常</h3>
          <p className="text-gray-500">登录失败，请稍后重试！</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            重试
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">正在授权</h3>
          <p className="text-gray-500">获取授权信息中，请稍等...</p>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400">系统正在处理您的请求</p>
        </div>
      )}
    </div>
  );
}
