import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CapacityCard from "@/components/CapacityCard";
import DataTable from "@/components/DataTable";
import { columns } from "@/lib/columns";
import { Participant, Bus } from "@/lib/types";

async function getParticipantsData(): Promise<Participant[]> {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/api/participants`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getBusData(): Promise<Bus[]> {
  // Fetch data from your API here.
  return [
    {
      busName: "Bus 1",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 2",
      maxCapacity: 40,
      currCapacity: 4,
    },
    {
      busName: "Bus 3",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 4",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 5",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 6",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 7",
      maxCapacity: 40,
      currCapacity: 0,
    },
    {
      busName: "Bus 8",
      maxCapacity: 40,
      currCapacity: 0,
    },
  ];
}

export default async function Home() {
  const [buses, participants] = await Promise.all([
    getBusData(),
    getParticipantsData(),
  ]);

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
            <div className="grid grid-cols-4 grid-rows-2 gap-3">
              {buses.map((bus) => (
                <CapacityCard
                  label={bus.busName}
                  key={bus.busName}
                  value={bus.currCapacity}
                  max={bus.maxCapacity}
                />
              ))}
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
