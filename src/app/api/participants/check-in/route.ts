// url: /api/participants
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const now = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

const formattedNowDate = now.toLocaleString("en-US", options);

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ticketCode, embarkation_status, embarkation_temp, rideToVenue } =
    body;

  try {
    if (embarkation_status !== "CHECKED_IN") {
      if (rideToVenue === "Carpool") {
        const updateParticipant = await prisma.person.update({
          where: {
            role: "PARTICIPANT",
            ticketCode,
          },
          data: {
            embarkation_status: "ARRIVED",
            embarkation_temp,
            embarkation_checkInTime: formattedNowDate,
          },
        });
        return NextResponse.json(updateParticipant, { status: 200 });
      } else {
        //rideToVenue === "Bus"
        const buses = await prisma.bus.findMany();

        //Filter for available buses
        const availableBus = buses
          .filter(
            (bus) =>
              bus.currCapacity !== bus.maxCapacity &&
              (bus.status === "ON_QUEUE" || bus.status === "BOARDING")
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        //Update the first available bus
        const updateBus = await prisma.bus.update({
          where: {
            id: availableBus[0].id,
          },
          data: {
            currCapacity: availableBus[0].currCapacity + 1,
            status: "BOARDING",
          },
        });

        //Update participant with bus info
        const updateParticipant = await prisma.person.update({
          where: {
            ticketCode,
          },
          data: {
            embarkation_status: "CHECKED_IN",
            embarkation_temp,
            embarkation_checkInTime: formattedNowDate,
            rideToVenue_Id: updateBus.id,
            rideToVenue_name: updateBus.name,
          },
        });

        return NextResponse.json(updateParticipant, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update participant", error },
      { status: 200 }
    );
  }
}
