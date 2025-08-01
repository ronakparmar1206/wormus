import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Bell,
  ChevronDown,
  Folder,
  History,
  Search,
  SlashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header = () => {
  return (
    <div className="h-20 gap-6 bg-black justify-between flex items-center">
      <Image src="/logo.svg" alt="logo" width={150} height={40} />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button className="text-sm  font-normal h-9">
        <Image src="/pie.svg" width={20} height={20} alt="pie" />
        Vessels
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-white/70 hover:text-white" href="/">
              DashBoard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-white/70 hover:text-unset">
            <BreadcrumbLink
              href="/organizations"
              className="text-white/70 hover:text-white"
            >
              Organizations
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white/20 flex grow items-center rounded-md px-4 h-7 ">
        <Search className="text-white/20" size={16} />
        <Input
          placeholder="Global Search"
          className="border-none outline-none bg-transparent h-full w-full "
        />
      </div>
      <div className="flex gap-3">
        <Button size="icon" className="bg-transparent">
          <History />
        </Button>
        <Button size="icon" className="bg-transparent">
          <Bell />
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="text-white bg-white/10 hover:bg-unset h-9 rounded-md px-3"
        >
          <div className="flex gap-2 items-center">
            <ChevronDown size={16} className="opacity-80" />
            <Folder size={16} />
            <span>Reports</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>Overview</DropdownMenuItem>
          <DropdownMenuItem>Sales</DropdownMenuItem>
          <DropdownMenuItem>Activity</DropdownMenuItem>
          <DropdownMenuItem>Custom Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button className="text-sm  font-normal h-9">Support Ticket</Button>
    </div>
  );
};

export default Header;
