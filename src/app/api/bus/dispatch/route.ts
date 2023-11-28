export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const now = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};
const formattedNowDate = now.toLocaleString("en-US", options);

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

    console.log(updatedBus, "updatedBus");
    if (updatedBus) {
      const dispatchedBusPassengers = await prisma.person.updateMany({
        where: {
          rideToVenue_Id: updatedBus.id,
        },
        data: {
          embarkation_status: "IN_TRANSIT",
        },
      });

      await prisma.bus.update({
        where: {
          id: updatedBus.id,
        },
        data: {
          status: "IN_TRANSIT",
          departureTime: formattedNowDate,
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
