"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import DataTable from "./DataTable";
import { columns } from "@/lib/columns";
import { Person } from "@/lib/types";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function ParticipantsTable({
  allParticipants,
}: {
  allParticipants?: Person[];
}) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allData,
    error: ParticipantsError,
    isLoading: isLoadingParticipants,
  } = useSWR(`${API_URL}/api/participants/all`, fetcher);

  if (isLoadingParticipants) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={columns} data={allData} />;
}
