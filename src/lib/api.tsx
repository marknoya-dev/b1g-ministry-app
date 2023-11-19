import { Participant, Bus } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getParticipantsData(): Promise<any> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } else return null;
}

export async function getParticipantData(ticketCode: string): Promise<any> {
  console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/${ticketCode}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data + ${res.status}`);
    }

    return res.json();
  } else {
    console.log(API_URL);
    return null;
  }
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
