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
import { resetData } from "@/lib/api";
import { useToast } from "./ui/use-toast";

export default function EditBoardingDialog({ rowData }: { rowData: Person }) {
  const fullName = rowData.firstName + " " + rowData.lastName;
  const status = rowData.embarkation_status as string | undefined;
  const boarding = rowData.rideToVenue;
  const ticketCode = rowData.ticketCode;
  const { toast } = useToast();
  const isNotEditable =
    (status === "ARRIVED" && boarding === "Carpool") ||
    ((status === "ARRIVED" || status === "IN_TRANSIT") &&
      boarding === "Bus from CCF Center");

  const isResetable = status === "CHECKED_IN";

  const [openModal, setOpenModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const resetDataHandler = async () => {
    setIsResetting(true);
    await resetData(ticketCode);
    setIsResetting(false);
    setOpenResetModal(false);
    toast({
      title: "Data Reset",
      description: "Data has been reset",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        disabled={isNotEditable && !isResetable}
        className={`${
          isNotEditable && !isResetable ? "cursor-not-allowed" : ""
        }`}
      >
        <Button variant="ghost" className="h-2 w-8 px-1">
          <span>Edit</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {!isNotEditable ? (
          <DropdownMenuItem
            className="w-full flex items-start"
            onClick={() => setOpenModal((openModal) => !openModal)}
          >
            Change boarding
          </DropdownMenuItem>
        ) : null}

        {isResetable ? (
          <DropdownMenuItem
            className="w-full flex items-start"
            onClick={() =>
              setOpenResetModal((openResetModal) => !openResetModal)
            }
          >
            Reset
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{fullName}</DialogTitle>
            <DialogDescription>Update boarding information</DialogDescription>
          </DialogHeader>
          <EditBoardingForm rowData={rowData} showModalControl={setOpenModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={openResetModal} onOpenChange={setOpenResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Reset data of ${fullName}?`}</DialogTitle>
            <DialogDescription>{`This will remove vehicle data, reset temp input, and revert status to 'Pending'`}</DialogDescription>
          </DialogHeader>
          <Button
            disabled={isResetting}
            variant="destructive"
            onClick={resetDataHandler}
          >
            {isResetting ? "Resetting... Please wait" : "Yes, reset data"}
          </Button>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
  // }
}
