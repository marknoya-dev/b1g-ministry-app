"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Participant } from "./types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const columnHelper = createColumnHelper<Participant>();
export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "ticketCode",
    size: 400,
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
    cell: ({ row }) => {
      const ticketCode: string = row.getValue("ticketCode");
      return ticketCode.slice(10);
    },
  },
  {
    id: "fullName",
    header: "Name",
    size: 300,
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: "mobileNum",
    header: "Mobile Num",
    size: 400,
  },
  {
    accessorKey: "rideToVenue_temp",
    header: "Temp Check",
    size: 400,
    cell: ({ row }) => {
      const temp = row.getValue("rideToVenue_temp");

      return temp ? temp : <span className="text-slate-400">No record</span>;
    },
  },
  {
    accessorKey: "rideToVenue",
    header: "Boarding",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("rideToVenue")}</Badge>;
    },
  },
  {
    id: "status",
    accessorKey: "embarkation_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("embarkation_status");
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
    accessorKey: "rideToVenue_name",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.getValue("rideToVenue_name");

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
