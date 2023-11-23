export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const buses = await prisma.bus.findMany();
    return NextResponse.json(buses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch buses", error },
      { status: 200 }
    );
  }
}
