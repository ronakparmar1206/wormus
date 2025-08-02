// app/page.tsx or components/Home.tsx
"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarCharts } from "@/components/common/BarChart";
import { LineCharts } from "@/components/common/LineChart";

interface SummaryCardProps {
  title: string;
  value: number | string;
  delta: number; // percentage change
  bgClass: string; // background per design
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  delta,
  bgClass,
}) => {
  const isPositive = delta >= 0;
  return (
    <div
    
      className={`flex flex-col justify-between p-4 rounded-xl shadow-sm border border-transparent ${bgClass}`}
    >
      <div className="flex flex-col h-full gap-3">
        <div className="text-xs font-medium text-gray-600">{title}</div>
        <div className="flex  justify-between">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div
            className={`text-xs font-semibold flex items-center gap-1 ${
              isPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span>{Math.abs(delta).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const summaryData = [
    {
      title: "Active Vessels",
      value: 12,
      delta: 11.01,
      bgClass: "bg-[rgba(230,235,255,0.8)]", // light lavender
    },
    {
      title: "Organizations",
      value: 8,
      delta: -0.03,
      bgClass: "bg-[rgba(235,245,255,0.8)]", // light blue
    },
    {
      title: "Modification Requests",
      value: 1,
      delta: 15.03,
      bgClass: "bg-[#EDEEFC]", // pale purple
    },
    {
      title: "Ongoing Tickets",
      value: 6,
      delta: 6.08,
      bgClass: "bg-[#E6F1FD]", // soft aqua
    },
  ];

  return (
    <div>
      {/* Four summary boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((s) => (
          <SummaryCard
            key={s.title}
            title={s.title}
            value={s.value}
            delta={s.delta}
            bgClass={s.bgClass}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        <BarCharts />
        <LineCharts />
      </div>
    </div>
  );
}
