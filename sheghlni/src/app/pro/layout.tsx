import { ProRouteGuard } from "@/components/auth/pro-route-guard";
import { ProShell } from "@/components/pro/pro-shell";

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProRouteGuard>
      <ProShell>{children}</ProShell>
    </ProRouteGuard>
  );
}
