import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q58 Connect",
  description: "Q58 Connect, 基于Q58论坛的OAuth 2.0认证服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
