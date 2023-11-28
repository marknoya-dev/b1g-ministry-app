"use client";
export const dynamic = "force-dynamic";
import CapacityCard from "./CapacityCard";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import fetcher from "@/lib/fetcher";
import { Bus } from "@/lib/types";

import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";
import ErrorMessage from "./ErrorMessage";
export default function BusesCardGroup() {
  const {
    data: allBuses,
    error: BusesError,
    isLoading: isLoadingBuses,
    isValidating,
  } = useSWR(`${API_URL}/api/bus/all`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshInterval: 5000,
  });

  const style = {
    width: 90,
  };

  if (isLoadingBuses) {
    return (
      <div className="flex justify-center items-center ">
        <Lottie animationData={LoadingDots} loop={true} style={style} />
      </div>
    );
  }

  if (BusesError) {
    return <ErrorMessage />;
  }

  return (
    <div
      className={
        allBuses.length
          ? `grid grid-rows-2 gap-3 grid-cols-1 lg:grid-cols-4`
          : ""
      }
    >
      {allBuses.length ? (
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
