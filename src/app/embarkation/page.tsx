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
import { getParticipantsData, getBusData, API_URL } from "@/lib/api";

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
            {/* <DataTable
              columns={columns}
              data={participants ? participants : null}
            /> */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
