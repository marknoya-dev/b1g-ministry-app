"use server";
import { revalidatePath, revalidateTag } from "next/cache";

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
