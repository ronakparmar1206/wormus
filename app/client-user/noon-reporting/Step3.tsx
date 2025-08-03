"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/common/FormInput";
import { NoonReportFormData, step3Schema } from "./noonReportSchema";

type FormValues = z.infer<typeof step3Schema>;

const Step3: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
  onBack: VoidFunction;
}> = ({ defaultValues, onNext, onBack }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      windDirection: defaultValues.windDirection ?? "",
      seaDirection: defaultValues.seaDirection ?? "",
      windForce: defaultValues.windForce ?? "0",
      seaHeight: defaultValues.seaHeight ?? "0",
      swellDirection: defaultValues.swellDirection ?? "",
      swellHeight: defaultValues.swellHeight ?? "0",
      visibility: defaultValues.visibility ?? "",
      barometer: defaultValues.barometer ?? "0",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Step 3 data:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Wind Direction */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Wind Direction
            </label>
            <Select
              onValueChange={(val) => form.setValue("windDirection", val)}
              defaultValue={form.getValues("windDirection")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="(N, NE, etc.)" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) => (
                  <SelectItem key={dir} value={dir}>
                    {dir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sea Direction */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Sea Direction
            </label>
            <Select
              onValueChange={(val) => form.setValue("seaDirection", val)}
              defaultValue={form.getValues("seaDirection")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="From which direction" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) => (
                  <SelectItem key={dir} value={dir}>
                    {dir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Wind Force */}
          <FormInput
            name="windForce"
            title="Wind Force"
            placeholder="0–12"
            type="number"
            control={form.control}
          />

          {/* Sea Height */}
          <FormInput
            name="seaHeight"
            title="Sea Height (m)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Swell Direction */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Swell Direction
            </label>
            <Select
              onValueChange={(val) => form.setValue("swellDirection", val)}
              defaultValue={form.getValues("swellDirection")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) => (
                  <SelectItem key={dir} value={dir}>
                    {dir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Visibility */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Visibility
            </label>
            <Select
              onValueChange={(val) => form.setValue("visibility", val)}
              defaultValue={form.getValues("visibility")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="e.g., Clear, Fog, 5 NM" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["Clear", "Fog", "Haze", "Rain", "5 NM", "2 NM"].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swell Height */}
          <FormInput
            name="swellHeight"
            title="Swell Height (m)"
            placeholder="0"
            type="number"
            control={form.control}
          />

          {/* Barometer */}
          <FormInput
            name="barometer"
            title="Barometer (mb)"
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

export default Step3;
