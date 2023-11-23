import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ticketCode, rideToVenue_name: currVehicle, newVehicle } = body;

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
      const updateCurrBus = await prisma.bus.update({
        where: {
          id: currBusData.id,
        },
        data: {
          currCapacity: currBusData.currCapacity - 1,
        },
      });
    }

    if (newBusData) {
      const updateNewBus = await prisma.bus.update({
        where: {
          id: newBusData.id,
        },
        data: {
          currCapacity: newBusData.currCapacity + 1,
        },
      });

      const updateParticipant = await prisma.person.update({
        where: {
          role: "PARTICIPANT",
          ticketCode,
        },
        data: {
          rideToVenue_Id: newBusData.id,
          rideToVenue_name: newBusData.name,
        },
      });

      revalidatePath("/embarkation", "page");
      return NextResponse.json(updateParticipant, { status: 200 });
    }
  } catch (error) {
    console.error(error);
  }
}
