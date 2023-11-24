// export const dynamic = "force-dynamic";

import { API_URL } from "@/lib/api";
import { getParticipantsData, getAllBusData } from "@/lib/actions";
import CapacityCard from "@/components/CapacityCard";
import DataTable from "@/components/DataTable";
import { columns } from "@/lib/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { clearCacheByTag } from "@/lib/actions";
import ParticipantsTable from "@/components/ParticipantsTable";
import BusesCardGroup from "@/components/BusesCardGroup";

export default async function Home() {
  if (!API_URL) {
    return null;
  }

  clearCacheByTag("embarkation-data");
  const allBuses = await getAllBusData();
  const allParticipants = await getParticipantsData();

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
            <BusesCardGroup buses={allBuses} />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <ParticipantsTable allParticipants={allParticipants} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
