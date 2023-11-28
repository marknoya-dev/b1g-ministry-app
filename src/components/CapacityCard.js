"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Settings, ArrowBigRightDash, Printer, Flag } from "lucide-react";
import DialogTemplate from "./DialogTemplate";
import BusSettingsForm from "./BusSettingsForm";
import PassengerTable from "./PassengerTable";
import { useRouter } from "next/navigation";
import fetcher from "@/lib/fetcher";
import {
  dispatchBus,
  arrivedBus,
  getBusPassengers,
  getBusData,
} from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useSWR from "swr";

const CapacityCard = ({ label, value, max, status }) => {
  const relativeValue = (value / max) * 100;
  const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openDispatchBusModal, setOpenDispatchBusModal] = useState(false);
  const [openArrivalModal, setOpenArrivalModal] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
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
    router.refresh();
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
    router.refresh();
  }

  const { data: passengers } = useSWR(
    `${API_URL}/api/bus/get-passengers?name=${label}`,
    fetcher
  );
  const { data: busData } = useSWR(`${API_URL}/api/bus/${label}`, fetcher);

  async function onPrintHandler() {
    console.log("Bus Data", busData);
    console.log("Passengers", passengers);
    const doc = new jsPDF();

    doc.addImage("/commit-dark.png", "PNG", 8, -8, 60, 60);
    doc.setFont("helvetica", "bold");
    doc.text(`${label} Passengers`, 14, 40);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Logged Departure:`, 140, 20);
    doc.text(`${busData.departureTime}`, 140, 24);

    doc.setFontSize(12);
    doc.text("Assigned bus marshall:", 14, 48);
    doc.line(60, 48, 120, 48);
    autoTable(doc, {
      theme: "striped",
      startY: 53,
      body: passengers,
      headStyles: {
        fillColor: "#000",
        textColor: "#fff",
        halign: "left",
      },
      columns: [
        { header: "Ticket", dataKey: "ticketCode" },
        { header: "First Name", dataKey: "firstName" },
        { header: "Last Name", dataKey: "lastName" },
        { header: "Team", dataKey: "teamName" },
        { header: "Temp", dataKey: "embarkation_temp" },
      ],
    });

    doc.save(`${label} Passenger List`);
  }

  return (
    <Card
      className={`flex gap-4 p-3 ${
        status === "IN_TRANSIT"
          ? "border-orange-400 bg-orange-50"
          : status === "ARRIVED"
          ? "border-green-700 bg-green-50"
          : value === max
          ? "border-blue-800 bg-blue-50"
          : ""
      }`}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex gap-1 items-end">
          <span
            className={`font-semibold text-md ${
              status === "IN_TRANSIT"
                ? "text-orange-400"
                : status === "ARRIVED"
                ? "text-green-700"
                : value === max
                ? "text-blue-600"
                : ""
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
          value={
            status === "IN_TRANSIT" || status === "ARRIVED"
              ? 100
              : relativeValue
          }
          className={`w-full ${
            status === "IN_TRANSIT"
              ? "bg-orange-400"
              : status === "ARRIVED"
              ? "bg-green-700"
              : value === max
              ? "bg-blue-600"
              : ""
          }`}
        />
      </div>

      {status !== "IN_TRANSIT" && status !== "ARRIVED" ? (
        <div className="flex gap-1">
          <Button
            onClick={openSettingsModalHandler}
            className="w-[35px] p-[7px] h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-400"
          >
            <Settings className="text-gray-500" />
          </Button>
          <Button
            onClick={openDispatchBusModalHandler}
            disabledvalue={value === 0}
            className={`w-[35px] p-0 h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-4000 ${
              value === 0 ? "cursor-not-allowed" : ""
            }"}`}
          >
            <ArrowBigRightDash className="text-gray-500 " />
          </Button>
        </div>
      ) : (
        <div className="flex gap-1">
          {status !== "ARRIVED" ? (
            <Button
              onClick={ToggleBusArrivalModal}
              className="w-[35px] p-2 h-[35px] bg-white border border-success-300 hover:bg-neutral-50 hover:border-gray-4000"
            >
              <Flag className="text-gray-500" />
            </Button>
          ) : null}
          <Button
            onClick={onPrintHandler}
            className="w-[35px] p-2 h-[35px] bg-white border border-gray-300 hover:bg-neutral-50 hover:border-gray-4000"
          >
            <Printer className="text-gray-500" />
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
        title={`Dispatch ${label}`}
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
