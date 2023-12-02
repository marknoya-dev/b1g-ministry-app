"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Person } from "./types";
import { Button } from "@/components/ui/button";
import EditBoardingDialog from "@/components/EditBoardingDialog";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TicketCodeCell = ({ row }: { row: Row<Person> }) => {
  const ticketCode: string = row.getValue("ticketCode");
  const { toast } = useToast();

  function copyTicketCode() {
    navigator.clipboard.writeText(ticketCode);
    toast({
      title: "Copied to clipboard",
      description: "Ticket code copied to clipboard",
      duration: 3000,
    });
  }
  return (
    <div
      onClick={copyTicketCode}
      className="whitespace-nowrap text-ellipsis w-full overflow-hidden flex gap-2 hover:text-gray-600 cursor-pointer"
    >
      {ticketCode}
      <div className="w-[16px] h-[16px]">
        <Copy className="text-gray-600" size={16} />
      </div>
    </div>
  );
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "ticketCode",
    size: 230,
    header: "Ticket",
    cell: ({ row }) => {
      return <TicketCodeCell row={row} />;
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
    accessorKey: "mobile",
    header: "Phone #",
    size: 170,
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
          {row.original.mobile}
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
    accessorKey: "rideToVenue",
    header: "Boarding",
    size: 100,
    cell: ({ row }) => {
      const rideToVenue = row.original.rideToVenue;

      switch (rideToVenue) {
        case "Bus from CCF Center":
          return <Badge variant="default">Bus</Badge>;
          break;
        case "Carpool":
          return <Badge variant="secondary">Carpool</Badge>;
        case "Commute":
          return <Badge variant="secondary">Commute</Badge>;
          break;
      }
    },
  },
  {
    accessorKey: "rideToVenue_name",
    header: "Vehicle",
    size: 110,
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
    id: "embarkation_status",
    accessorKey: "embarkation_status",
    size: 110,
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.embarkation_status as string | undefined;
      switch (status) {
        case "PENDING":
          return <Badge variant="warning">Pending</Badge>;

        case "IN_TRANSIT":
          return <Badge variant="orange">In Transit</Badge>;

        case "CHECKED_IN":
          return <Badge variant="info">Checked In</Badge>;

        case "ARRIVED":
          return <Badge variant="success">Arrived</Badge>;

        case "NO_SHOW":
          return <Badge variant="destructive">No Show</Badge>;

        default:
          break;
      }
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
