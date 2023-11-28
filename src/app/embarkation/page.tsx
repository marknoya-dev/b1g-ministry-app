"use client";
import {
  getParticipantsData,
  getAllBusData,
  revalidateEmbarkation,
} from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ParticipantsTable from "@/components/ParticipantsTable";
import BusesCardGroup from "@/components/BusesCardGroup";
import { Metadata } from "next";
import { Person } from "@/lib/types";
import useSWR from "swr";

// export const metadata: Metadata = {
//   title: "Embarkation",
//   description: "View the embarkation status of all participants",
// };

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function Home() {
  // if (!API_URL) {
  //   return null;
  // }

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const {
  //   data: allParticipants,
  //   error: ParticipantsError,
  //   isLoading: isLoadingParticipants,
  // } = useSWR(`${API_URL}/api/participants/all`, fetcher);

  // const {
  //   data: allBuses,
  //   error: BusesError,
  //   isLoading: isLoadingBuses,
  // } = useSWR(`${API_URL}/api/bus/all`, fetcher);

  // if (isLoadingParticipants || isLoadingBuses) {
  //   return <div>Loading...</div>;
  // }

  // if (ParticipantsError || BusesError) {
  //   return <div>Failed to load data</div>;
  // }

  return (
    <main>
      <h1 className="text-[24px] font-bold mb-[16px] text-gray-700">
        Embarkation
      </h1>

      <div className="flex flex-col gap-4">
        <Card className="shadow-md">
          <CardHeader className="gap-4px">
            <CardTitle className="text-lg">Bus Capacity</CardTitle>
            <CardDescription className="mt-0">
              Watch which buses are currently getting filled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusesCardGroup />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <ParticipantsTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// await revalidateEmbarkation();

// const resParticipants = await fetch(`${API_URL}/api/participants/all`, {
//   method: "GET",
//   cache: "no-store",
//   next: {
//     tags: ["participants-data", "embarkation-data"],
//   },
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const allParticipants: any = await resParticipants.json();

// const resBus = await fetch(`${API_URL}/api/bus/all`, {
//   method: "GET",
//   cache: "no-store",
//   next: {
//     tags: ["bus-data", "embarkation-data"],
//   },
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const allBuses = await resBus.json();

// const allBuses = await getAllBusData();
// const allParticipants = await getParticipantsData();
