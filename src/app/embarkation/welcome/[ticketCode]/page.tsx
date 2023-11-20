export const dynamic = "force-dynamic";
export const revalidate = true;

import { getParticipantData } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { ticketCode: string };
}) {
  const { ticketCode } = params;
  const participantData = await getParticipantData(ticketCode);
  const { participant } = participantData;

  if (participant.embarkation_status !== "CheckedIn") {
    redirect("/embarkation/check-in");
  } else {
    return (
      <main>
        <Card className="shadow-md text-center">
          <CardHeader className="">
            <CardTitle className="text-[24px] font-bold mb-[4px] text-gray-800">
              Welcome to B1G Commit, {participant.nickname}!
            </CardTitle>
            <CardDescription className="mt-0">
              {`Here's everything you need to know about your stay at B1G Commit`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <span>{`You'll be riding`}</span>
              <p>{participant.rideToVenue_Id}</p>
            </div>
            <div>
              <span>Workshop 1</span>
              <p>{participant.workshop1}</p>
            </div>
            <div>
              <span>Workshop 2</span>
              <p>{participant.workshop2}</p>
            </div>
            <div>
              <span>Team Name</span>
              <p>{participant.teamName}</p>
            </div>
            room number and mates, bus number,
          </CardContent>
        </Card>
      </main>
    );
  }
}
