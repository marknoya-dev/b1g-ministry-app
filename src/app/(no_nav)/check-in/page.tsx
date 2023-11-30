import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckInForm } from "@/components/CheckInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check In",
  description: "Enter your details to check in",
};
export default function Page() {
  return (
    <main className="max-w-[900px] mx-auto">
      <h1 className="text-[24px] font-bold mb-[16px] text-white w-full text-center">
        Embarkation Check In
      </h1>
      <Card className="shadow-md">
        <CardHeader className="gap-4px">
          <CardTitle className="text-lg">Enter your information</CardTitle>
          <CardDescription className="mt-0">
            We need your details to check you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CheckInForm />
        </CardContent>
      </Card>
    </main>
  );
}
