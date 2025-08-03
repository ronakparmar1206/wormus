import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Fuel consumption data
const chartData = [
  { label: "VLSFO", value: 52.1, fill: "black" },
  { label: "GAS", value: 22.8, fill: "#7BAAF7" },
  { label: "Etc A", value: 13.9, fill: "#8EF1CC" },
  { label: "Etc B", value: 11.2, fill: "#BFD6FF" },
];

// Optional config
const chartConfig = {} satisfies ChartConfig;

const FuelConsumptionShareChart = () => {
  return (
    <Card className="bg-[#F9F9FA] shadow-none">
      <CardHeader>
        <CardTitle>Fuel Consumption Share</CardTitle>
      </CardHeader>
      <CardContent className="h-full grid grid-cols-2 gap-2 items-center">
        <div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={50}
                outerRadius={80}
                stroke="none"
              />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="space-y-2 max-w-60">
          {chartData.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              <span
                className={cn(
                  "inline-block size-2 rounded-full",
                  `bg-[${item.fill}]`
                )}
                style={{ backgroundColor: item.fill }}
              />
              <p className="text-sm flex-1">{item.label}</p>
              <p className="text-sm">{item.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionShareChart;
