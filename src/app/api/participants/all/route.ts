export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
  revalidatePath("/embarkation");
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
