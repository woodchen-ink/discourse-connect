import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/layout/nav-bar";
import { ThemeToggle } from "@/components/theme-toggle";

// 动态导入 Logo 组件以避免服务器端渲染错误
const DynamicLogo = dynamic(() => import("@/components/dynamic-logo"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Q58 Connect
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              基于 Discourse SSO 的 OAuth
              认证服务，让用户使用论坛账号快速登录您的应用
            </p>
            <div className="mt-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  开始使用
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/Tuluobo/discourse-connect">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  查看源码
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                使用方法
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                只需几个简单步骤，即可在您的应用中集成 Q58 论坛的用户系统
              </p>
            </div>

            <div className="mt-20">
              <div className="grid gap-12 lg:grid-cols-3">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#25263A] text-xl font-bold text-white dark:bg-[#A0A1B2]">
                    1
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    创建应用
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    登录后在控制台创建您的应用，获取 Client ID 和 Client Secret
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#25263A] text-xl font-bold text-white dark:bg-[#A0A1B2]">
                    2
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    集成代码
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    按照文档说明，在您的应用中集成 OAuth 2.0 认证流程
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#25263A] text-xl font-bold text-white dark:bg-[#A0A1B2]">
                    3
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    开始使用
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    用户可以使用论坛账号一键登录您的应用，无需重新注册
                  </p>
                </div>
              </div>
            </div>

            {/* API Example */}
            <div className="mt-20">
              <div className="rounded-xl bg-gray-900 p-8">
                <h3 className="mb-4 text-xl font-bold text-white">示例代码</h3>
                <div className="mb-4 rounded-lg border border-yellow-600 bg-yellow-600/10 p-4 text-yellow-600">
                  <p className="text-sm">
                    <strong>重要提示：</strong>{" "}
                    授权请求必须通过浏览器重定向实现，不能使用 AJAX/Fetch
                    等方式直接请求。
                  </p>
                </div>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`// 1. 重定向到授权页面（必须通过浏览器重定向，不能使用 AJAX/Fetch）
window.location.href = 'https://connect.q58.pro/oauth/authorize?' + new URLSearchParams({
  response_type: 'code',
  client_id: 'your_client_id',
  redirect_uri: 'https://your-app.com/callback'
});

// 2. 在回调页面获取访问令牌
const response = await fetch('https://connect.q58.pro/api/oauth/access_token', {
  method: 'POST',
  body: new URLSearchParams({
    code: '授权码',
    redirect_uri: 'https://your-app.com/callback'
  })
});
const { access_token } = await response.json();

// 3. 获取用户信息
const userInfo = await fetch('https://connect.q58.pro/api/oauth/user', {
  headers: {
    'Authorization': \`Bearer \${access_token}\`
  }
}).then(res => res.json());`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-8 shadow-inner dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 dark:text-gray-400 sm:px-6 lg:px-8">
          © 2024{" "}
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
