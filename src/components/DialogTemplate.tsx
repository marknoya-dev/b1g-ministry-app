import { Button } from "@/components/ui/button";
import { Person } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Dispatch, SetStateAction } from "react";

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
