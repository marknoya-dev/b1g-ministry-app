import { Button } from "@/components/ui/button";
import { Person } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import EditBoardingForm from "./EditBoardingForm";

export default function EditBoardingDialog({
  rowData,
}: // embarkation_status,
{
  rowData: Person;
  // embarkation_status: string;
}) {
  const fullName = rowData.firstName + " " + rowData.lastName;
  const status = rowData.embarkation_status as string | undefined;
  const boarding = rowData.rideToVenue;

  const noEditCondition =
    (status === "CHECKED_IN" && boarding === "Carpool") ||
    (status === "IN_TRANSIT" && boarding === "Bus from CCF Center");

  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={noEditCondition}
          className={`${noEditCondition ? "cursor-not-allowed" : ""}`}
        >
          <Button variant="ghost" className="h-2 w-8 px-1">
            <span>Edit</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <DialogTrigger className="w-full flex items-start">
              Change Boarding
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{fullName}</DialogTitle>
          <DialogDescription>Change boarding information</DialogDescription>
        </DialogHeader>
        <EditBoardingForm rowData={rowData} showModalControl={setOpenModal} />
      </DialogContent>
    </Dialog>
  );
}
