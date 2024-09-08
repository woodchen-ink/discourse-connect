import { Suspense } from "react";

import { Authorizing } from "@/components/auth/authorizing";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Suspense>
          <Authorizing />
        </Suspense>
      </div>
    </main>
  );
}
