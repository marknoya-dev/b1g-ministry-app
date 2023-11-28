"use client";
export const dynamic = "force-dynamic";
import CapacityCard from "./CapacityCard";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import fetcher from "@/lib/fetcher";
import LoadingOverlay from "@/components/LoadingOverlay";
import { XCircle } from "lucide-react";
import { Bus } from "@/lib/types";

import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";
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

  console.log("isValidatingParticipants", isValidating);
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
    return (
      <div className="w-full h-80 flex flex-col justify-center items-center align-middle gap-2 ">
        <div className="text-red-600">
          <XCircle size={40} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px]">Failed to load data</div>
          <div className="font-normal text-[16px]">
            Try refreshing the page, if error persists contact admin
          </div>
        </div>
      </div>
    );
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
