"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Person } from "./types";
import { Button } from "@/components/ui/button";
import EditBoardingDialog from "@/components/EditBoardingDialog";

export const passengercolumn: ColumnDef<Person>[] = [
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
    size: 180,
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap text-ellipsis w-full overflow-hidden">
          {row.original.firstName} {row.original.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "embarkation_temp",
    header: "Temp (°C)",
    size: 120,
    cell: ({ row }) => {
      const temp = row.original.embarkation_temp;
      return temp ? (
        <span>{temp + "°C"}</span>
      ) : (
        <span className="text-slate-400">No record</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 100,
    cell: ({ row }) => {
      return <EditBoardingDialog rowData={row.original} />;
    },
  },
];
