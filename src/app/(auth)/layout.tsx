import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "ADMIN") redirect("/admin");
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
