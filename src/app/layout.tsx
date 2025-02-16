import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q58 Connect",
  description: "Q58论坛 OAuth 认证服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://analytics.czl.net/script.js"
          data-website-id="78784a68-cb2f-42ae-851b-89c034efd05e"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
