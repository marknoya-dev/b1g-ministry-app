// url: /api/participants
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const participants = await prisma.participant.findMany();
    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch participants", error },
      { status: 200 }
    );
  }
}

// export const POST = async (request) => {
//   try {
//     const body = await req.json();
//     const { firstName, lastName } = body;
//     const newParticipant = await prisma.participants.create({
//       data: {
//         firstName,
//         lastName,
//       },
//     });

//     return NextResponse.json(newParticipant);
//   } catch (err) {
//     return NextResponse.json({ message: "POST Error", err }, { status: 500 });
//   }
// };

// export const GET = async () => {
//   try {
//     const participant = await prisma.participants.findMany();
//     return NextResponse.json(participant);
//   } catch (err) {
//     return NextResponse.json({ message: "GET Error", err }, { status: 500 });
//   }
// };
