import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource/fraunces/600.css";
import "@fontsource-variable/inter";
import "@/styles/tokens.css";
import "./globals.css";
import { LayoutBody } from "@/components/layout/layout-body";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sheghlni",
  description: "Two-sided services marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen font-sans antialiased"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-primary)",
        }}
      >
        <ThemeProvider>
          <LayoutBody>{children}</LayoutBody>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
