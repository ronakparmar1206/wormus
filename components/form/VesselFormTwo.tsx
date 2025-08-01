"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import { SelectBox } from "../common/SelectBox";

const PORT_OF_REGISTRY = [
  "Singapore",
  "Rotterdam",
  "Hong Kong",
  "Mumbai",
  "Hamburg",
  "Dubai",
  "London",
  "Shanghai",
  "New York",
] as const;

const FLAG_STATES = [
  "Panama",
  "Liberia",
  "Marshall Islands",
  "Singapore",
  "Malta",
  "Bahamas",
  "Hong Kong",
  "India",
] as const;

const VESSEL_TYPES = [
  "Bulk Carrier",
  "Container Ship",
  "Tanker",
  "Passenger Ship",
] as const;

const formSchema = z.object({
  callSign: z.string().min(1, { message: "Call sign is required." }),
  flagState: z.string().min(1, { message: "Flag State is required." }),
  yearBuilt: z.string().regex(/^(19|20)\d{2}$/, {
    message: "Year built must be a four-digit year (e.g., 2018).",
  }),
  vesselType: z.string().min(1, { message: "Vessel type is required." }),
  shipBuilder: z.string().min(1, { message: "Ship builder is required." }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration number is required." }),
  portOfRegistry: z
    .string()
    .min(1, { message: "Port of registry is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const VesselFormTwo = ({ handleSelect }: any) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      callSign: "",
      flagState: "Panama",
      yearBuilt: "",
      vesselType: "Container Ship",
      shipBuilder: "",
      registrationNumber: "",
      portOfRegistry: "Singapore",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        callSign: values.callSign,
        flagState: values.flagState,
        yearBuilt: values.yearBuilt,
        vesselType: values.vesselType,
        shipBuilder: values.shipBuilder,
        registrationNumber: values.registrationNumber,
        portOfRegistry: values.portOfRegistry,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("vesselTwo", JSON.stringify(payload));
      }
      console.log("VesselFormTwo payload:", payload);
      handleSelect();
    } catch (err: any) {
      console.error("Failed to save vessel form two:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="callSign"
            title="Call Sign"
            placeholder="e.g., H3RC"
            type="text"
            control={form.control}
            require
          />

          <SelectBox
            label="Flag State"
            control={form.control}
            name="flagState"
            placeholder="Select Flag State"
            data={FLAG_STATES as unknown as string[]}
          />

          <FormInput
            name="yearBuilt"
            title="Year Built"
            placeholder="e.g., 2018"
            type="text"
            control={form.control}
            require
          />

          <SelectBox
            label="Vessel Type"
            control={form.control}
            name="vesselType"
            placeholder="Select Vessel Type"
            data={VESSEL_TYPES as unknown as string[]}
          />

          <FormInput
            name="shipBuilder"
            title="Ship Builder"
            placeholder="e.g., Imabari Shipbuilding"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="registrationNumber"
            title="Registration Number"
            placeholder="e.g., REG123456"
            type="text"
            control={form.control}
            require
          />

          <SelectBox
            label="Port of Registry"
            control={form.control}
            name="portOfRegistry"
            placeholder="Select Port"
            data={PORT_OF_REGISTRY as unknown as string[]}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-6 py-2 bg-primary-100 text-white rounded-md font-medium"
          >
            {form.formState.isSubmitting ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default VesselFormTwo;
