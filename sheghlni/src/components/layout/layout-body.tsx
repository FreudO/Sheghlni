"use client";

import { usePathname } from "next/navigation";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { Navbar } from "@/components/layout/navbar";
import { PageShell } from "@/components/layout/page-shell";
import { DemoNav } from "@/components/dev/demo-nav";
import { isFullWidthPath, isLandingPath } from "@/lib/is-landing-path";

type LayoutBodyProps = {
  children: React.ReactNode;
};

export function LayoutBody({ children }: LayoutBodyProps) {
  const pathname = usePathname();
  const isLanding = isLandingPath(pathname);

  return (
    <>
      <Navbar variant={isLanding ? "dark" : "light"} landing={isLanding} />
      <PageShell fullWidth={isFullWidthPath(pathname)} reserveMobileTabBar={!isLanding} flushTop={isLanding}>
        {children}
      </PageShell>
      {!isLanding && <MobileTabBar />}
      <DemoNav />
    </>
  );
}
