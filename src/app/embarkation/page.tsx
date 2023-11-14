import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CapacityCard from "@/components/CapacityCard";
import DataTable from "@/components/DataTable";
import { Participant, columns } from "@/lib/columns";

async function getData(): Promise<Participant[]> {
  // Fetch data from your API here.
  return [
    {
      ticketNum: "1A23BC",
      name: "John Doe",
      mobileNum: "0912 345 6789",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "4D56EF",
      name: "Jane Doe",
      mobileNum: "0987 654 3210",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Honda Accord",
    },
    {
      ticketNum: "7G89HI",
      name: "Samuel Johnson",
      mobileNum: "0932 187 5943",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "2J34KL",
      name: "Eva Thompson",
      mobileNum: "0965 432 1098",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Ford Explorer",
    },
    {
      ticketNum: "5M67NO",
      name: "Michael Brown",
      mobileNum: "0941 876 5432",
      temp: "",
      boarding: "Bus",
      status: "In Transit",
      vehicle: "",
    },
    {
      ticketNum: "8P90QR",
      name: "Sophia Davis",
      mobileNum: "0978 210 3546",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Chevrolet Malibu",
    },
    {
      ticketNum: "3S12TU",
      name: "William Miller",
      mobileNum: "0999 888 7777",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "6V45WX",
      name: "Olivia Wilson",
      mobileNum: "0923 456 7890",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Nissan Altima",
    },
    {
      ticketNum: "9Y67ZD",
      name: "Daniel Lee",
      mobileNum: "0956 789 0123",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "0AA1BB",
      name: "Ava Martinez",
      mobileNum: "0901 234 5678",
      temp: "",
      boarding: "Car",
      status: "In Transit",
      vehicle: "Toyota Corolla",
    },
    {
      ticketNum: "1A23BC",
      name: "John Doe",
      mobileNum: "0912 345 6789",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "4D56EF",
      name: "Jane Doe",
      mobileNum: "0987 654 3210",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Honda Accord",
    },
    {
      ticketNum: "7G89HI",
      name: "Samuel Johnson",
      mobileNum: "0932 187 5943",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "2J34KL",
      name: "Eva Thompson",
      mobileNum: "0965 432 1098",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Ford Explorer",
    },
    {
      ticketNum: "5M67NO",
      name: "Michael Brown",
      mobileNum: "0941 876 5432",
      temp: "",
      boarding: "Bus",
      status: "In Transit",
      vehicle: "",
    },
    {
      ticketNum: "8P90QR",
      name: "Sophia Davis",
      mobileNum: "0978 210 3546",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Chevrolet Malibu",
    },
    {
      ticketNum: "3S12TU",
      name: "William Miller",
      mobileNum: "0999 888 7777",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "9Y67ZD",
      name: "Daniel Lee",
      mobileNum: "0956 789 0123",
      temp: "",
      boarding: "Bus",
      status: "Awaiting",
      vehicle: "",
    },
    {
      ticketNum: "6V45WX",
      name: "Olivia Wilson",
      mobileNum: "0923 456 7890",
      temp: "",
      boarding: "Car",
      status: "Checked In",
      vehicle: "Nissan Altima",
    },

    {
      ticketNum: "0AA1BB",
      name: "Ava Martinez",
      mobileNum: "0901 234 5678",
      temp: "",
      boarding: "Car",
      status: "In Transit",
      vehicle: "Toyota Corolla",
    },
  ];
}

export default async function Home() {
  const data = await getData();

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
              <CapacityCard label="Bus 1" value={40} max={40} />
              <CapacityCard label="Bus 2" max={40} value={0} />
              <CapacityCard label="Bus 3" max={40} value={0} />
              <CapacityCard label="Bus 4" max={40} value={0} />
              <CapacityCard label="Bus 5" max={40} value={0} />
              <CapacityCard label="Bus 6" max={40} value={0} />
              <CapacityCard label="Bus 7" max={40} value={0} />
              <CapacityCard label="Bus 8" max={40} value={0} />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
