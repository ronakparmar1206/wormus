"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChatType } from "@/app/page";

export const description =
  "An area chart with gradient fill and desktop gradient stroke";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "var(--chart-2)",
  // },
} satisfies ChartConfig;

export function LineCharts({
  areaChartData = [],
}: {
  areaChartData: AreaChatType[];
}) {
  const [chartData, setChartData] = useState<AreaChatType[]>([
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ]);

  useEffect(() => {
    if (!areaChartData.length) return;
    setChartData((pre) => {
      return pre.map((v) => {
        const monthValue = v.month.toLowerCase();
        const findValue = areaChartData.find(
          (s) => s.month.toLowerCase() === monthValue
        );
        if (findValue) {
          return { ...v, value: findValue.value };
        } else {
          return v;
        }
      });
    });
  }, [areaChartData.length]);

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
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.05}
                />
              </linearGradient>

              {/* Desktop stroke gradient matching your CSS */}
              <linearGradient id="strokeValue" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0.0047" // ~0.47%
                  stopColor="rgba(0,0,0,0.4)"
                />
                <stop offset="1" stopColor="#000000" />
              </linearGradient>
            </defs>

            {/* Value area with gradient fill and the CSS-like horizontal gradient stroke */}
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="url(#strokeValue)"
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
