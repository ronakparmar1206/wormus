"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import { NoonReportFormData, step2Schema } from "./noonReportSchema";

type FormValues = z.infer<typeof step2Schema>;

// Component
const Step2: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
  onBack: VoidFunction;
}> = ({ defaultValues, onNext, onBack }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      latitude: defaultValues.latitude ?? "",
      longitude: defaultValues.longitude ?? "",
      courseTrue: defaultValues.courseTrue ?? "",
      courseGyro: defaultValues.courseGyro ?? "",
      courseMagnetic: defaultValues.courseMagnetic ?? "",
      gyroError: defaultValues.gyroError ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Step 2 data:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="latitude"
            title=""
            placeholder="Latitude*"
            type="text"
            control={form.control}
            // require
          />
          <FormInput
            name="longitude"
            title=""
            placeholder="Longitude*"
            type="text"
            control={form.control}
          />
          <FormInput
            name="courseTrue"
            title=""
            placeholder="Course – True"
            type="text"
            control={form.control}
          />
          <FormInput
            name="courseGyro"
            title=""
            placeholder="Course – Gyro"
            type="text"
            control={form.control}
          />
          <FormInput
            name="courseMagnetic"
            title=""
            placeholder="Course – Magnetic"
            type="text"
            control={form.control}
          />
          <FormInput
            name="gyroError"
            title=""
            placeholder="Gyro Error = True – Gyro"
            type="text"
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

export default Step2;
