"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Participant } from "./types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const columnHelper = createColumnHelper<Participant>();
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
};

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "ticketCode",
    size: 140,
    header: "Ticket",
    cell: ({ row }) => {
      const ticketCode: string = row.getValue("ticketCode");
      return (
        <div className="whitespace-nowrap text-ellipsis w-full">
          {ticketCode}
        </div>
      );
    },
  },
  {
    id: "fullName",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="h-4" />
        </Button>
      );
    },
    size: 250,
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: "mobileNum",
    header: "Phone #",
    size: 120,
    cell: ({}) => {
      return "09271418149";
    },
  },
  {
    accessorKey: "rideToVenue_temp",
    header: "Temp",
    size: 100,
    cell: ({ row }) => {
      const temp = row.getValue("rideToVenue_temp");

      return temp ? temp : <span className="text-slate-400">No record</span>;
    },
  },
  {
    accessorKey: "rideToVenue",
    header: "Boarding",
    size: 150,
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("rideToVenue")}</Badge>;
    },
  },
  {
    id: "status",
    accessorKey: "embarkation_status",
    size: 100,
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
    accessorKey: "rideToVenue_name",
    header: "Vehicle",
    size: 120,
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
    // header: "Action",
    size: 90,
    cell: ({ row }) => {
      const participant = row.original;
      const ticketCode: String = row.getValue("ticketCode");
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-2 w-14 px-1">
                <span>Edit Info</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Change Boarding</DropdownMenuItem>
              <DropdownMenuItem>
                <DialogTrigger className="w-full flex items-start">
                  View Profile
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{row.getValue("fullName")}</DialogTitle>
              <DialogDescription>Profile</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <span className="text-gray-600 text-xs font-bold uppercase tracking-wide">
                Ticket Code
              </span>
              <p className="text-gray-600">{ticketCode.slice(10)}</p>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
