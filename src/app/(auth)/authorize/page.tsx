import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MessageCircleCode } from "lucide-react";

import { UserAuthorize } from "@/components/auth/user-authorize";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: `Auth – 数字牧民社区`,
  description: "Sign in to your account",
};

export default function AuthPage({ searchParams }: Props) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <MessageCircleCode className="mx-auto size-12" />
          <div className="text-2xl font-semibold tracking-tight">
            <span>Welcome to</span>{" "}
            <span style={{ fontFamily: "Bahamas Bold" }}>数字牧民社区</span>
          </div>
        </div>
        <div>
          <Suspense>
            <UserAuthorize data={searchParams} />
          </Suspense>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
