import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

import { UserProfilePopover } from "./UserProfilePopover";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { ReportsDropdown } from "./ReportsDropdown";
import { Breadcrumbs } from "./breadcrumbs";

const Header = () => {
  return (
    <div className="h-20  bg-black justify-between flex items-center px-4">
      <div className="flex gap-4 items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={40} />

        <UserProfilePopover />

        <Button className="text-sm font-normal h-9">
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
