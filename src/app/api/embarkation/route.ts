export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalParticipants = await prisma.person.count({
      where: {
        role: "PARTICIPANT",
      },
    });

    const arrivedParticipants = await prisma.person.count({
      where: {
        embarkation_status: "ARRIVED",
      },
    });

    const responseBody = {
      totalParticipants,
      arrivedParticipants,
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 200 }
    );
  }
}
