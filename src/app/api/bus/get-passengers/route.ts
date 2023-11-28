export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import url from "url";

export async function GET(req: Request, body: any) {
  const { query } = url.parse(req.url, true);
  const name = query.name as string;

  try {
    const findBusId = await prisma.bus.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });

    if (!findBusId) {
      // Handle the case when the bus is not found
      return NextResponse.json({ error: "Bus not found" }, { status: 404 });
    }

    const busID = findBusId.id;

    const getBusPassengers = await prisma.person.findMany({
      where: {
        rideToVenue_Id: busID,
      },
      select: {
        ticketCode: true,
        firstName: true,
        lastName: true,
        embarkation_temp: true,
        rideToVenue: true,
        rideToVenue_name: true,
        teamName: true,
      },
    });

    return NextResponse.json(getBusPassengers, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
