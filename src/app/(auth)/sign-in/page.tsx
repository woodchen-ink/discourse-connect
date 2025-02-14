import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, MessageCircleCode } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeft className="mr-2 size-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <MessageCircleCode className="mx-auto size-12" />
          <div className="text-2xl font-semibold tracking-tight">
            <span>Welcome to</span>{" "}
            <span style={{ fontFamily: "Bahamas Bold" }}>Q58论坛 Connect</span>
          </div>
        </div>
        <Suspense>
          <UserAuthForm />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="https://q58.club/tos"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="https://q58.club/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
