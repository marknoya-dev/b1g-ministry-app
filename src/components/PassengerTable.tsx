import ModalDataTable from "./ModalDataTable";
import { passengercolumn } from "@/lib/passengercolumns";
import { getBusPassengers } from "@/lib/api";
import { useEffect, useState } from "react";
export default function PassengerTable({ busName }: { busName: string }) {
  const [allPassengers, setAllPassengers] = useState([]);

  useEffect(() => {
    async function getPassengers() {
      try {
        const req = await getBusPassengers(busName);
        console.log("Passengers:", req);
        setAllPassengers(await req);
      } catch (error) {
        console.error("Error fetching passengers:", error);
        // Handle error appropriately, e.g., show a message to the user or log it
      }
    }
    getPassengers();
  }, [busName, allPassengers]);

  return (
    <ModalDataTable
      columns={passengercolumn}
      data={allPassengers ? allPassengers : []}
    />
  );
}
