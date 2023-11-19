import React from "react";
import { getParticipantData } from "@/lib/api";

export default async function Page(url: { params: { id: string } }) {
  const { id } = url.params;
  const data = await getParticipantData(id);

  return <div>{id}</div>;
}
