import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const request = await req.json();
  const { ticketCode } = request.body;

  const participantData = await prisma.person.findUnique({
    where: {
      ticketCode,
    },
    select: {
      rideToVenue: true,
      rideToVenue_name: true,
    },
  });

  if (participantData) {
    if (participantData.rideToVenue !== "Carpool") {
      const { rideToVenue_name: busName } = participantData;
      const busData = await prisma.bus.update({
        where: { name: busName ? busName : undefined },
        data: {
          currCapacity: {
            decrement: 1,
          },
        },
      });
    }

    await prisma.person.update({
      where: {
        ticketCode,
      },
      data: {
        embarkation_status: "PENDING",
        embarkation_checkInTime: null,
        embarkation_temp: null,
        rideToVenue_name: null,
        rideToVenue_Id: null,
      },
    });
  }
  return NextResponse.json({ status: 200 });
}
