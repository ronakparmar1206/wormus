"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Folder, Heart, Ticket } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const ReportsDropdown = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-3 items-center">
      <SearchBar />
      <HeaderActions />
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="text-white bg-white/10 hover:bg-unset h-9 rounded-md px-3"
        >
          <div className="flex gap-2 items-center">
            <ChevronDown size={16} className="opacity-80" />
            <Folder size={16} />

            <span className="hidden xl:block">Reports</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>Overview</DropdownMenuItem>
          <DropdownMenuItem>Sales</DropdownMenuItem>
          <DropdownMenuItem>Activity</DropdownMenuItem>
          <DropdownMenuItem>Custom Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className={cn(
          "text-sm font-normal h-9",
          pathname.includes("client-admin") && "text-white bg-white/10"
        )}
      >
        <Ticket className="block xl:hidden" />
        <span className="hidden xl:block">Support Ticket </span>
      </Button>
    </div>
  );
};
