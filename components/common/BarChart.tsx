"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// vessel-wise sample data (approximate from screenshot)
const chartData = [
  { name: "Kyoto", value: 8 },
  { name: "Osaka", value: 15 },
  { name: "Tokyo", value: 11 },
  { name: "SanD.", value: 16 },
  { name: "Thyme", value: 6 },
  { name: "Nike", value: 13 },
];

// colors per vessel to match screenshot style
const COLORS: Record<string, string> = {
  Kyoto: "#9fa8ff", // soft purple
  Osaka: "#8fe3d4", // mint
  Tokyo: "#000000", // black
  "SanD.": "#9ecbff", // light blue
  Thyme: "#b0c9f0", // pale blue
  Nike: "#8fe0a0", // green
};

// minimal config—ChartContainer expects something, even if we're customizing per-bar
const chartConfig = {
  value: {
    label: "Avg Ticket",
    color: "transparent",
  },
} satisfies ChartConfig;

export function BarCharts() {
  return (
    <Card className="bg-[#F9F9FA] shadow-none">
      <CardHeader>
        <CardTitle>Avg. Ticket - Vessel Wise</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" radius={10} barSize={40}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || "#8884d8"} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
