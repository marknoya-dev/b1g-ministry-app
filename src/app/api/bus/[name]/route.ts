import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;

    const bus = await prisma.bus.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        maxCapacity: true,
        currCapacity: true,
        name: true,
      },
    });

    if (!bus) {
      return NextResponse.json({
        bus,
        error: "Bus not found",
        status: 404,
      });
    } else return NextResponse.json({ bus, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch bus", error },
      { status: 500 }
    );
  }
}
