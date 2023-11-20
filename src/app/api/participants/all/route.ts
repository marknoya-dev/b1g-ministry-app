// url: /api/participants
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const participants = await prisma.participant.findMany();
    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 200 }
    );
  }
}
