"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/common/FormInput";
import { NoonReportFormData, step6Schema } from "./noonReportSchema";

// Schema
// const step6FormSchema = z.object({
//   watchRemarks: z.string().optional(),
//   officerOfWatch: z.string().min(1, "Officer of the Watch is required"),
//   approver: z.string().min(1, "Approver is required"),
// });

type FormValues = z.infer<typeof step6Schema>;

const Step6: React.FC<{
  defaultValues: Partial<NoonReportFormData>;
  onNext: (data: Partial<NoonReportFormData>) => void;
  onBack: VoidFunction;
}> = ({ defaultValues, onNext, onBack }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      watchRemarks: defaultValues.watchRemarks ?? "",
      officerOfWatch: defaultValues.officerOfWatch ?? "",
      approver: defaultValues.approver ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Watch Remarks */}
          <div className="col-span-1">
            <label className="text-[#5E6366] text-xs block mb-1">
              Watch Remarks
            </label>
            <textarea
              placeholder="Any notes/incidents"
              className="w-full min-h-[110px] rounded-md border border-input bg-[#F6F7FB] px-3 py-2 text-sm"
              {...form.register("watchRemarks")}
            />
          </div>

          <div className="space-y-4">
            {/* Officer of the Watch */}
            <div>
              <label className="text-[#5E6366] text-xs block mb-1">
                Officer of the Watch (OOW)
              </label>
              <Select
                onValueChange={(val) => form.setValue("officerOfWatch", val)}
                defaultValue={form.getValues("officerOfWatch")}
              >
                <SelectTrigger className="w-full bg-[#F6F7FB]">
                  <SelectValue placeholder="Pre-filled or digital sign" />
                </SelectTrigger>
                <SelectContent className="w-full p-1">
                  {["C/O", "2/O", "3/O", "Digital Sign"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Approver */}
            <div>
              <label className="text-[#5E6366] text-xs block mb-1">
                Approver (Master / Chief Mate)
              </label>
              <Select
                onValueChange={(val) => form.setValue("approver", val)}
                defaultValue={form.getValues("approver")}
              >
                <SelectTrigger className="w-full bg-[#F6F7FB]">
                  <SelectValue placeholder="Final validator" />
                </SelectTrigger>
                <SelectContent className="w-full p-1">
                  {["Master", "Chief Mate"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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

export default Step6;
