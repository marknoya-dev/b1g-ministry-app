import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckInForm } from "@/components/CheckInForm";

export default function Page() {
  return (
    <main>
      <h1 className="text-[24px] font-bold mb-[16px] text-gray-700">
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
