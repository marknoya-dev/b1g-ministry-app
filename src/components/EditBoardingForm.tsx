import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getAllAvailableBus, updateParticipantVehicle } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { Bus } from "@/lib/types";
import { Person } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  boarding: z.string().optional(),
  bus: z.string().optional(),
});

async function populateAvailableBus(): Promise<any> {
  const availableBuses = await getAllAvailableBus();
  return availableBuses;
}

export default function EditBoardingForm({
  rowData,
  rideToVenue,
  rideToVenue_name,
  embarkation_status,
  showModalControl,
}: {
  rowData: Person;
  rideToVenue: string;
  rideToVenue_name: string | undefined;
  embarkation_status?: string;
  showModalControl: any;
}) {
  const editBoardingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [availableBus, setAvailableBus] = useState<Bus[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const result = await populateAvailableBus();
        setAvailableBus(result);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBusData();
  }, []);

  function onSubmitHandler(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (data.boarding) {
      console.log("Replace boarding", data?.boarding);
      // updateParticipantVehicle({
      //   ticketCode: rowData.ticketCode,
      //   rideToVenue: rideToVenue,
      //   rideToVenue_name: rideToVenue_name ? rideToVenue_name : "",
      //   newVehicle: data.bus,
      // });
    } else if (data.bus) {
      console.log("replace vehicle", data?.bus);
      updateParticipantVehicle({
        updateType: "BUS_CHANGE",
        ticketCode: rowData.ticketCode,
        rideToVenue: rideToVenue,
        rideToVenue_name: rideToVenue_name ? rideToVenue_name : "",
        newVehicle: data.bus,
      });
    } else {
      console.log("No changes");
    }

    showModalControl(false);
    toast({
      title: "Boarding information updated",
      description: "Boarding information has been updated successfully",
      duration: 2000,
    });
    router.refresh();
  }

  return (
    <Form {...editBoardingForm}>
      <form
        onSubmit={editBoardingForm.handleSubmit(onSubmitHandler)}
        className="w-full"
        id="form-id"
      >
        {embarkation_status !== "CHECKED_IN" && !rideToVenue_name ? (
          <FormField
            control={editBoardingForm.control}
            name="boarding"
            defaultValue={rideToVenue}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Change boarding</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transportation for participant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bus from CCF Center">
                      Bus from CCF Center
                    </SelectItem>
                    <SelectItem value="Carpool">Carpool</SelectItem>
                    <SelectItem value="Commute">Commute</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        {rideToVenue !== "Carpool" && rideToVenue_name ? (
          <div>
            <div className="flex flex-row gap-1 font-semibold">
              Currently assigned to <span>{rideToVenue_name}</span>
            </div>
            <FormField
              control={editBoardingForm.control}
              name="bus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Change Bus to</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select another bus for participant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableBus
                        .slice() // Create a shallow copy to avoid mutating the original array
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by bus name
                        .map((bus) => {
                          if (bus.name === rideToVenue_name) {
                            return null;
                          } else {
                            return (
                              <SelectItem key={bus.id} value={bus.name}>
                                {bus.name}
                              </SelectItem>
                            );
                          }
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : null}

        <Button type="submit" className="w-full mt-4">
          Save
        </Button>
      </form>
    </Form>
  );
}
