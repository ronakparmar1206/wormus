"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

import { UserProfilePopover } from "./UserProfilePopover";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { ReportsDropdown } from "./ReportsDropdown";
import { Breadcrumbs } from "./breadcrumbs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "h-20  bg-black justify-between flex items-center px-4",
        pathname.includes("client-admin") && "bg-[#235375]"
      )}
    >
      <div className="flex gap-4 items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={40} />

        <UserProfilePopover />

        <Button
          className={cn(
            "text-sm font-normal h-9",
            pathname.includes("client-admin") && "text-white bg-white/10"
          )}
        >
          <Image src="/pie.svg" width={20} height={20} alt="pie" />
          <p className="hidden xl:block">Vessels</p>
        </Button>
        <Breadcrumbs />
      </div>

      <ReportsDropdown />
    </div>
  );
};

export default Header;
