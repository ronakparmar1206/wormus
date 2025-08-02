import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="bg-white/20 flex  items-center rounded-md px-4 h-7">
      <Search className="text-white/20" size={16} />
      <Input
        placeholder="Global Search"
        className="border-none outline-none bg-transparent h-full w-full hidden xl:block"
      />
    </div>
  );
};
