import React from "react";
import { Participant } from "@prisma/client";

async function getParticipantData(ticketCode: string): Promise<Participant> {
  const API_URL = process.env.NEXT_PUBLIC_API;
  const res = await fetch(`${API_URL}/api/participants/${ticketCode}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data + ${res.status}`);
  }

  const data: Participant = await res.json();
  return data;
}

export default async function Page(url: { params: { id: string } }) {
  const { id } = url.params;
  const data = await getParticipantData(id);
  console.log(id);

  return <div>{id}</div>;
}
