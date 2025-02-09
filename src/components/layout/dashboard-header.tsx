"use client";

import { usePathname } from "next/navigation";

import { NavBar } from "./nav-bar";

export function DashboardHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard") return "控制台";
    if (pathname === "/dashboard/clients") return "应用管理";
    if (pathname.includes("/dashboard/clients/")) return "应用编辑";
    if (pathname === "/admin") return "管理后台";
    return "";
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">{getTitle()}</h1>
        </div>
      </div>
    </div>
  );
}
