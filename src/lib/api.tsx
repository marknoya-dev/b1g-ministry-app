"use server";
import axios from "axios";
import { Person, Bus } from "./types";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateEmbarkation() {
  revalidateTag("embarkation-data");
  revalidatePath("/embarkation");
}

export async function getParticipantsData(): Promise<Person[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/participants/all`, {
      method: "GET",
      // cache: "no-store",
      next: {
        tags: ["participants-data", "embarkation-data"],
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
      method: "GET",
      // cache: "no-store",
      next: {
        tags: ["bus-data", "embarkation-data"],
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
      // cache: "no-store",
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
  ticketCode: string;
  newVehicle: string;
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

export async function getBusData(name: string): Promise<any> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/api/bus/${name}`);
    const data = await response.json();
    return data;
  }
}

export async function getBusPassengers(name: string): Promise<any> {
  if (API_URL) {
    try {
      const response = await fetch(
        `${API_URL}/api/bus/get-passengers?name=${name}`,
        {
          method: "GET",
          // cache: "no-store",
          next: {
            tags: ["passengers-data"],
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Failed to fetch data. Status code: ${response.status}`);
      }
    } catch (err) {
      console.error(`Failed to fetch data: ${err}`);
    }
  }
}

export async function updateBusCapacity(
  name: string,
  maxCapacity: string
): Promise<any> {
  if (API_URL) {
    await axios.patch(`${API_URL}/api/bus/update-capacity/`, {
      body: {
        name,
        maxCapacity: parseInt(maxCapacity),
      },
    });
  }
}

export async function dispatchBus(name: string) {
  console.log("API_URL", API_URL);
  if (API_URL) {
    await axios.patch(`${API_URL}/api/bus/dispatch/`, {
      body: {
        name,
      },
    });
  }
}

export async function arrivedBus(name: string) {
  if (API_URL) {
    await axios.patch(`${API_URL}/api/bus/arrived/`, {
      body: {
        name,
      },
    });
  }
}
