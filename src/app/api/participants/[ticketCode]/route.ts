import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { ticketCode: string } }
) {
  try {
    const { ticketCode } = params;

    const participant = await prisma.person.findUnique({
      where: {
        role: "PARTICIPANT",
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
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 500 }
    );
  }
}
