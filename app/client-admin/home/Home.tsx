"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { dashboardAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import OrganizationsChart from "./_components/OrganizationsChart";
import VesselWiseChart from "./_components/VesselWiseChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SummaryCardProps {
  title: string;
  value: number | string;
  delta: number;
  bgClass: string;
  onClick?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  delta,
  bgClass,
  onClick,
}) => {
  const isPositive = delta >= 0;
  return (
    <div
      className={`flex flex-col justify-between p-4 rounded-xl shadow-sm border border-transparent cursor-pointer hover:shadow-md transition-shadow ${bgClass}`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full gap-3">
        <div className="text-xs font-medium text-gray-600">{title}</div>
        <div className="flex justify-between">
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

export type AreaChatType = { month: string; value: number };
function Home() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [chartData, setChartData] = useState<AreaChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await dashboardAPI.getDashboard();
        console.log("Dashboard Response:", response.data);
        setDashboardData(response.data?.data);
        setChartData(
          (response.data?.data?.chartData || []).map(
            (value: { monthName: string; count: number }) => ({
              month: value.monthName,
              value: value.count || 0,
            })
          )
        );
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const summaryData = [
    {
      title: "Active Vessels",
      value: dashboardData?.vesselCount || 12,
      delta: 11.01,
      bgClass: "bg-[rgba(230,235,255,0.8)]",
      onClick: undefined,
    },
    {
      title: "Organizations",
      value: dashboardData?.organisationCount || 8,
      delta: -0.03,
      bgClass: "bg-[rgba(235,245,255,0.8)]",
      onClick: () => router.push("/organizations"),
    },
    {
      title: "Modification Requests",
      value: 1,
      delta: 15.03,
      bgClass: "bg-[#EDEEFC]",
      onClick: undefined,
    },
    {
      title: "Ongoing Tickets",
      value: 6,
      delta: 6.08,
      bgClass: "bg-[#E6F1FD]",
      onClick: undefined,
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-100" />
        <p className="mt-4 text-sm text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className=" items-center justify-between flex">
        <h1 className="text-base font-semibold">Overview</h1>
        <Select defaultValue="today">
          <SelectTrigger className="w-[120px] border-none shadow-none">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="today">Today</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Four summary boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((s) => (
          <SummaryCard
            key={s.title}
            title={s.title}
            value={s.value}
            delta={s.delta}
            bgClass={s.bgClass}
            onClick={s.onClick}
          />
        ))}
      </div>
      {/* Charts */}
      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <OrganizationsChart organizationsChartData={chartData} />
        <VesselWiseChart />
      </div>
    </div>
  );
}

export default Home;
