import { Participant, Bus } from "./types";

const API_URL = process.env.NEXT_PUBLIC_URL;
export async function getParticipantsData(): Promise<Participant[]> {
  console.log(`${API_URL}/api/participants`);
  const res = await fetch(`${API_URL}/api/participants`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getParticipantData(
  ticketCode: string
): Promise<Participant> {
  const res = await fetch(`${API_URL}/api/participants/${ticketCode}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data + ${res.status}`);
  }

  const data: Participant = await res.json();
  return data;
}

export async function getBusData(): Promise<Bus[]> {
  // Fetch data from your API here.
  return [
    {
      busName: "Bus 1",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 2",
      maxCapacity: 40,
      currCapacity: 4,
    },
    {
      busName: "Bus 3",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 4",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 5",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 6",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 7",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 8",
      maxCapacity: 40,
      currCapacity: 0,
    },
  ];
}
