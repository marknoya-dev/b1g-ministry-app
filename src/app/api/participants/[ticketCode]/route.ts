import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { ticketCode: string } }
) {
  try {
    const { ticketCode } = params;
    const participant = await prisma.participant.findUnique({
      where: {
        ticketCode,
      },
    });

    if (!participant) {
      return NextResponse.json({
        participant,
        error: "Participant not found",
        status: 404,
      });
    } else return NextResponse.json({ participant, status: 200 });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { ticketCode: string } }
) {
  try {
    const body = await request.json();

    const updateParticipant = await prisma.participant.update({
      where: {
        ticketCode: params.ticketCode,
      },
      data: {
        embarkation_temp: "20",
      },
    });
  } catch (error) {}
}
