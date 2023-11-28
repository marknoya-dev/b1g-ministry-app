export const dynamic = "force-dynamic";
import ModalDataTable from "./ModalDataTable";
import { passengercolumn } from "@/lib/passengercolumns";
import { getBusPassengers } from "@/lib/api";
// import { useEffect, useState } from "react";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
import LoadingDots from "@/components/lottie/loadingdots.json";
import Lottie from "lottie-react";
import ErrorMessage from "./ErrorMessage";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PassengerTable({ busName }: { busName: string }) {
  const {
    data: allPassengers,
    error: ParticipantsError,
    isLoading: isLoadingParticipants,
  } = useSWR(`${API_URL}/api/bus/get-passengers?name=${busName}`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshInterval: 5000,
  });

  if (isLoadingParticipants) {
    return (
      <div className="flex justify-center items-center">
        <Lottie animationData={LoadingDots} loop={true} />
      </div>
    );
  }

  if (ParticipantsError) {
    return <ErrorMessage />;
  }

  return (
    <ModalDataTable
      columns={passengercolumn}
      data={allPassengers ? allPassengers : []}
    />
  );
}

// const [allPassengers, setAllPassengers] = useState([]);

// useEffect(() => {
//   async function getPassengers() {
//     try {
//       const req = await getBusPassengers(busName);
//       console.log("Passengers:", req);
//       setAllPassengers(await req);
//     } catch (error) {
//       console.error("Error fetching passengers:", error);
//     }
//   }
//   getPassengers();
// }, []);
