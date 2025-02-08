import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/layout/nav-bar";
import { ThemeToggle } from "@/components/theme-toggle";

// 动态导入 Logo 组件以避免服务器端渲染错误
const DynamicLogo = dynamic(() => import("@/components/dynamic-logo"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar />
      <main className="flex flex-grow items-center justify-center py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-8 bg-gradient-to-r from-[#25263A] to-[#4A4B68] bg-clip-text text-5xl font-extrabold text-transparent dark:from-[#A0A1B2] dark:to-[#D1D2E0] sm:text-6xl">
            Q58 Connect
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-gray-700 dark:text-gray-300 sm:text-2xl">
            Q58 Connect 是Q58论坛基于 Discourse SSO 身份认证的 OAuth 2.0
            服务。通过Q58 Connect
            认证服务，将您的Q58账号与第三方应用进行安全、便捷的集成。
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="transform rounded-full bg-gradient-to-r from-[#25263A] to-[#4A4B68] px-8 py-3 text-lg text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-[#1E1F2E] hover:to-[#3D3E56] dark:from-[#A0A1B2] dark:to-[#D1D2E0] dark:text-[#25263A] dark:hover:from-[#8A8B9C] dark:hover:to-[#BBBCCA]"
              >
                开始使用
              </Button>
            </Link>
            <Link href="https://github.com/woodchen-ink/discourse-connect">
              <Button
                size="lg"
                variant="outline"
                className="transform rounded-full border-[#25263A] px-8 py-3 text-lg text-[#25263A] shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#25263A] hover:text-white dark:border-[#A0A1B2] dark:text-[#A0A1B2] dark:hover:bg-[#A0A1B2] dark:hover:text-[#25263A]"
              >
                了解更多
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-white py-8 shadow-inner dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 dark:text-gray-400 sm:px-6 lg:px-8">
          © 2025{" "}
          <a
            href="https://q58.pro"
            className="text-[#25263A] hover:underline dark:text-[#A0A1B2]"
          >
            Q58论坛
          </a>
          . 保留所有权利。
        </div>
      </footer>
    </div>
  );
}
