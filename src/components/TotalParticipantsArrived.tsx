"use client";
export const dynamic = "force-dynamic";
import CapacityCard from "./CapacityCard";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import fetcher from "@/lib/fetcher";
import { XCircle } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
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
import { ReactElement, useState } from "react";
export default function BusesCardGroup() {
  const [content, setContent] = useState<ReactElement>();
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

  const style = {
    width: 90,
  };

  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader className="gap-4px">
          <CardTitle className="text-lg">
            Total Participants arrived at MMRC
          </CardTitle>
          <CardDescription className="mt-0">
            Live tracking of participants arrival
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
            <Lottie animationData={LoadingDots} loop={true} style={style} />
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
            Live tracking of participants arrival
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorMessage />
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
            <div className="flex gap-2 relative h-3 w-full items-center">
              Total Participants arrived at MMRC
              {percentage !== 100 ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              ) : null}
            </div>
          </CardTitle>
          <CardDescription className="mt-2">
            <div>Live tracking of participants arrival</div>
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
              <span>{data.totalParticipants}</span>participants has arrived{" "}
              <span className="font-bold">({Math.round(percentage)}%)</span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="gap-4px">
        <CardTitle className="text-lg">
          Total Participants arrived at MMRC
        </CardTitle>
        <CardDescription className="mt-0">
          Live tracking of participants arrival
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}