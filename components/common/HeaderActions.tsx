import React from "react";
import { Button } from "../ui/button";
import { Bell, History } from "lucide-react";
import { SearchBar } from "./SearchBar";

export const HeaderActions = () => {
  return (
    <div className="flex gap-3">
      <Button size="icon" className="bg-transparent">
        <History />
      </Button>
      <Button size="icon" className="bg-transparent">
        <Bell />
      </Button>
    </div>
  );
};
