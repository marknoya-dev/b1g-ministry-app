import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Settings2, ArrowBigRightDash } from "lucide-react";
import DialogTemplate from "./DialogTemplate";
import BusSettingsForm from "./BusSettingsForm";

const CapactiyCard = ({ label, value, max }) => {
  const relativeValue = (value / max) * 100;
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openDispatchBusModal, setOpenDispatchBusModal] = useState(false);
  function openSettingsModalHandler() {
    setOpenSettingsModal(true);
  }

  function openDispatchBusModalHandler() {
    setOpenDispatchBusModal(true);
  }

  return (
    <Card
      className={`flex gap-4 p-3 ${value === max ? "border-green-700" : ""}`}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex gap-1 items-end">
          <span
            className={`font-semibold text-md ${
              value === max ? "text-green-700" : "text-gray-700"
            }`}
          >
            {label}
          </span>
          <div className="flex flex-row gap-[2px] text-xs font-medium text-gray-700 mb-[3px]">
            <span>({value}</span>
            <span>/</span>
            <span>{max})</span>
          </div>
        </div>
        <Progress
          value={relativeValue}
          className={`w-full ${
            value === max ? "bg-green-700" : "text-gray-700"
          }`}
        />
      </div>
      <div className="flex gap-1">
        <Button
          onClick={openSettingsModalHandler}
          className="w-[35px] p-[7px] h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-400"
        >
          <Settings2 className="text-gray-500" />
        </Button>
        <Button
          onClick={openDispatchBusModalHandler}
          className="w-[35px] p-0 h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-4000"
        >
          <ArrowBigRightDash className="text-gray-500 " />
        </Button>
      </div>
      <DialogTemplate
        openModal={openSettingsModal}
        setOpenModal={setOpenSettingsModal}
        title="Bus Settings"
        subtitle="Edit bus preferences"
      >
        <BusSettingsForm
          busName={label}
          maxCapacity={max}
          modalControl={setOpenSettingsModal}
        />
      </DialogTemplate>

      <DialogTemplate
        openModal={openDispatchBusModal}
        setOpenModal={setOpenDispatchBusModal}
        title="Dispatch Bus"
        subtitle="Print participant list and dispatch bus to venue"
      >
        Hello
      </DialogTemplate>
    </Card>
  );
};

export default CapactiyCard;
