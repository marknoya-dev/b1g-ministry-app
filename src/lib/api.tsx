import axios from "axios";
import { Participant, Bus } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getParticipantsData(): Promise<Participant[]> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/all`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } else return [];
}

export async function getParticipantData(ticketCode: string): Promise<any> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/${ticketCode}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data + ${res.status}`);
    }
    return res.json();
  } else {
    return null;
  }
}

export async function getAllBusData(): Promise<Bus[]> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/bus/all`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data + ${res.status}`);
    }

    return res.json();
  } else {
    return [];
  }
}

export async function getAvailableBus(): Promise<any> {
  if (API_URL) {
    const response = await getAllBusData();

    const availableBus = response.filter((bus) => {
      if (bus.currCapacity !== bus.maxCapacity) {
        return bus;
      }
    });

    return availableBus[0];
  }
}

export async function updateBusData(busId: string): Promise<any> {
  if (API_URL) {
    const response = await axios.patch(`${API_URL}/api/bus/update/`, {
      body: {
        busId,
      },
    });
  }
}

async function assignBus(ticketCode: string): Promise<any> {
  const availableBuses = await getAvailableBus();
  console.log(availableBuses);
}

export async function checkInParticipant(body: {
  ticketCode: string;
  embarkation_temp: string;
  rideToVenue: string;
}): Promise<any> {
  const { ticketCode, embarkation_temp, rideToVenue } = body;

  if (API_URL) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/participants/check-in/`,
        {
          ticketCode,
          embarkation_temp,
          rideToVenue,
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  } else return null;
}
