"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function DynamicLogo() {
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png";

  return <Image src={logoSrc} alt="Q58 Logo" width={48} height={48} />;
}
