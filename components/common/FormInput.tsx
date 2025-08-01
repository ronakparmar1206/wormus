import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { type } from "os";

interface FormProps {
  title: string;
  type: string;
  name: string;
  placeholder: string;
  control: any;
  cssStyles?: string;
  require?: boolean;
  disabled?: boolean;
}

const FormInput = ({
  control,
  title,
  name,
  type,
  placeholder,
  require,
  cssStyles = "",
  disabled = false,
}: FormProps) => {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="grow">
            <FormLabel className="text-[#5E6366] text-xs">
              {title} {require && <span className="text-red-500">*</span>}
            </FormLabel>

            <FormControl>
              {isPassword ? (
                <div className="relative">
                  <Input
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full bg-[#EFF1F999]/60 pr-10 ${cssStyles}`}
                    {...field}
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-1"
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              ) : (
                <Input
                  type={inputType}
                  placeholder={placeholder}
                  className={`w-full bg-[#EFF1F999]/60 ${cssStyles}`}
                  {...field}
                  disabled={disabled}
                />
              )}
            </FormControl>

            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
