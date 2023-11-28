export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const request = await req.json();
  const { name, maxCapacity }: { name: string; maxCapacity: number } =
    request.body;

  try {
    const updatedBus = await prisma.bus.update({
      where: {
        name,
      },
      data: {
        maxCapacity,
      },
    });

    return NextResponse.json(updatedBus, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Could not update bus",
        error,
      },
      { status: 500 }
    );
  }
}
