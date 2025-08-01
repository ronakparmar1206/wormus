import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { cn } from "@/lib/utils";

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
  data?: string[];
  cssStyles?: string;
  disabled?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <>
            <FormItem>
              <FormLabel className="text-black">{label}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field?.value ? field.value : ""}
                >
                  <SelectTrigger
                    className={cn("bg-secondary-1 capitalize", cssStyles)}
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
                              {e?.name || e}
                            </SelectItem>
                          ))
                        : "No Patient"}
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
