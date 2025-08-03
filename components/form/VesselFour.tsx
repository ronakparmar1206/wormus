"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import { SelectBox } from "../common/SelectBox";
import { authAPI, organizationAPI } from "@/lib/api";
import { toast } from "sonner";
import { Router } from "lucide-react";
import router from "next/router";
import { useRouter } from "next/navigation";

const PROPULSION_TYPES = [
  "Diesel",
  "Gas Turbine",
  "Electric",
  "Hybrid (Diesel-Electric)",
  "LNG Propulsion",
  "Steam Turbine",
  "Solar",
  "Wind-Assisted",
] as const;

const FUEL_TYPES = [
  "Marine Diesel Oil (MDO)",
  "Heavy Fuel Oil (HFO)",
  "Liquefied Natural Gas (LNG)",
  "Methanol",
  "Biofuel",
  "Hydrogen",
  "Solar + Battery",
  "Dual-Fuel (Diesel-LNG)",
] as const;

const formSchema = z.object({
  mainEngineType: z
    .string()
    .min(1, { message: "Main engine type is required." }),
  auxillaryEngines: z
    .string()
    .min(1, { message: "Auxiliary engines is required." }),
  teuCapacity: z.string().min(1, { message: "TEU capacity is required." }),
  cargoCapacity: z.string().min(1, { message: "Cargo capacity is required." }),
  communicationSystem: z
    .string()
    .min(1, { message: "Communication system is required." }),
  classSociety: z.string().min(1, { message: "Class society is required." }),
  propulsionType: z
    .string()
    .min(1, { message: "Propulsion type is required." }),
  fuelType: z.string().min(1, { message: "Fuel type is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const VesselFormFour = ({ managerId }: any) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainEngineType: "",
      auxillaryEngines: "",
      teuCapacity: "",
      cargoCapacity: "",
      communicationSystem: "",
      classSociety: "",
      propulsionType: "Diesel",
      fuelType: "Marine Diesel Oil (MDO)",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      let vesselOne: any = {};
      let vesselTwo: any = {};
      let vesselThree: any = {};
      if (typeof window !== "undefined") {
        try {
          const v1 = localStorage.getItem("vesselOne");
          const v2 = localStorage.getItem("vesselTwo");
          const v3 = localStorage.getItem("vesselThree");
          if (v1) vesselOne = JSON.parse(v1);
          if (v2) vesselTwo = JSON.parse(v2);
          if (v3) vesselThree = JSON.parse(v3);
        } catch (e) {
          console.warn(
            "Failed to parse existing vessel data from localStorage:",
            e
          );
        }
      }

      const combined = {
        ...vesselOne,
        ...vesselTwo,
        ...vesselThree,
        ...values,
      };
      console.log(combined, "combined");
      const response = await authAPI.createOwner({
        email: combined?.captainEmail,
        password: combined.password,
        passportNo: combined.passportNo,
        role: "captain",
      });
      console.log(response?.data?.data?._id, "response");

      const vesselResponse = {
        ...combined,
        captainId: response?.data?.data?._id,
        managerId,
      };
      await organizationAPI.createVessel(vesselResponse);
      localStorage.removeItem("vesselOne");
      localStorage.removeItem("vesselTwo");
      localStorage.removeItem("vesselThree");
      localStorage.removeItem("organizationId");
      localStorage.removeItem("managerId");
      toast.success("Vessel created successfully");
      router.push("/organizations");
    } catch (err: any) {
      console.error("Failed to save vessel form four:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="mainEngineType"
            title="Main Engine Type"
            placeholder="e.g., Wärtsilä 6L50"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="auxillaryEngines"
            title="Auxiliary Engines"
            placeholder="e.g., Generator specs"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="teuCapacity"
            title="TEU Capacity"
            placeholder="e.g., 2000"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="cargoCapacity"
            title="Cargo Capacity"
            placeholder="e.g., 50000"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="communicationSystem"
            title="Communication System"
            placeholder="e.g., GMDSS, VSAT"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="classSociety"
            title="Class Society"
            placeholder="e.g., Lloyd's Register"
            type="text"
            control={form.control}
            require
          />

          <SelectBox
            label="Propulsion Type"
            control={form.control}
            name="propulsionType"
            placeholder="Select Propulsion"
            data={PROPULSION_TYPES as unknown as string[]}
          />

          <SelectBox
            label="Fuel Type"
            control={form.control}
            name="fuelType"
            placeholder="Select Fuel"
            data={FUEL_TYPES as unknown as string[]}
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

export default VesselFormFour;
