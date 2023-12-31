"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MaskitoOptions } from "@maskito/core";
import { Button } from "@/components/ui/button";
import { getParticipantData, checkInParticipant } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { useMaskito } from "@maskito/react";
import { useRouter } from "next/navigation";
import { Person } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ticketCodeForm = z.object({
  ticketCode: z
    .string()
    .min(21, { message: "Enter a valid ticket code" })
    .max(21),
});

const checkinFormSchema = z.object({
  embarkation_temp: z
    .string()
    .min(2, { message: "Enter a valid temperature" })
    .max(5),
});

const ticketCodeMask: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    "-",
    /[A-Za-z]/,
    /[A-Za-z]/,
    "-",
    /[A-Za-z]/,
    /\d/,
    /\d/,
    "-",
    /[A-Za-z0-9]/,
    /[A-Za-z0-9]/,
    /[A-Za-z0-9]/,
    /[A-Za-z0-9]/,
    /[A-Za-z0-9]/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

const temperatureMask: MaskitoOptions = {
  mask: [/\d/, /\d/, ".", /\d/, /\d/],
};

export function CheckInForm(onSubmit: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal_notFound, setOpenModal_notFound] = useState(false);
  const [openModal_checkIn, setOpenModal_checkIn] = useState(false);
  const [participantData, setParticipantData] = useState({} as Person);
  const mask_TicketCode = useMaskito({ options: ticketCodeMask });
  const mask_Temperature = useMaskito({ options: temperatureMask });
  const checkTicketForm = useForm<z.infer<typeof ticketCodeForm>>({
    resolver: zodResolver(ticketCodeForm),
    defaultValues: {
      ticketCode: "",
    },
  });

  const checkInCheckForm = useForm<z.infer<typeof checkinFormSchema>>({
    resolver: zodResolver(checkinFormSchema),
  });

  async function reviewParticipantDataHandler(
    values: z.infer<typeof ticketCodeForm>
  ): Promise<void> {
    setIsLoading((isLoading) => !isLoading);

    const data = await getParticipantData(values.ticketCode);
    const participant = (data as { participant?: Person })?.participant;
    //if participant is not found, open modal
    if (!participant) {
      setOpenModal_notFound((openModal_notFound) => !openModal_notFound);
    } else {
      //if participant is found, set participant data
      setParticipantData(participant);

      //if participant si not checked in, open modal
      if (participant?.embarkation_status !== "CHECKED_IN" || null) {
        setOpenModal_checkIn((openModal_checkIn) => !openModal_checkIn);
      } else {
        //If participant is already checkedin, redirect to welcome page
        const url = `/welcome/${participant.ticketCode}`;
        router.push(url);
      }
    }

    setIsLoading((isLoading) => !isLoading);
  }

  async function onCheckInHandler(
    value: z.infer<typeof checkinFormSchema>
  ): Promise<void> {
    setIsLoading((isLoading) => !isLoading);

    const { embarkation_temp } = value;
    const checkInData = {
      ticketCode: participantData.ticketCode,
      embarkation_temp: embarkation_temp,
      rideToVenue: participantData.rideToVenue,
    };
    const data = await checkInParticipant(checkInData);

    if (data) {
      const url = `/welcome/${participantData.ticketCode}`;
      router.push(url);
    }
  }

  return (
    <div>
      <Form {...checkTicketForm}>
        <form
          onSubmit={checkTicketForm.handleSubmit(reviewParticipantDataHandler)}
          className="space-y-8"
        >
          <FormField
            control={checkTicketForm.control}
            name="ticketCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Code</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase text-4xl p-2 h-14 text-gray-900"
                    maxLength={21}
                    ref={mask_TicketCode}
                    onInput={(evt) => {
                      checkTicketForm.setValue(
                        "ticketCode",
                        evt.currentTarget.value.toUpperCase()
                      );
                    }}
                    placeholder="ex. 23-EF-T14-KS931-00025"
                  />
                </FormControl>
                <FormDescription>
                  Input the ticket code sent to your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`w-full ${isLoading ? "cursor-wait" : "cursor-pointer"}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <Dialog open={openModal_notFound} onOpenChange={setOpenModal_notFound}>
        <DialogContent className="border-b border-red-900 bg-red-50">
          <DialogHeader>
            <DialogTitle className="text-red-800 mb-2">{`Uh,oh. We couldn't find your file`}</DialogTitle>
            <DialogDescription className=" text-gray-900">
              It seems that you are not in the database, please reach out to our
              volunteers onsite or double check if you entered the right ticket
              code
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal_checkIn} onOpenChange={setOpenModal_checkIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2s">{`Hi, ${participantData?.nickname}!`}</DialogTitle>
            <DialogDescription>
              {`Are you ready to commit? Before proceeding, we need to make sure everyone's safe and sound for the retreat`}
            </DialogDescription>
            <Form {...checkInCheckForm}>
              <form
                onSubmit={checkInCheckForm.handleSubmit(onCheckInHandler)}
                className="space-y-8"
              >
                <FormField
                  control={checkInCheckForm.control}
                  name="embarkation_temp"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{`Temperature (°C)`}</FormLabel>
                      <FormControl>
                        <Input
                          className="text-2xl border-0 border-b-2 p-0 px-1 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                          maxLength={5}
                          ref={mask_Temperature}
                          onInput={(evt) => {
                            checkInCheckForm.setValue(
                              "embarkation_temp",
                              evt.currentTarget.value
                            );
                          }}
                          placeholder="Enter your temperature in Celsius"
                        />
                      </FormControl>
                      <FormDescription>
                        Have your temperature checked by one of the volunteers
                        around the embarkation area
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={`w-full ${
                    isLoading ? "cursor-wait" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
