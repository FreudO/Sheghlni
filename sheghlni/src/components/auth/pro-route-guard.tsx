"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getIsProMode, subscribeProMode } from "@/lib/auth/pro-mode-store";

type ProRouteGuardProps = {
  children: React.ReactNode;
};

export function ProRouteGuard({ children }: ProRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      const isOnboarding = pathname.startsWith("/pro/onboarding");
      if (isOnboarding || getIsProMode()) {
        setAllowed(true);
        return;
      }
      setAllowed(false);
      router.replace("/");
    };

    check();
    return subscribeProMode(check);
  }, [router, pathname]);

  if (!allowed) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-ink-300">
        Checking pro access…
      </div>
    );
  }

  return <>{children}</>;
}
