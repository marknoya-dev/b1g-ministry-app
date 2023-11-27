export const dynamic = "force-dynamic";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Settings2, ArrowBigRightDash, Printer, Flag } from "lucide-react";
import DialogTemplate from "./DialogTemplate";
import BusSettingsForm from "./BusSettingsForm";
import PassengerTable from "./PassengerTable";
import { dispatchBus, arrivedBus } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const CapacityCard = ({ label, value, max, status }) => {
  const relativeValue = (value / max) * 100;
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openDispatchBusModal, setOpenDispatchBusModal] = useState(false);
  const [openArrivalModal, setOpenArrivalModal] = useState(false);
  const { toast } = useToast();
  function openSettingsModalHandler() {
    setOpenSettingsModal(true);
  }

  function openDispatchBusModalHandler() {
    setOpenDispatchBusModal(true);
  }

  function onDispatchHandler() {
    dispatchBus(label);
    toast({
      title: "Bus dispatched to MMRC",
      description: "Bus has been filled and is on the way to the venue",
      duration: 2000,
    });
    setOpenDispatchBusModal(false);
  }

  function ToggleBusArrivalModal() {
    setOpenArrivalModal((openArrivalModal) => !openArrivalModal);
  }

  function onArrivalHandler() {
    arrivedBus(label);
    toast({
      title: "Bus has arrived at MMRC",
      description: "All passengers have been marked as arrived",
      duration: 2000,
    });
    setOpenArrivalModal(false);
  }

  return (
    <Card
      className={`flex gap-4 p-3 ${
        status === "IN_TRANSIT"
          ? "border-orange-400"
          : status === "ARRIVED" || value === max
          ? "border-green-700"
          : ""
      }`}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex gap-1 items-end">
          <span
            className={`font-semibold text-md ${
              status === "IN_TRANSIT"
                ? "text-orange-400"
                : status === "ARRIVED" || value === max
                ? "text-green-700"
                : "text-gray-700"
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
            status === "IN_TRANSIT"
              ? "bg-orange-400"
              : status === "ARRIVED" || value === max
              ? "bg-green-700"
              : "text-gray-700"
          }`}
        />
      </div>

      {status !== "IN_TRANSIT" && status !== "ARRIVED" ? (
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
      ) : (
        <div className="flex gap-1">
          {status !== "ARRIVED" ? (
            <Button
              onClick={ToggleBusArrivalModal}
              className="w-[35px] p-2 h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-4000"
            >
              <Flag className="text-gray-500 " />
            </Button>
          ) : null}

          <Button
            onClick={() => console.log("print")}
            className="w-[35px] p-2 h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-4000"
          >
            <Printer className="text-gray-500 " />
          </Button>
        </div>
      )}

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
        <PassengerTable busName={label} />
        <Button onClick={onDispatchHandler}>Dispatch Bus to MMRC</Button>
      </DialogTemplate>

      <DialogTemplate
        openModal={openArrivalModal}
        setOpenModal={setOpenArrivalModal}
        title="Flag bus arrival at MMRC? 🏁"
        subtitle={`Change all ${label} passengner status as arrived`}
      >
        <div className="flex gap-2">
          <Button
            onClick={ToggleBusArrivalModal}
            variant="secondary"
            className="w-1/3"
          >{`Cancel`}</Button>
          <Button
            onClick={onArrivalHandler}
            className="w-full"
          >{`Yes, ${label} has arrived at MMRC`}</Button>
        </div>
      </DialogTemplate>
    </Card>
  );
};

export default CapacityCard;
