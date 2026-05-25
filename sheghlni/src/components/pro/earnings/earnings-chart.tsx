"use client";

import type { EarningsMonth } from "@/lib/mock/pro-data";

type EarningsChartProps = {
  data: EarningsMonth[];
};

function formatBarValue(cents: number): string {
  return `$${Math.round(cents / 100).toLocaleString()}`;
}

function formatAxisValue(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1000) {
    const k = dollars / 1000;
    return k % 1 === 0 ? `$${k}k` : `$${k.toFixed(1)}k`;
  }
  return `$${Math.round(dollars)}`;
}

/** Round max up to 4 nice tick steps for the Y axis */
function getAxisMax(cents: number): number {
  const dollars = cents / 100;
  const step =
    dollars <= 2000 ? 500 : dollars <= 5000 ? 1000 : 2000;
  return Math.ceil(dollars / step) * step * 100;
}

export function EarningsChart({ data }: EarningsChartProps) {
  const dataMax = Math.max(...data.map((d) => d.amountCents), 1);
  const axisMax = getAxisMax(dataMax);
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round((axisMax / tickCount) * i),
  );

  const plotTop = 12;
  const plotHeight = 124;
  const plotLeft = 48;
  const plotRight = 12;
  const plotBottom = 28;
  const barCount = data.length;
  const plotWidth = 480;
  const slotWidth = (plotWidth - plotLeft - plotRight) / barCount;
  const barWidth = Math.min(34, slotWidth * 0.48);
  const totalHeight = plotTop + plotHeight + plotBottom;
  const totalWidth = plotWidth;

  return (
    <div className="rounded-xl border border-border bg-bg-elevated p-4">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="h-auto min-h-[10rem] w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Monthly earnings bar chart"
      >
        {ticks.map((tick) => {
          const y =
            plotTop + plotHeight - (tick / axisMax) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={plotLeft}
                y1={y}
                x2={totalWidth - plotRight}
                y2={y}
                className="stroke-border"
                strokeWidth={1}
                strokeDasharray={tick === 0 ? undefined : "3 3"}
              />
              <text
                x={plotLeft - 6}
                y={y + 4}
                textAnchor="end"
                className="fill-ink-300 text-[9px] font-medium"
              >
                {formatAxisValue(tick)}
              </text>
            </g>
          );
        })}

        {data.map((month, index) => {
          const barHeight = Math.max(
            (month.amountCents / axisMax) * plotHeight,
            month.amountCents > 0 ? 4 : 0,
          );
          const centerX =
            plotLeft + slotWidth * index + slotWidth / 2;
          const x = centerX - barWidth / 2;
          const y = plotTop + plotHeight - barHeight;

          return (
            <g key={month.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                ry={4}
                className="fill-bronze-500"
              />
              <text
                x={centerX}
                y={y - 5}
                textAnchor="middle"
                className="fill-ink-500 text-[9px] font-semibold"
              >
                {formatBarValue(month.amountCents)}
              </text>
              <text
                x={centerX}
                y={plotTop + plotHeight + 20}
                textAnchor="middle"
                className="fill-ink-400 text-[10px]"
              >
                {month.label}
              </text>
            </g>
          );
        })}
      </svg>

      <table className="sr-only">
        <caption>Monthly earnings</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{formatBarValue(row.amountCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
