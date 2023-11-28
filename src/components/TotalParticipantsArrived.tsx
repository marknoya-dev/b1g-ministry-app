"use client";
export const dynamic = "force-dynamic";
import CapacityCard from "./CapacityCard";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import fetcher from "@/lib/fetcher";
import { XCircle } from "lucide-react";
import { Bus } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";
import { Progress } from "@/components/ui/progress";
export default function BusesCardGroup() {
  const { data, error, isLoading, isValidating } = useSWR(
    `${API_URL}/api/embarkation`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: true,
      refreshInterval: 5000,
    }
  );

  console.log(data);

  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader className="gap-4px">
          <CardTitle className="text-lg">
            Total Participants arrived at MMRC
          </CardTitle>
          <CardDescription className="mt-0">
            Live tracking of participants arrived at MMRC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full">
            <Progress
              value={0}
              className={`w-full 
        }`}
            />
            <p className="flex gap-1 mt-2 text-gray-600 text-[14px]">
              <span>Loading...</span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-md">
        <CardHeader className="gap-4px">
          <CardTitle className="text-lg">
            Total Participants arrived at MMRC
          </CardTitle>
          <CardDescription className="mt-0">
            Live tracking of participants arrived at MMRC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80 flex flex-col justify-center items-center align-middle gap-2 ">
            <div className="text-red-600">
              <XCircle size={40} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="font-bold text-[18px]">Failed to load data</div>
              <div className="font-normal text-[16px]">
                Try refreshing the page, if error persists contact admin
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data) {
    const percentage =
      (data.arrivedParticipants / data.totalParticipants) * 100;
    return (
      <Card
        className={`shadow-md ${percentage == 100 ? "border-green-700" : null}`}
      >
        <CardHeader className="gap-4px">
          <CardTitle
            className={`text-lg ${percentage == 100 ? "text-green-700" : null}`}
          >
            Total Participants arrived at MMRC
          </CardTitle>
          <CardDescription className="mt-0">
            Live tracking of participants arrived at MMRC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full">
            <Progress
              value={percentage}
              className={`w-full ${percentage == 100 ? "bg-green-700" : null}
        }`}
            />
            <p className="flex gap-1 mt-2 text-gray-600 text-[14px]">
              <span>{data.arrivedParticipants}</span>of
              <span>{data.totalParticipants}</span>participants has arrived
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
