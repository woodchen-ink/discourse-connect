"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import DynamicLogo from "../dynamic-logo";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <DynamicLogo />
              <h1 className="text-2xl font-bold text-[#25263A] dark:text-white">
                Q58 Connect
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {status === "loading" ? (
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 overflow-hidden rounded-full"
                disabled
              >
                <User className="h-5 w-5" />
              </Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative h-9 w-9 overflow-hidden rounded-full"
                  >
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        width={36}
                        height={36}
                        alt={user.name || "用户头像"}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.name || user.username || "用户"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">控制台</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/clients">应用管理</Link>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">管理后台</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={handleSignOut}
                  >
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-[#25263A] text-[#25263A] hover:bg-[#25263A] hover:text-white dark:border-[#A0A1B2] dark:text-[#A0A1B2] dark:hover:bg-[#A0A1B2] dark:hover:text-[#25263A]"
                >
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
