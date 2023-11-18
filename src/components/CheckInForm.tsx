"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMaskito } from "@maskito/react";
import type { MaskitoOptions } from "@maskito/core";
import { Button } from "@/components/ui/button";

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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Participant } from "@/lib/types";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const ticketCodeForm = z.object({
  ticketCode: z
    .string()
    .min(11, { message: "Enter a valid ticket code" })
    .max(11),
});

const tempFormSchema = z.object({
  tempInCelsius: z.string().max(2, { message: "Enter a valid temprature" }),
});

const ticketCodeMask: MaskitoOptions = {
  mask: [
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
  mask: [/\d/, /\d/],
};

async function getParticipantData(ticketCode: string): Promise<Participant> {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/api/participants/${ticketCode}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data + ${res.status}`);
  }

  const data: Participant = await res.json();
  return data;
}

export function CheckInForm(onSubmit: any) {
  const router = useRouter();
  const [openModal_notFound, setOpenModal_notFound] = useState(false);
  const [openModal_found, setOpenModal_found] = useState(false);
  const [participantData, setParticipantData] = useState({} as Participant);
  const mask_TicketCode = useMaskito({ options: ticketCodeMask });
  const mask_Temperature = useMaskito({ options: temperatureMask });
  const checkTicketForm = useForm<z.infer<typeof ticketCodeForm>>({
    resolver: zodResolver(ticketCodeForm),
    defaultValues: {
      ticketCode: "",
    },
  });

  const temperatureCheckForm = useForm<z.infer<typeof tempFormSchema>>({
    resolver: zodResolver(tempFormSchema),
    defaultValues: {
      tempInCelsius: "36",
    },
  });

  async function checkTicketHandler(
    values: z.infer<typeof ticketCodeForm>
  ): Promise<void> {
    const data = await getParticipantData(values.ticketCode);

    const participant = (data as { participant?: Participant })?.participant;

    if (!participant) {
      setOpenModal_notFound((openModal_notFound) => true);
    } else {
      setParticipantData(participant);
      setOpenModal_found((openModal_found) => true);
    }
  }

  async function checkInHandler(
    value: z.infer<typeof tempFormSchema>
  ): Promise<void> {
    console.log(value);
    //update temperature
    //assign to bus
    //redirect to checked-in
  }

  return (
    <div>
      <Form {...checkTicketForm}>
        <form
          onSubmit={checkTicketForm.handleSubmit(checkTicketHandler)}
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
                    maxLength={11}
                    ref={mask_TicketCode}
                    onInput={(evt) => {
                      checkTicketForm.setValue(
                        "ticketCode",
                        evt.currentTarget.value.toUpperCase()
                      );
                    }}
                    placeholder="ex. KS931-00025"
                  />
                </FormControl>
                <FormDescription>
                  Input the last 10 characters found on your ticket
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
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

      <Dialog open={openModal_found} onOpenChange={setOpenModal_found}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Hi, ${participantData?.nickname}!`}</DialogTitle>
            <DialogDescription>
              {`Are you ready to commit? Before we give your bus assignment we need to make sure everyone's safe and sound for the retreat`}
            </DialogDescription>
            <Form {...temperatureCheckForm}>
              <form
                onSubmit={temperatureCheckForm.handleSubmit(checkInHandler)}
                className="space-y-8"
              >
                <FormField
                  control={temperatureCheckForm.control}
                  name="tempInCelsius"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{`Temparature (°C)`}</FormLabel>
                      <FormControl>
                        <Input
                          className="text-2xl border-0 border-b-2 p-0 px-1 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                          maxLength={2}
                          ref={mask_Temperature}
                          onInput={(evt) => {
                            temperatureCheckForm.setValue(
                              "tempInCelsius",
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
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
