export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ParticipantsTable from "@/components/ParticipantsTable";
import BusesCardGroup from "@/components/BusesCardGroup";
import { EmbarkationMetadata } from "@/lib/head";
import LoadingOverlay from "@/components/LoadingOverlay";
import { XCircle } from "lucide-react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const metadata = EmbarkationMetadata;
export default function Home() {
  // if (!API_URL) {
  //   return null;
  // }

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const {
  //   data: allParticipants,
  //   error: ParticipantsError,
  //   isLoading: isLoadingParticipants,
  // } = useSWR(`${API_URL}/api/participants/all`, fetcher, {
  //   revalidateOnMount: true,
  //   revalidateIfStale: true,
  //   revalidateOnReconnect: true,
  //   refreshWhenHidden: true,
  //   refreshInterval: 5000,
  // });

  // const {
  //   data: allBuses,
  //   error: BusesError,
  //   isLoading: isLoadingBuses,
  // } = useSWR(`${API_URL}/api/bus/all`, fetcher, {
  //   revalidateOnMount: true,
  //   revalidateIfStale: true,
  //   revalidateOnReconnect: true,
  //   refreshWhenHidden: true,
  //   refreshInterval: 5000,
  // });

  // if (isLoadingParticipants || isLoadingBuses) {
  //   return <LoadingOverlay />;
  // }

  // if (ParticipantsError || BusesError) {
  //   return (
  //     <div className="w-full h-80 flex flex-col justify-center items-center align-middle gap-2 ">
  //       <div className="text-red-600">
  //         <XCircle size={60} />
  //       </div>
  //       <div className="flex flex-col items-center justify-center">
  //         <div className="font-bold text-[30px]">Failed to load data</div>
  //         <div className="font-normal text-[16px]">
  //           Try refreshing the page, if error persists contact admin
  //         </div>
  //       </div>
  //     </div>
  //   );
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
