"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProDashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/pro/");
  }, [router]);

  return null;
}
