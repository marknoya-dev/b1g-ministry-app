export const dynamic = "force-dynamic";

import axios from "axios";
import { Person, Bus } from "./types";
import { revalidateTag } from "next/cache";

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getParticipantsData(): Promise<Person[]> {
  revalidateTag("embarkation-data");
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/participants/all`, {
      next: {
        tags: ["embarkation-data"],
      },
      // cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } else return [];
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
  revalidateTag("embarkation-data");
  if (API_URL) {
    const res = await axios
      .get(`${API_URL}/api/bus/${fromBus}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.error(`Failed to fetch data + ${res.status}`);
      });

    if (res.ok) {
      console.log(res);
    }
    return res.json();
  } else {
    return null;
  }
}

export async function updateParticipantVehicle(body: {
  ticketCode: string; //PARTICIPANT TICKET
  rideToVenue: string; //CARPOOL OR BUS
  rideToVenue_name: string; //CARPOOL OR BUS NAME
  newVehicle: string; //NEW VEHICLE
  updateType: string; //CARPOOL_CHANGE OR BUS_CHANGE
}): Promise<any> {
  const { ticketCode, rideToVenue_name, rideToVenue, updateType, newVehicle } =
    body;

  if (API_URL) {
    try {
      if (updateType === "CARPOOL_CHANGE") {
        //CHANGE CARPOOL VEHICLE
      } else if (updateType === "BUS_CHANGE") {
        console.log(
          "updateParticipantVehicle",
          ticketCode,
          rideToVenue_name,
          newVehicle
        );

        const updateParticipantVehicle = await axios.patch(
          `${API_URL}/api/participants/switch-bus/`,
          { ticketCode, rideToVenue_name, newVehicle }
        );
      }

      // const response = await axios.patch(
      //   `${API_URL}/api/participants/change-vehicle/`,
      //   {
      //     ticketCode,
      //     newVehicle,
      //   }
      // );
      // if (response.status === 200) {
      //   return response.data;
      // } else {
      //   throw new Error("Failed to fetch data");
      // }
    } catch (error) {
      console.error(error);
    }
  }
}

export async function getAllBusData(): Promise<Bus[]> {
  if (API_URL) {
    const res: any = await fetch(`${API_URL}/api/bus/all`, {
      next: {
        tags: ["embarkation-data"],
      },
      method: "GET",
      // cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function updateBusData(busId: string): Promise<any> {
  if (API_URL) {
    const response = await axios.patch(`${API_URL}/api/bus/update/`, {
      body: {
        busId,
      },
    });
  }
}
