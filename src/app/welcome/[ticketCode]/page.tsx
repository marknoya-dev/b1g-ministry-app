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

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to B1G Commit!",
  description: "View your details for the retreat",
};

export default async function Page({
  params,
}: {
  params: { ticketCode: string };
}) {
  const { ticketCode } = params;
  const participantData = await getParticipantData(ticketCode);
  const { participant } = participantData;

  if (participant?.embarkation_status !== "CHECKED_IN" || null) {
    redirect("/embarkation/check-in");
  } else {
    return (
      <main className="text-center ">
        <div className="fixed w-full h-screen top-0 left-0 pointer-events-none">
          <LottieAnimation />
        </div>
        <div className="w-full">
          <h1 className="text-[24px] font-bold text-gray-800 w-full">
            Welcome to B1G Commit, {participant.nickname}!
          </h1>
          <div className="text-[16px] font-normal mt-[2px] text-gray-600">
            {`Here's everything you need to know about your stay at the retreat`}
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle items-center gap-4 mt-8">
          {participant.rideToVenue !== "Carpool" ? (
            <WelcomeCard
              title="Bus assignment going to MMRC"
              subheader="Please present this upon boarding the bus"
              value={participant.rideToVenue_name}
            />
          ) : null}

          <WelcomeCard title="Team Name" value={participant.teamName} />
          <WelcomeCard title="Room Assignment" value={participant.room} />

          <Card className="shadow-md text-center max-w-[600px] w-full  border-t-4 border-t-red-800">
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
                    <p className="font-medium text-gray-800">Workshop 1</p>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-xl">
                        {participant.workshop1}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Workshop 2</p>
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
          <WelcomeCard
            title="Morning Devotion Group"
            value={`Group ${participant.devo}`}
          />
          <Button className="max-w-[600px] w-full" asChild>
            <Link href={`/check-in`}>Back to Check-In</Link>
          </Button>
        </div>
      </main>
    );
  }
}

interface WelcomeCardProps {
  title: string;
  subheader?: string;
  value: string;
}

function WelcomeCard({
  title,
  subheader,
  value,
}: WelcomeCardProps): React.ReactNode {
  return (
    <Card className="shadow-md text-center max-w-[600px] w-full border-t-4 border-t-red-800">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
        {subheader ? (
          <CardDescription className="mb-4 font-normal text-gray-700 text-md">
            <div>{subheader}</div>
          </CardDescription>
        ) : null}
        <CardContent>
          <p className="font-bold text-xl text-gray-700">{value}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

//   ALREADY CHECKED IN
//   PARTICIPANTS SWITCHING TO CARPOOL/BUS
//   HEALTH FORM WAIVER FLOW

//LOGISTICS:
//   TOTAL CHECK IN PARTICIPANTS PROGRESS BAR
//   PRINT PARTICIPANTS ON BUS DEPARTURE
//   CONFIRM IF PARTICIPANTS ARE ENROUTE TO MMRC (BUS AND CARPOOL DRIVER CHECK IN)
//   ARRIVED IN MMRC BUS / CARPOOL DRIVER CHECK IN
//   OVERRIDE BUS -> FOR BUS TO LEAVE
//   OVERRIDE BUS CAPACITY

//   ADD VOLUNTEERS IN DATABASE
