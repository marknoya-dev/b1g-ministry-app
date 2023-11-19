import { Participant, Bus } from "./types";
// import fetch from "isomorphic-fetch";
const dotenvExpand = require("dotenv-expand");
const expanded = dotenvExpand.expand({ parsed: { ...process.env } });

let API_URL = "";
if (expanded.parsed.VERCEL_ENV === "production" || "preview") {
  API_URL = `https://` + expanded.parsed.NEXT_PUBLIC_URL;
} else {
  API_URL = expanded.parsed.NEXT_PUBLIC_URL;
}

export async function getParticipantsData(): Promise<Participant[]> {
  console.log(expanded.parsed.VERCEL_ENV);
  console.log(API_URL);

  // console.group(expanded.parsed);
  const res: any = await fetch(`${API_URL}/api/participants`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getParticipantData(
  ticketCode: string
): Promise<Participant> {
  const res: any = await fetch(`${API_URL}/api/participants/${ticketCode}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data + ${res.status}`);
  }

  return res.json();
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
