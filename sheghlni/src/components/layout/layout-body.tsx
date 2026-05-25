"use client";

import { usePathname } from "next/navigation";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { Navbar } from "@/components/layout/navbar";
import { PageShell } from "@/components/layout/page-shell";
import { DemoNav } from "@/components/dev/demo-nav";
import { useTheme } from "@/components/theme-provider";
import {
  isFullWidthPath,
  isLandingPath,
  isProPath,
  isBecomeAProPath,
} from "@/lib/is-landing-path";

type LayoutBodyProps = {
  children: React.ReactNode;
};

export function LayoutBody({ children }: LayoutBodyProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLanding = isLandingPath(pathname);
  const isPro = isProPath(pathname);
  const isBecomeAPro = isBecomeAProPath(pathname);
  const useDarkNavbar =
    isLanding || (isBecomeAPro && theme === "dark");

  return (
    <>
      <Navbar
        variant={useDarkNavbar ? "dark" : "light"}
        landing={isLanding}
      />
      <PageShell
        fullWidth={isFullWidthPath(pathname) || isBecomeAPro}
        reserveMobileTabBar={!isLanding && !isPro && !isBecomeAPro}
        flushTop={isLanding || isBecomeAPro}
      >
        {children}
      </PageShell>
      {!isLanding && !isPro && !isBecomeAPro && <MobileTabBar />}
      <DemoNav />
    </>
  );
}
