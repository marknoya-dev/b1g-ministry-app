"use client";
export const dynamic = "force-dynamic";
import DataTable from "./DataTable";
import { columns } from "@/lib/columns";
import { Person } from "@/lib/types";
import LoadingOverlay from "@/components/LoadingOverlay";
import { XCircle } from "lucide-react";
import useSWR from "swr";
import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
// {
//   allParticipants,
// }: {
//   allParticipants: Person[];
// }
export default function ParticipantsTable() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allParticipants,
    error: ParticipantsError,
    isLoading: isLoadingParticipants,
  } = useSWR(`${API_URL}/api/participants/all`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshInterval: 5000,
  });

  const style = {
    width: 90,
  };

  if (isLoadingParticipants) {
    return (
      <div className="flex justify-center items-center ">
        <Lottie animationData={LoadingDots} loop={true} style={style} />
      </div>
    );
  }

  if (ParticipantsError) {
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

  return <DataTable columns={columns} data={allParticipants} />;
}
