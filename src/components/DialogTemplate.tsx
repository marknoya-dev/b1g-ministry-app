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

import { Dispatch, SetStateAction, useState } from "react";
import EditBoardingForm from "./EditBoardingForm";

export default function DialogTemplate({
  title,
  subtitle,
  children,
  openModal,
  setOpenModal,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  // const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
