import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ticketCode, currVehicle, newVehicle } = body;
  let updateParticipant;
  try {
    const currBusData = await prisma.bus.findUnique({
      where: {
        name: currVehicle,
      },
      select: {
        id: true,
        currCapacity: true,
      },
    });
    const newBusData = await prisma.bus.findUnique({
      where: {
        name: newVehicle,
      },
      select: {
        id: true,
        name: true,
        currCapacity: true,
      },
    });

    if (currBusData) {
      await prisma.bus.update({
        where: {
          id: currBusData.id,
        },
        data: {
          currCapacity: currBusData.currCapacity - 1,
        },
      });
    }
    if (newBusData) {
      await prisma.bus.update({
        where: {
          id: newBusData.id,
        },
        data: {
          currCapacity: newBusData.currCapacity + 1,
        },
      });

      updateParticipant = await prisma.person.update({
        where: {
          role: "PARTICIPANT",
          ticketCode,
        },
        data: {
          rideToVenue_Id: newBusData.id,
          rideToVenue_name: newBusData.name,
        },
      });
    }
    return NextResponse.json(updateParticipant, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
