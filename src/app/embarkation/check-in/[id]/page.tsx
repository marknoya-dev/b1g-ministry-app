import React, { useEffect } from "react";
import { Participant } from "@prisma/client";

async function getParticipantData(ticketCode: string): Promise<Participant> {
  const res = await fetch(
    `http://localhost:3000/api/participants/${ticketCode}`
  );

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
