import axios from "axios";
import { Participant, Bus } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getParticipantsData(): Promise<any> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/all`);

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

export async function checkInParticipant(body: {
  ticketCode: string;
  embarkation_temp: string;
  embarkation_status: string;
}): Promise<any> {
  const { ticketCode, embarkation_temp, embarkation_status } = body;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedNowDate = now.toLocaleString("en-US", options);

  if (API_URL) {
    const data = await axios
      .patch(`${API_URL}/api/participants/update/`, {
        params: {
          ticketCode,
          embarkation_temp,
          embarkation_status,
          embarkation_checkInTime: formattedNowDate,
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else return null;
}
