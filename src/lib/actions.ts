"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Person, Bus } from "./types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export async function getParticipantsData(): Promise<Person[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/participants/all`, {
      method: "PUT",
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
      method: "PUT",
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

export const clearCacheByPath = async (path: string) => {
  try {
    revalidatePath(path);
  } catch (error) {
    console.error("clearCacheByPath=> ", error);
  }
};

export const clearCacheByTag = async (tag: string) => {
  try {
    revalidateTag(tag);
  } catch (error) {
    console.error("clearCacheByTag=> ", error);
  }
};
