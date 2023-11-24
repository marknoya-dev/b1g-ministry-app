export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
// export const revalidate = 0;
// export const fetchCache = "force-no-store";

import axios from "axios";
import { Person, Bus } from "./types";

export async function getParticipantsData(): Promise<Person[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/participants/all`, {
      method: "PUT",
      next: {
        tags: ["embarkation-data"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } else return [];
}

export async function getAllBusData(): Promise<Bus[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/bus/all`, {
      method: "PUT",
      next: {
        tags: ["embarkation-data"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  }

  return [];
}

export async function getParticipantData(ticketCode: string): Promise<any> {
  //Pass an ID to this function and it will return the data for that ID
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/${ticketCode}`, {
      method: "GET",
      cache: "no-cache",
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
  }
}

export async function switchCarpool(
  fromCarpool: string,
  toCarpool: string
): Promise<any> {}

export async function switchBus(fromBus: string, toBus: string): Promise<any> {
  if (API_URL) {
    const res = await axios
      .get(`${API_URL}/api/bus/${fromBus}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(`Failed to fetch data + ${res.status}`);
      });

    if (res.ok) {
      return res.json();
    }
  } else {
    return null;
  }
}

export async function updateParticipantVehicle(body: {
  ticketCode: string; //PARTICIPANT TICKET
  newVehicle: string; //NEW VEHICLE
}): Promise<any> {
  const { ticketCode, newVehicle } = body;

  if (API_URL) {
    try {
      const req = await getParticipantData(ticketCode);
      const { rideToVenue_name: currVehicle } = req.participant;

      if (req.status === 200) {
        const updateParticipantVehicle = await axios.patch(
          `${API_URL}/api/participants/switch-bus/`,
          {
            ticketCode,
            currVehicle,
            newVehicle,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export async function updateParticipantBoarding(body: {
  ticketCode: string;
  newBoarding: string;
}): Promise<any> {
  const { ticketCode, newBoarding } = body;
  if (API_URL) {
    try {
      const req = await getParticipantData(ticketCode);
      const { ticketCode: ticket } = req.participant;

      if (req.status === 200) {
        const updateParticipantVehicle = await axios.patch(
          `${API_URL}/api/participants/switch-boarding/`,
          {
            ticketCode: ticket,
            newBoarding,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
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

export async function getAllAvailableBus(): Promise<any> {
  if (API_URL) {
    const response = await getAllBusData();

    const availableBus = response.filter((bus) => {
      if (bus.currCapacity !== bus.maxCapacity) {
        return bus;
      }
    });

    return availableBus;
  }
}

export async function getBusData(busName: string): Promise<any> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/api/bus/${busName}`);

    const data = await response.json();
    return data;
  }
}

export async function updateBusCapacity(
  name: string,
  maxCapacity: number
): Promise<any> {
  if (API_URL) {
    const response = await axios.patch(`${API_URL}/api/bus/update-capacity/`, {
      body: {
        name,
        maxCapacity,
      },
    });
  }
}
