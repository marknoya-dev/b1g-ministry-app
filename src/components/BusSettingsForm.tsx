"use client";
export const dynamic = "force-dynamic";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getBusData, updateBusCapacity } from "@/lib/api";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Bus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dispatch } from "react";

export default function BusSettingsForm({
  busName,
  maxCapacity,
  currCapacity,
  modalControl,
}: {
  busName: string;
  maxCapacity: string;
  currCapacity: string;
  modalControl: Dispatch<SetStateAction<boolean>>;
}) {
  const [busData, setBusData] = useState({} as Bus);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const result = await getBusData(busName);
        const data = await result;
        setBusData(data.bus);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBusData();
  }, [busName]);

  const formSchema = z.object({
    maxCapacity: z.string().optional(),
  });

  const SettingsForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxCapacity: maxCapacity.toString(),
    },
  });

  async function onSubmitHandler(data: z.infer<typeof formSchema>) {
    console.log(data.maxCapacity, busData.currCapacity);
    if (data.maxCapacity) {
      if (parseInt(data.maxCapacity) >= busData.currCapacity) {
        updateBusCapacity(busName, data.maxCapacity);
        modalControl(false);
        toast({
          title: "Bus capacity updated",
          description: "Capacity has been updated successfully",
          duration: 2000,
        });

        router.refresh();
      } else {
        SettingsForm.setError("maxCapacity", {
          message:
            "Max capacity must be greater than current capacity and must not be negative",
        });
      }
    } else {
      console.log("No data");
    }
  }

  return (
    <Form {...SettingsForm}>
      <form
        onSubmit={SettingsForm.handleSubmit(onSubmitHandler)}
        className="w-full"
        id="form-id"
      >
        <div>
          <FormField
            control={SettingsForm.control}
            name="maxCapacity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Change max capacity</FormLabel>
                <FormControl>
                  <Input id="maxCapacity" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Save
        </Button>
      </form>
    </Form>
  );
}
