export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getParticipantsData, getAllBusData, API_URL } from "@/lib/api";
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
import { Bus, Person } from "@/lib/types";
import { clearCacheByPath, clearCacheByTag } from "@/lib/actions";

export default async function Home() {
  if (!API_URL) {
    return null;
  }

  const participants = await getParticipantsData();
  const buses = await getAllBusData();

  console.log("BUSES", buses);

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
            <div className="grid grid-rows-2 gap-3 grid-cols-1 md:grid-cols-4">
              {buses ? (
                buses
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .sort((a, b) => a.name.localeCompare(b.name)) // Sort by bus name
                  .map((bus) => (
                    <CapacityCard
                      label={bus.name}
                      key={bus.name}
                      value={bus.currCapacity}
                      max={bus.maxCapacity}
                    />
                  ))
              ) : (
                <div>No buses detected.</div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={participants} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
