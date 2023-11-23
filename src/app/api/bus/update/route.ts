import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { name }: { name: string } = body;

  try {
    const updatedBus = await prisma.bus.update({
      where: {
        name,
      },
      data: {
        currCapacity: 0,
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
