"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { Navbar } from "@/components/layout/navbar";
import { PageShell } from "@/components/layout/page-shell";
import { DemoNav } from "@/components/dev/demo-nav";
import { useTheme } from "@/components/theme-provider";
import { getIsProMode, subscribeProMode } from "@/lib/auth/pro-mode-store";
import {
  isFullWidthPath,
  isLandingPath,
  isProPath,
  isAuthPath,
  isBecomeAProPath,
  isProOnboardingPath,
} from "@/lib/is-landing-path";

type LayoutBodyProps = {
  children: React.ReactNode;
};

export function LayoutBody({ children }: LayoutBodyProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isProvider, setIsProvider] = useState(false);
  const isLanding = isLandingPath(pathname);
  const isPro = isProPath(pathname);
  const isBecomeAPro = isBecomeAProPath(pathname);
  const isProOnboarding = isProOnboardingPath(pathname);
  const isAuth = isAuthPath(pathname);
  const useDarkNavbar =
    isLanding ||
    (isAuth && theme === "dark") ||
    (isBecomeAPro && theme === "dark");

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, []);

  const hideMobileTabBar =
    isLanding || isBecomeAPro || isProOnboarding || isAuth;
  const showMobileTabBar =
    !hideMobileTabBar && (isProvider || !isPro);

  return (
    <>
      <Navbar
        variant={useDarkNavbar ? "dark" : "light"}
        landing={isLanding}
      />
      <PageShell
        fullWidth={isFullWidthPath(pathname) || isBecomeAPro || isAuth}
        reserveMobileTabBar={showMobileTabBar}
        flushTop={isLanding || isBecomeAPro || isAuth}
      >
        {children}
      </PageShell>
      {showMobileTabBar && <MobileTabBar />}
      <DemoNav />
    </>
  );
}
