"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChatType } from "@/app/page";
import { Separator } from "@/components/ui/separator";

export const description =
  "An area chart with gradient fill and desktop gradient stroke";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function FuelConsumptionChart() {
  const [chartData, setChartData] = useState<AreaChatType[]>([
    { month: "Jan", value: 20 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 20 },
    { month: "Apr", value: 230 },
    { month: "May", value: 20 },
    { month: "Jun", value: 240 },
    { month: "Jul", value: 40 },
    { month: "Aug", value: 60 },
    { month: "Sep", value: 40 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 70 },
    { month: "Dec", value: 90 },
  ]);

  return (
    <Card className="bg-[#F9F9FA] shadow-none">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 sm:gap-4">
            <p>Fuel Consumption</p>
            <p className="text-sm font-normal text-muted-foreground">Avg RPM</p>
            <p className="text-sm font-normal text-muted-foreground">
              Anomalies{" "}
            </p>
            <Separator
              orientation="vertical"
              className="min-h-4 w-3 hidden lg:block"
            />
            <div className="hidden lg:flex items-center gap-1">
              <span className={"inline-block size-1.5 rounded-full bg-black"} />
              <p className="text-xs flex-1 font-normal">This year</p>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <span
                className={"inline-block size-1.5 rounded-full bg-[#AEC7ED]"}
              />
              <p className="text-xs flex-1 font-normal">Last year</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-72">
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}K`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {/* Fill gradients */}
              {/* <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
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
              </linearGradient> */}

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
              type="monotone"
              //   fill="url(#fillValue)"
              stroke="url(#strokeValue)"
              //   fillOpacity={1}
              fillOpacity={0}
              stackId="a"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default FuelConsumptionChart;
