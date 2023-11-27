import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const request = await req.json();
  const { name, maxCapacity }: { name: string; maxCapacity: number } =
    request.body;

  try {
    const updatedBus = await prisma.bus.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });

    if (updatedBus) {
      const dispatchedBusPassengers = await prisma.person.updateMany({
        where: {
          rideToVenue_Id: updatedBus.id,
        },
        data: {
          embarkation_status: "ARRIVED",
        },
      });

      await prisma.bus.update({
        where: {
          id: updatedBus.id,
        },
        data: {
          status: "ARRIVED",
        },
      });

      return NextResponse.json(dispatchedBusPassengers, { status: 200 });
    }
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
