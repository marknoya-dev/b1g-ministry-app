import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CapactiyCard = ({ label, value, max }) => {
  return (
    <Card className="flex flex-col gap-1 p-3">
      <div className="flex gap-1 items-end">
        <span
          className={`font-semibold text-md ${
            value === max ? "text-green-700" : "text-gray-700"
          }`}
        >
          {label}
        </span>
        <div className="flex flex-row gap-[2px] text-xs font-medium text-gray-700 mb-[3px]">
          <span>({value}</span>
          <span>/</span>
          <span>{max})</span>
        </div>
      </div>
      <Progress value={value} max={max} className="w-full" />
    </Card>
  );
};

export default CapactiyCard;