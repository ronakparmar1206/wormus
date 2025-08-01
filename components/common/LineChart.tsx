"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "An area chart with gradient fill and desktop gradient stroke";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function LineCharts() {
  return (
    <Card className="bg-[#F9F9FA] shadow-none">
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {/* Fill gradients */}
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.05}
                />
              </linearGradient>

              {/* Desktop stroke gradient matching your CSS */}
              <linearGradient id="strokeDesktop" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0.0047" // ~0.47%
                  stopColor="rgba(0,0,0,0.4)"
                />
                <stop offset="1" stopColor="#000000" />
              </linearGradient>

              {/* Mobile stroke gradient (example softer blue) */}
              <linearGradient id="strokeMobile" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(59,130,246,0.8)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
              </linearGradient>
            </defs>

            {/* Mobile area with dotted gradient-ish stroke */}
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="url(#strokeMobile)"
              strokeDasharray="3 3"
              fillOpacity={1}
              stackId="a"
              strokeWidth={2}
            />

            {/* Desktop area with gradient fill and the CSS-like horizontal gradient stroke */}
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="url(#strokeDesktop)"
              fillOpacity={1}
              stackId="a"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
