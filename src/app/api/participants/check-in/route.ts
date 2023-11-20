// url: /api/participants
import prisma from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ticketCode, embarkation_temp, embarkation_checkInTime } = body;
  try {
    const buses = await prisma.bus.findMany();
    const availableBus = buses.filter((bus) => {
      if (bus.currCapacity !== bus.maxCapacity) {
        return bus;
      }
    });

    const updateBus = await prisma.bus.update({
      where: {
        id: availableBus[0].id,
      },
      data: {
        currCapacity: availableBus[0].currCapacity + 1,
      },
    });

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

    const updateParticipant = await prisma.participant.update({
      where: {
        ticketCode,
      },
      data: {
        embarkation_status: "CheckedIn",
        embarkation_temp,
        embarkation_checkInTime: formattedNowDate,
        rideToVenue_Id: updateBus.id,
      },
    });

    // console.log("Updated Participant", updateParticipant);

    return NextResponse.json(updateParticipant, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update participant", error },
      { status: 200 }
    );
  }
}
