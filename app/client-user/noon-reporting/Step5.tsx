"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import { NoonReportFormData, step5Schema } from "./noonReportSchema";

// Schema

type FormValues = z.infer<typeof step5Schema>;

const Step5: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
  onBack: VoidFunction;
}> = ({ defaultValues, onNext, onBack }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      vesselSpeed: defaultValues.vesselSpeed ?? "0",
      observedDistance: defaultValues.observedDistance ?? "0",
      logDistance: defaultValues.logDistance ?? "0",
      steamingTime: defaultValues.steamingTime ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Step 5 data:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Vessel Speed */}
          <FormInput
            name="vesselSpeed"
            title="Vessel Speed (Knots)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Observed Distance */}
          <FormInput
            name="observedDistance"
            title="Observed Distance (NM)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Log Distance */}
          <FormInput
            name="logDistance"
            title="Log Distance (NM)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Steaming Time */}
          <FormInput
            name="steamingTime"
            title="Steaming Time (HH:MM)"
            placeholder="e.g. 04:30"
            type="time"
            control={form.control}
          />
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
};

export default Step5;
