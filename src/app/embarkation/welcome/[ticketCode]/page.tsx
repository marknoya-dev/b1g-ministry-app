export const dynamic = "force-dynamic";
export const revalidate = true;
import React from "react";
import LottieAnimation from "@/components/LottieAnimation";

import { getParticipantData } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { ticketCode: string };
}) {
  const { ticketCode } = params;
  const participantData = await getParticipantData(ticketCode);
  const { participant } = participantData;

  const backToCheckInHandler = () => {
    redirect("/embarkation/check-in");
  };

  if (participant.embarkation_status !== "CheckedIn") {
    redirect("/embarkation/check-in");
  } else {
    return (
      <main className="text-center px-40">
        <div className="fixed w-full h-screen top-0 left-0 pointer-events-none">
          <LottieAnimation />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-gray-800">
            Welcome to B1G Commit, {participant.nickname}!
          </h1>
          <div className="text-[16px] font-normal mt-[2px] text-gray-600">
            {`Here's everything you need to know about your stay at the retreat`}
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle items-center gap-4 mt-8">
          {participant.rideToVenue !== "Carpool" ? (
            <WelcomeCard
              title="Bus Details"
              value={participant.rideToVenue_name}
            />
          ) : null}

          <WelcomeCard title="Team Name" value={participant.teamName} />
          <Card className="shadow-md text-center w-[600px] border-t-4 border-t-red-800">
            <CardHeader className="">
              <CardTitle className="text-[20px] font-semibold text-gray-700 mb-[4px]">
                Room Details
              </CardTitle>
              <CardContent>
                <div>
                  <p className="font-bold">[Room Number]</p>
                </div>
                <hr className="my-4" />
                <div>
                  <p className="font-bold">{`You're in this room with:`}</p>
                  <div className="flex flex-col gap-2 mt-2">
                    <p>[Participant Name]</p>
                    <p>[Participant Name]</p>
                    <p>[Participant Name]</p>
                    <p>[Participant Name]</p>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>

          <Card className="shadow-md text-center w-[600px]  border-t-4 border-t-red-800">
            <CardHeader className="">
              <CardTitle className="text-[20px] font-semibold text-gray-700 mb-[4px] ">
                Retreat Workshops
              </CardTitle>
              <CardContent>
                <div>
                  <p className="font-normal text-gray-700">
                    You will be attending the following workshops
                  </p>
                </div>
                <hr className="my-6" />
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-medium text-gray-800">
                      Day 1 - [Date Time]
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-xl">
                        {participant.workshop1}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Day 2 - [Date Time]
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-xl">
                        {participant.workshop2}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
          <Button className="w-[600px]" asChild>
            <Link href={`/embarkation/check-in`}>Back to Check-In</Link>
          </Button>
        </div>
      </main>
    );
  }
}

interface WelcomeCardProps {
  title: string;
  value: string;
}

function WelcomeCard({ title, value }: WelcomeCardProps): React.ReactNode {
  return (
    <Card className="shadow-md text-center w-[600px] border-t-4 border-t-red-800">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
        <CardContent>
          <p className="font-bold text-xl text-gray-700">{value}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

{
  /* <CardContent>
<div>
  <span>{`You'll be riding`}</span>
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
</CardContent> */
}
