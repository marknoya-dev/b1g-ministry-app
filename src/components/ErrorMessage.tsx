import { XCircle } from "lucide-react";

export default function ErrorMessage() {
  return (
    <div className="w-full h-80 flex flex-col justify-center items-center align-middle gap-2 ">
      <div className="text-red-600">
        <XCircle size={40} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-[18px]">Failed to load data</div>
        <div className="font-normal text-[16px]">
          Try refreshing the page, if error persists contact admin
        </div>
      </div>
    </div>
  );
}
