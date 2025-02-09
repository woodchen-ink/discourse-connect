import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      {children}
    </div>
  );
}
