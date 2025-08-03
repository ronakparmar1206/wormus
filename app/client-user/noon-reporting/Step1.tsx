"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { NoonReportFormData, step1Schema } from "./noonReportSchema";

type FormValues = z.infer<typeof step1Schema>;

const Step1: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
}> = ({ defaultValues, onNext }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      watchPeriod: defaultValues.watchPeriod ?? "",
      timeOfLog: defaultValues.timeOfLog ?? "",
      lookout: defaultValues.lookout ?? "",
      watchCondition: defaultValues.watchCondition ?? "",
      helmsman: defaultValues.helmsman ?? "",
      steeringGear: defaultValues.steeringGear ?? "",
    },
  });
  console.log("Form Errors Step 1:", form.formState.errors);

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Watch Period */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Watch Period
            </label>
            <Select
              onValueChange={(val) => form.setValue("watchPeriod", val)}
              defaultValue={form.getValues("watchPeriod")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="Select (00–04, 04–08, etc.)" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["00–04", "04–08", "08–12", "12–16", "16–20", "20–24"].map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Watch Condition */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Watch Condition
            </label>
            <Select
              onValueChange={(val) => form.setValue("watchCondition", val)}
              defaultValue={form.getValues("watchCondition")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="Normal / Heavy Traffic / Etc." />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["Normal", "Heavy Traffic", "Manoeuvring", "Etc"].map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Time of Log */}
          <FormInput
            type="time"
            name="timeOfLog"
            title="Time of Log"
            placeholder="12:00 PM"
            control={form.control}
            require
          />

          {/* Helmsman */}
          <FormInput
            type="text"
            name="helmsman"
            title="Helmsman"
            placeholder="Who's at the helm"
            control={form.control}
            require
          />

          {/* Lookout */}
          <FormInput
            type="text"
            name="lookout"
            title="Lookout / Deck Watch"
            placeholder="Crew Name / Initials"
            control={form.control}
            require
          />

          {/* Steering Gear in Use */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Steering Gear in Use
            </label>
            <Select
              onValueChange={(val) => form.setValue("steeringGear", val)}
              defaultValue={form.getValues("steeringGear")}
            >
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="Hand / Auto / Emergency" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                {["Hand", "Auto", "Emergency"].map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
};

export default Step1;
