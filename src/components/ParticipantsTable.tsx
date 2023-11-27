"use client";
export const dynamic = "force-dynamic";
import DataTable from "./DataTable";
import { columns } from "@/lib/columns";
import { Person } from "@/lib/types";

export default function ParticipantsTable({
  allParticipants,
}: {
  allParticipants: Person[];
}) {
  return <DataTable columns={columns} data={allParticipants} />;
}
