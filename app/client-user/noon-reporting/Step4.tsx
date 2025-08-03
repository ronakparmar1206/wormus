"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import { NoonReportFormData, step4Schema } from "./noonReportSchema";

type FormValues = z.infer<typeof step4Schema>;

const Step4: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
  onBack: VoidFunction;
}> = ({ defaultValues, onNext, onBack }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      airTemp: defaultValues.airTemp ?? "0",
      seaTemp: defaultValues.seaTemp ?? "0",
      tankPressureCargo: defaultValues.tankPressureCargo ?? "0",
      tankPressureFuelGas: defaultValues.tankPressureFuelGas ?? "0",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Step 4 data:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Air Temp */}
          <FormInput
            name="airTemp"
            title="Air Temp (°C)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Tank Pressure – Cargo */}
          <FormInput
            name="tankPressureCargo"
            title="Tank Pressure – Cargo"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Sea Temp */}
          <FormInput
            name="seaTemp"
            title="Sea Temp (°C)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Tank Pressure – Fuel Gas */}
          <FormInput
            name="tankPressureFuelGas"
            title="Tank Pressure – Fuel Gas"
            placeholder="0"
            type="number"
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

export default Step4;
