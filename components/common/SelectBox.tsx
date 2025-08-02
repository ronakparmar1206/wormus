import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function SelectBox({
  label,
  control,
  placeholder,
  name,
  data,
  cssStyles,
  disabled,
}: {
  label: string;
  control: any;
  name: string;
  placeholder: string;
  data?: any[];
  cssStyles?: string;
  disabled?: boolean;
}) {
  console.log(data, "dataa");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <>
            <FormItem>
              <FormLabel className="text-[#5E6366] text-xs">{label}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field?.value ? field.value : ""}
                >
                  <SelectTrigger
                    className={`w-full bg-[#EFF1F999]/60  ${cssStyles}`}
                    disabled={disabled}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="focus:ring-offset-0">
                    <SelectGroup>
                      {data && data?.length > 0
                        ? data?.map((e: any, index) => (
                            <SelectItem
                              value={e?._id || e}
                              key={index}
                              className="capitalize"
                            >
                              {e?.fullName || e?.organisationName || e}
                            </SelectItem>
                          ))
                        : "No Vessels"}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          </>
        );
      }}
    />
  );
}
