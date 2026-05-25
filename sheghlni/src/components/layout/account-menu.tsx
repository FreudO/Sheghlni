"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getIsProMode,
  setIsProMode,
  subscribeProMode,
} from "@/lib/auth/pro-mode-store";
import {
  DEMO_CUSTOMER_IDENTITY,
  DEMO_PROVIDER_IDENTITY,
  DEMO_PRO_HANDLE,
} from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

export function AccountMenu() {
  const router = useRouter();
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, []);

  const identity = isProvider
    ? DEMO_PROVIDER_IDENTITY
    : DEMO_CUSTOMER_IDENTITY;

  const switchToCustomer = () => {
    setIsProMode(false);
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex shrink-0 items-center gap-2 rounded-full border-0 bg-transparent p-0.5",
          "transition ease-default duration-default",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "lg:hover:bg-bg-elevated-2",
        )}
      >
        <span
          aria-hidden
          className="inline-flex size-icon items-center justify-center rounded-full border-0 bg-bronze-500 text-sm font-semibold leading-none text-white"
        >
          {identity.initial}
        </span>
        <span className="hidden max-w-[8rem] truncate pr-1.5 text-sm font-medium text-text-primary lg:inline">
          {identity.firstName}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        {isProvider ? (
          <>
            <p className="px-3 pb-1 pt-2 text-caption text-ink-300">
              {DEMO_PROVIDER_IDENTITY.businessName}
            </p>
            <DropdownMenuItem asChild>
              <Link href="/pro/">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pro/calendar/">Calendar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pro/earnings/">Earnings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pro/profile/edit/">Edit profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/p/${DEMO_PRO_HANDLE}/`}>View public profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/settings/">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={switchToCustomer}>
              Switch to customer view
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/account/">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/bookings/">Bookings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/inbox/">Inbox</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/saved/">Saved</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/settings/">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-in/">Sign out</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
