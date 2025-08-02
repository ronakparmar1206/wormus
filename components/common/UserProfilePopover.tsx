import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  FileText,
  LogOut,
  Mail,
  Settings,
  User,
  Users,
} from "lucide-react";

export const UserProfilePopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-64 p-0 rounded-md shadow-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex gap-3 p-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Irwin Williams</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Ship Manager</p>
            <div className="mt-2 flex gap-1">
              <div className="bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full">
                92 Hug
              </div>
              <div className="bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full">
                24 Hug
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          {/* First group */}
          <div className="flex flex-col px-1 py-2 space-y-1">
            <div className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-700" />
                <span className="text-sm">Submitted Reports</span>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                6
              </span>
            </div>
            <div className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-700" />
                <span className="text-sm">Pending Reports</span>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                12
              </span>
            </div>
            <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100">
              <Users size={16} className="text-gray-700" />
              <span className="text-sm">Manage Team</span>
            </div>
          </div>

          {/* Second group */}
          <div className="flex flex-col px-1 py-2 space-y-1 border-t border-gray-200">
            <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100">
              <User size={16} className="text-gray-700" />
              <span className="text-sm">Account</span>
            </div>
            <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100">
              <Settings size={16} className="text-gray-700" />
              <span className="text-sm">Settings</span>
            </div>
          </div>

          {/* Logout */}
          <div className="px-1 py-2 border-t border-gray-200">
            <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 text-red-600">
              <LogOut size={16} />
              <span className="text-sm font-medium">Log out</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};