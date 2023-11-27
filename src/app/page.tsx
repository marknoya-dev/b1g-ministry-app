import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "We're still working on stuff here",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-2xl">
          Welcome to the B1G Ministry Retreat App
        </h1>
        <p className="text-gray-600">
          {`We're still working on things here, for now here's what you can do`}
        </p>
      </div>
      {/* <Link href="/embarkation" prefetch>
        <Button>Go to Embarkation</Button>
      </Link> */}
      <Link href="/check-in">
        <Button>Go to Participants Check-in</Button>
      </Link>
    </main>
  );
}
