"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import CapacityCard from "./CapacityCard";
import { Bus } from "@/lib/types";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export default function BusesCardGroup({ buses }: { buses?: Bus[] }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: allBuses,
    error: BusesError,
    isLoading: isLoadingBuses,
  } = useSWR(`${API_URL}/api/bus/all`, fetcher);

  if (isLoadingBuses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-2 gap-3 grid-cols-1 md:grid-cols-4">
      {allBuses ? (
        allBuses
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a: any, b: any) => a.name.localeCompare(b.name)) // Sort by bus name
          .map((bus: Bus) => (
            <CapacityCard
              label={bus.name}
              key={bus.name}
              value={bus.currCapacity}
              max={bus.maxCapacity}
              status={bus.status}
            />
          ))
      ) : (
        <div>No buses detected.</div>
      )}
    </div>
  );
}
