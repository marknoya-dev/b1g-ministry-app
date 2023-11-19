// url: /api/participants
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const {
    ticketCode,
    embarkation_status,
    embarkation_temp,
    embarkation_checkInTime,
  } = body.params;

  console.log("PATCH REQUEST FOR TICKET " + ticketCode);
  try {
    const updateParticipant = await prisma.participant.update({
      where: {
        ticketCode,
      },
      data: {
        embarkation_status,
        embarkation_temp,
        embarkation_checkInTime,
      },
    });

    return NextResponse.json(updateParticipant, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update participant", error },
      { status: 200 }
    );
  }
}
