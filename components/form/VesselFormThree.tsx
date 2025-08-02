"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import { SelectBox } from "../common/SelectBox";

const HULL_TYPES = [
  "Steel",
  "Aluminum",
  "Polyethylene Plastic",
  "PolyLink3/Composite",
  "Fiberglass",
  "Kevlar",
  "Thermoform/ABS",
  "Wood",
] as const;

const formSchema = z.object({
  grossTonnage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Gross tonnage must be a number." })
    .min(1, { message: "Gross tonnage is required." }),
  netTonnage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Net tonnage must be a number." })
    .min(1, { message: "Net tonnage is required." }),
  deadWeight: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Dead weight must be a number." })
    .min(1, { message: "Dead weight is required." }),
  lengthOverall: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Length overall must be a number." })
    .min(1, { message: "Length overall is required." }),
  beam: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Beam must be a number." })
    .min(1, { message: "Beam is required." }),
  draft: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Draft must be a number." })
    .min(1, { message: "Draft is required." }),
  hullType: z.string().min(1, { message: "Hull type is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const VesselFormThree = ({ handleSelect }: any) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossTonnage: "",
      netTonnage: "",
      deadWeight: "",
      lengthOverall: "",
      beam: "",
      draft: "",
      hullType: "Steel",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        grossTonnage: values.grossTonnage,
        netTonnage: values.netTonnage,
        deadWeight: values.deadWeight,
        lengthOverall: values.lengthOverall,
        beam: values.beam,
        draft: values.draft,
        hullType: values.hullType,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("vesselThree", JSON.stringify(payload));
      }
      console.log("VesselFormThree payload:", payload);
      handleSelect();
    } catch (err: any) {
      console.error("Failed to save vessel specs:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="grossTonnage"
            title="Gross Tonnage"
            placeholder="e.g., 5000"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="netTonnage"
            title="Net Tonnage"
            placeholder="e.g., 3000"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="deadWeight"
            title="Dead Weight"
            placeholder="e.g., 10000"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="lengthOverall"
            title="Length Overall"
            placeholder="e.g., 150"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="beam"
            title="Beam"
            placeholder="e.g., 30"
            type="text"
            control={form.control}
            require
          />

          <FormInput
            name="draft"
            title="Draft"
            placeholder="e.g., 10"
            type="text"
            control={form.control}
            require
          />

          <SelectBox
            label="Hull Type / Material"
            control={form.control}
            name="hullType"
            placeholder="Select Hull Material"
            data={HULL_TYPES as unknown as string[]}
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

export default VesselFormThree;
