export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ticketCode, newBoarding } = body;
  try {
    const updateParticipant = await prisma.person.update({
      where: {
        ticketCode: ticketCode,
      },
      data: {
        rideToVenue: newBoarding,
      },
    });

    return NextResponse.json(updateParticipant, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
