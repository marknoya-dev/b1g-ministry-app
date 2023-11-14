"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Participant = {
  ticketNum: string;
  name: string;
  mobileNum: string;
  temp: string;
  boarding: "Bus" | "Car";
  status: "Awaiting" | "Checked In" | "In Transit";
  vehicle: string;
};
export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "ticketNum",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket Number
          <ArrowUpDown className="h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobileNum",
    header: "Mobile Num",
  },
  {
    accessorKey: "temp",
    header: "Temp Check",
    cell: ({ row }) => {
      const temp = row.getValue("temp");

      return temp ? temp : <span className="text-slate-400">No record</span>;
    },
  },
  {
    accessorKey: "boarding",
    header: "Boarding",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("boarding")}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let badge = <></>;

      if (status === "Awaiting") {
        badge = <Badge variant="warning">{status}</Badge>;
      } else if (status === "In Transit") {
        badge = <Badge variant="info">{row.getValue("status")}</Badge>;
      } else {
        badge = <Badge variant="success">{row.getValue("status")}</Badge>;
      }

      return badge;
    },
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.getValue("vehicle");

      return vehicle ? (
        vehicle
      ) : (
        <span className="text-slate-400">Unassigned</span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const participant = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-2 w-8">
              <span>Edit Info</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Change Boarding</DropdownMenuItem>
            <DropdownMenuItem>View profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
