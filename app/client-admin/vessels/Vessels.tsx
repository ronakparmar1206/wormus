"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const mockData = [
  {
    id: "INV001",
    name: "Christine Brooks",
    designation: "Crew",
    date: "04 Sep 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV002",
    name: "Rosie Pearson",
    designation: "Captain",
    date: "28 May 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV003",
    name: "Daniel Caldwell",
    designation: "Manager",
    date: "23 Nov 2019",
    assignedVessel: "Vessel Group A",
  },
  {
    id: "INV004",
    name: "Gilbert Johnston",
    designation: "Crew",
    date: "31 Jul 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV005",
    name: "Alan Cain",
    designation: "Crew",
    date: "14 Aug 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV006",
    name: "Alfred Murray",
    designation: "Crew",
    date: "15 Aug 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV007",
    name: "Maggie Sullivan",
    designation: "Crew",
    date: "16 May 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV008",
    name: "Rosie Todd",
    designation: "Crew",
    date: "30 Apr 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV009",
    name: "Debie Hines",
    designation: "Crew",
    date: "09 Jan 2019",
    assignedVessel: "Vessel 1",
  },
  {
    id: "INV010",
    name: "Olivia King",
    designation: "Manager",
    date: "12 Dec 2019",
    assignedVessel: "Vessel Group B",
  },
  {
    id: "INV011",
    name: "Ethan Ward",
    designation: "Captain",
    date: "01 Jun 2019",
    assignedVessel: "Vessel 2",
  },
  {
    id: "INV012",
    name: "Sophia Green",
    designation: "Crew",
    date: "15 Oct 2019",
    assignedVessel: "Vessel 2",
  },
];

const Vessels = () => {
  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="border rounded-lg w-fit bg-muted max-w-full  overflow-auto">
        <div className="flex items-center overflow-autsdo">
          <div className="w-16">
            <Filter className="h-4 w-4 text-muted-foreground mx-auto" />
          </div>
          <Separator orientation="vertical" className="min-h-10 w-2" />
          <div className="w-24 text-center">
            <p className="text-sm">Filter By</p>
          </div>
          <Separator orientation="vertical" className="min-h-10 w-2" />
          <Select>
            <SelectTrigger className="w-[180px] border-0">
              <SelectValue placeholder="Select Vessel" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-md z-50">
              <SelectItem value="value">Test</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] border-0">
              <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-md z-50">
              <SelectItem value="value">Test</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="min-h-10 w-2" />

          <Select>
            <SelectTrigger className="w-[180px] border-0">
              <SelectValue placeholder="Select Designation" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-md z-50">
              <SelectItem value="value">Test</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="min-h-10 w-2" />
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filter
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="border rounded-xl overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-center bg-muted [&>th]:py-3">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>Assigned Vessel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((e) => (
              <TableRow key={e.id} className="[&>td]:text-center [&>td]:py-4">
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                  <Badge>{e.designation}</Badge>
                </TableCell>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.assignedVessel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <p className="text-base text-muted-foreground font-medium">
          Showing 1-09 of 78
        </p>
        <div className="flex items-center ">
          <Button variant="outline" className="rounded-r-none">
            <ChevronLeft />
          </Button>
          <Button variant="outline" className="rounded-l-none border-l-0">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vessels;
