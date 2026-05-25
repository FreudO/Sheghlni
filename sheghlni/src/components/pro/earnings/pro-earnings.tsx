"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { EarningsChart } from "@/components/pro/earnings/earnings-chart";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter-select";
import {
  proEarningsByMonth,
  proEarningsSummary,
  proTransactions,
  type ProTransactionStatus,
} from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

function formatCents(cents: number): string {
  const neg = cents < 0;
  return `${neg ? "−" : ""}$${Math.abs(Math.round(cents / 100)).toLocaleString()}`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function ProEarnings() {
  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2026);
  const [statusFilter, setStatusFilter] = useState<ProTransactionStatus | "all">(
    "all",
  );
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = useMemo(() => {
    let rows = [...proTransactions];
    if (statusFilter !== "all") {
      rows = rows.filter((t) => t.status === statusFilter);
    }
    rows.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortDesc ? -cmp : cmp;
    });
    return rows;
  }, [statusFilter, sortDesc]);

  const exportCsv = () => {
    const header =
      "Customer,Service,Date,Gross,Platform Fee,Net,Status";
    const lines = filtered.map(
      (t) =>
        `"${t.customerName}","${t.serviceName}",${t.date},${t.grossCents / 100},${t.platformFeeCents / 100},${t.netCents / 100},${t.status}`,
    );
    const blob = new Blob([[header, ...lines].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sheghlni-earnings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-h1 text-text-primary">Earnings</h1>
        <div className="flex items-center gap-2">
          <FilterSelect
            aria-label="Month"
            value={String(month)}
            onChange={(v) => setMonth(Number(v))}
            options={MONTHS.map((m, i) => ({
              value: String(i),
              label: m,
            }))}
          />
          <FilterSelect
            aria-label="Year"
            value={String(year)}
            onChange={(v) => setYear(Number(v))}
            className="min-w-[5.25rem]"
            options={[2025, 2026].map((y) => ({
              value: String(y),
              label: String(y),
            }))}
          />
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="This month"
          value={formatCents(proEarningsSummary.thisMonthCents)}
        />
        <SummaryCard
          label="Pending payout"
          value={formatCents(proEarningsSummary.pendingPayoutCents)}
          sub={`Next payout in ${proEarningsSummary.pendingPayoutDays} days`}
        />
        <SummaryCard
          label="All time"
          value={formatCents(proEarningsSummary.allTimeCents)}
        />
        <SummaryCard
          label="Avg per booking"
          value={formatCents(proEarningsSummary.avgPerBookingCents)}
        />
      </div>

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 className="font-display text-h3 text-text-primary">
            Last 6 months
          </h2>
          <span className="text-caption text-ink-300">Net earnings (USD)</span>
        </div>
        <EarningsChart data={proEarningsByMonth} />
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-h3 text-text-primary">
            Transactions
          </h2>
          <div className="flex flex-wrap gap-2">
            <FilterSelect
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(v) =>
                setStatusFilter(v as ProTransactionStatus | "all")
              }
              align="start"
              options={[
                { value: "all", label: "All statuses" },
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "refunded", label: "Refunded" },
              ]}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setSortDesc((d) => !d)}
            >
              Sort by date {sortDesc ? "↓" : "↑"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5"
              onClick={exportCsv}
            >
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
        </div>
        <div className="scroll-fade-x mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-bg-elevated text-caption text-ink-300">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Gross</th>
                <th className="px-4 py-3 font-medium text-right">Fee (−12%)</th>
                <th className="px-4 py-3 font-medium text-right">Net</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr key={txn.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {txn.customerName}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {txn.serviceName}
                  </td>
                  <td className="px-4 py-3 text-ink-300">{txn.date}</td>
                  <td className="px-4 py-3 text-right">
                    {formatCents(txn.grossCents)}
                  </td>
                  <td className="px-4 py-3 text-right text-clay-500">
                    {formatCents(-txn.platformFeeCents)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCents(txn.netCents)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={txn.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5">
        <h2 className="font-display text-h3 text-text-primary">Tax documents</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-text-primary">2024 Annual Summary</p>
            <p className="text-sm text-ink-300">PDF · Generated for tax filing</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => window.alert("Mock PDF download started.")}
          >
            Download
          </Button>
        </div>
        {!proEarningsSummary.taxConfigured && (
          <div className="mt-4 rounded-xl bg-cream-200 px-4 py-3 dark:bg-cream-200/15">
            <p className="text-sm text-text-primary">
              Add your tax info to receive year-end forms.
            </p>
            <Button
              type="button"
              size="sm"
              className="mt-2 rounded-full bg-cta text-white hover:bg-cta-hover"
            >
              Set up tax info
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-bg-elevated p-4">
      <p className="text-caption text-ink-300">{label}</p>
      <p className="mt-1 font-display text-h3 text-text-primary">{value}</p>
      {sub && <p className="mt-1 text-caption text-ink-300">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: ProTransactionStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-caption font-medium capitalize",
        status === "paid" && "bg-sage-500/15 text-sage-500",
        status === "pending" && "bg-bronze-500/15 text-bronze-600",
        status === "refunded" && "bg-clay-500/15 text-clay-500",
      )}
    >
      {status}
    </span>
  );
}
