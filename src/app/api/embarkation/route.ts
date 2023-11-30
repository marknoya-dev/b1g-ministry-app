export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import url from "url";

export async function GET(req: Request) {
  const { query } = url.parse(req.url, true);
  const type = query.type as string;

  const role = type === "participants" ? "PARTICIPANT" : "VOLUNTEER";

  try {
    const total = await prisma.person.count({
      where: {
        role,
      },
    });

    const arrived = await prisma.person.count({
      where: {
        role,
        embarkation_status: "ARRIVED",
      },
    });

    const responseBody = {
      total,
      arrived,
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 200 }
    );
  }
}
