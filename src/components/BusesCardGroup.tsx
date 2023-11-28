"use client";
export const dynamic = "force-dynamic";
import CapacityCard from "./CapacityCard";
import { Bus } from "@/lib/types";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export default function BusesCardGroup({ buses }: { buses: Bus[] }) {
  return (
    <div className="grid grid-rows-2 gap-3 grid-cols-1 md:grid-cols-4">
      {buses ? (
        buses
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
