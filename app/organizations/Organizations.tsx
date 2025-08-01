"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Search,
  Edit,
  Trash2,
  ChevronsUpDown,
  FileCheck2,
  MoreHorizontal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Vessel {
  id: string;
  name: string;
  type: string;
  managedBy: string;
  imoNo: string;
  onboardingDate: string;
}

interface Organization {
  id: string;
  name: string;
  onboardingDate: string;
  lastRenewal: string;
  imo: string;
  activeVessels: number;
  upcomingInvoices: number;
  managedBy: string;
  vessels?: Vessel[];
}

const mockData: Organization[] = [
  {
    id: "1",
    name: "One Sea",
    onboardingDate: "21-03-2022",
    lastRenewal: "21-03-2022",
    imo: "1586",
    activeVessels: 1,
    upcomingInvoices: 1,
    managedBy: "Sam G.",
    vessels: [
      {
        id: "v1",
        name: "MethylpolidiGLASSBacterio",
        type: "Container",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
      {
        id: "v2",
        name: "Transport",
        type: "Oil & Gas",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
    ],
  },
  {
    id: "2",
    name: "Seaspan",
    onboardingDate: "21-03-2022",
    lastRenewal: "22-03-2022",
    imo: "1595",
    activeVessels: 1,
    upcomingInvoices: 1,
    managedBy: "Sagh.",
    vessels: [
      {
        id: "v1",
        name: "MethylpolidiGLASSBacterio",
        type: "Container",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
      {
        id: "v2",
        name: "Transport",
        type: "Oil & Gas",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
    ],
  },
  {
    id: "3",
    name: "UMMS",
    onboardingDate: "21-03-2022",
    lastRenewal: "22-03-2022",
    imo: "1594",
    activeVessels: 2,
    upcomingInvoices: 2,
    managedBy: "Sam.",
    vessels: [
      {
        id: "v1",
        name: "MethylpolidiGLASSBacterio",
        type: "Container",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
      {
        id: "v2",
        name: "Transport",
        type: "Oil & Gas",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
    ],
  },
  {
    id: "4",
    name: "Wyslane",
    onboardingDate: "08-03-2022",
    lastRenewal: "09-03-2022",
    imo: "1593",
    activeVessels: 1,
    upcomingInvoices: 1,
    managedBy: "Company Owner",
    vessels: [
      {
        id: "v1",
        name: "MethylpolidiGLASSBacterio",
        type: "Container",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
      {
        id: "v2",
        name: "Transport",
        type: "Oil & Gas",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
    ],
  },
  {
    id: "5",
    name: "Wyslane",
    onboardingDate: "08-03-2022",
    lastRenewal: "10-03-2022",
    imo: "1592",
    activeVessels: 1,
    upcomingInvoices: 1,
    managedBy: "Company Owner",
    vessels: [
      {
        id: "v1",
        name: "MethylpolidiGLASSBacterio",
        type: "Container",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
      {
        id: "v2",
        name: "Transport",
        type: "Oil & Gas",
        managedBy: "Captain Name",
        imoNo: "305.89 PLN",
        onboardingDate: "21-03-2022",
      },
    ],
  },
];

const Organizations = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(["3"]));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateCreation, setDateCreation] = useState<Date | undefined>(
    new Date()
  );
  const [dateCreationModal, setDateCreationModal] = useState(false);
  const [dateRenewal, setDateRenewal] = useState<Date | undefined>(new Date());
  const [dateRenewalModal, setDateRenewalModal] = useState(false);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="w-full  mx-auto p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground mb-6">
          Organization Group
        </h1>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Popover
              open={dateCreationModal}
              onOpenChange={setDateCreationModal}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Creation Date
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dateCreation}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDateCreation(date);
                    setDateCreationModal(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            <span className="text-muted-foreground">→</span>

            <Popover open={dateRenewalModal} onOpenChange={setDateRenewalModal}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Renewal Date
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dateRenewal}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDateRenewal(date);
                    setDateRenewalModal(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by Name, no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button className="bg-primary-100 text-primary-foreground hover:bg-primary/90">
            Add Org. & Vsl{" "}
          </Button>
          <Button className="bg-primary-100 text-primary-foreground hover:bg-primary/90">
            Manage User{" "}
          </Button>
        </div>

        {/* Table */}
        <Card className="overflow-hidden border-0 shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead className="bg-table-header">
                <tr
                  className={cn(
                    "border-table-border",
                    "[&>th]:text-left [&>th]:whitespace-nowrap [&>th]:p-4 [&>th]:font-normal [&>th]:text-muted-foreground"
                  )}
                >
                  <th></th>
                  <th>Org Name</th>
                  <th>
                    <button className="flex items-center gap-1 whitespace-nowrap">
                      Date of Onboarding
                      <ChevronsUpDown className="mt-0.5 size-4 text-foreground" />
                    </button>
                  </th>
                  <th>
                    <button className="flex items-center gap-1 whitespace-nowrap">
                      Last Renewal
                      <ChevronsUpDown className="mt-0.5 size-4 text-foreground" />
                    </button>
                  </th>
                  <th>IMO</th>
                  <th>Active Vessels</th>
                  <th>
                    <button className="flex items-center gap-1 whitespace-nowrap">
                      Upcoming Invoices
                      <ChevronsUpDown className="mt-0.5 size-4 text-foreground" />
                    </button>
                  </th>
                  <th>Managed By</th>
                  <th>Add Vessel</th>
                  <th>Modify</th>
                  <th>Delete</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((org, index) => (
                  <Collapsible
                    key={org.id}
                    open={expandedRows.has(org.id)}
                    onOpenChange={() => toggleRow(org.id)}
                    asChild
                  >
                    <>
                      <CollapsibleTrigger asChild>
                        <tr
                          className={cn(
                            "bg-background relative z-20 [&>td]:p-4 [&>td]:not-first:border-y [&>td]:last:rounded-r-lg [&>td]:nth-[2]:rounded-l-lg [&>td]:nth-[2]:border-l [&>td]:last:border-r",
                            expandedRows.has(org.id)
                              ? "[&>td]:not-first:bg-primary-100 [&>td]:not-first:text-primary-foreground"
                              : ""
                          )}
                        >
                          <td>
                            <div className="relative w-9 h-8">
                              <span className="absolute top-[3px] left-0 bg-red-50/10 size-full grid place-content-center text-primary-foreground text-base">
                                {index + 1}
                              </span>
                              <svg
                                viewBox="0 0 27 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-primary-100 size-full"
                              >
                                <g clip-path="url(#clip0_2013_11238)">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M25 8.06678H23.7179V5.58469C23.7179 4.90026 23.1429 4.34365 22.4359 4.34365H14.1026C13.9526 4.34365 13.8077 4.29277 13.6923 4.20031L10.0244 1.24104H2.5641C1.85705 1.24104 1.28205 1.79765 1.28205 2.48209V6.82574H25V8.06678H1.28205H0V2.48209C0 1.11322 1.15 0 2.5641 0H10.2564C10.4064 0 10.5513 0.0508828 10.6667 0.14334L14.3346 3.10261H22.4359C23.85 3.10261 25 4.21582 25 5.58469V8.06678Z"
                                  />
                                  <path
                                    d="M25 8.06678H23.7179V5.58469C23.7179 4.90026 23.1429 4.34365 22.4359 4.34365H14.1026C13.9526 4.34365 13.8077 4.29277 13.6923 4.20031L10.0244 1.24104H2.5641C1.85705 1.24104 1.28205 1.79765 1.28205 2.48209V6.82574H25V8.06678H1.28205H0V2.48209C0 1.11322 1.15 0 2.5641 0H10.2564C10.4064 0 10.5513 0.0508828 10.6667 0.14334L14.3346 3.10261H22.4359C23.85 3.10261 25 4.21582 25 5.58469V8.06678Z"
                                    stroke="white"
                                    stroke-width="0.2"
                                  />
                                  <rect
                                    y="6"
                                    width="27"
                                    height="18"
                                    rx="2"
                                    stroke="#235375"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2013_11238">
                                    <rect width="27" height="25" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{org.name}</span>
                            </div>
                          </td>
                          <td>{org.onboardingDate}</td>
                          <td>{org.lastRenewal}</td>
                          <td>{org.imo}</td>
                          <td>{org.activeVessels}</td>
                          <td>{org.upcomingInvoices}</td>
                          <td>{org.managedBy}</td>
                          <td>
                            <Button
                              size="sm"
                              className={cn(
                                "bg-primary-100 text-white hover:bg-unset cursor-pointer",
                                expandedRows.has(org.id)
                                  ? "bg-white text-primary-100"
                                  : ""
                              )}
                            >
                              Add V.
                            </Button>
                          </td>
                          <td>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                          <td>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      </CollapsibleTrigger>

                      {org.vessels && (
                        <CollapsibleContent asChild>
                          <tr>
                            <td></td>
                            <td colSpan={11} className="p-0">
                              <div className="bg-accent/50 rounded-lg overflow-hidden border relative -top-6">
                                <div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full rounded-2xl">
                                      <thead>
                                        <tr
                                          className={cn(
                                            "bg-primary-200",
                                            "[&>th]:text-left [&>th]:p-2 [&>th]:px-4 [&>th]:pt-6 [&>th]:text-sm [&>th]:font-medium [&>th]:text-primary-100"
                                          )}
                                        >
                                          <th>No.</th>
                                          <th>Vessel Names</th>
                                          <th>Type</th>
                                          <th>Managed By</th>
                                          <th>IMO No.</th>
                                          <th>Onboarding Date</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {org.vessels.map((vessel, index) => (
                                          <tr key={vessel.id}>
                                            <td className="p-2 px-4 text-sm">
                                              {index + 1}
                                            </td>
                                            <td className="p-2 px-4 text-sm font-medium">
                                              {vessel.name}
                                            </td>
                                            <td className="p-2 px-4 text-sm">
                                              {vessel.type}
                                            </td>
                                            <td className="p-2 px-4 text-sm text-muted-foreground">
                                              {vessel.managedBy}
                                            </td>
                                            <td className="p-2 px-4 text-sm">
                                              {vessel.imoNo}
                                            </td>
                                            <td className="p-2 px-4 text-sm text-muted-foreground">
                                              {vessel.onboardingDate}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="p-4 flex justify-end  text-white">
                                    <Button className="bg-primary-100">
                                      <FileCheck2 /> View Docs
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </CollapsibleContent>
                      )}
                    </>
                  </Collapsible>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          paginations
        </div>
      </div>
    </div>
  );
};

export default Organizations;
