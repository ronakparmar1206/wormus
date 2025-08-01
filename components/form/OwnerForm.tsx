"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const ORGS = [
  { id: "acme", name: "Acme Corp" },
  { id: "globex", name: "Globex Inc." },
  { id: "stark", name: "Stark Industries" },
  { id: "wayne", name: "Wayne Enterprises" },
  { id: "umbrella", name: "Umbrella Co." },
];

// Password constraints
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/\d/, { message: "Password must contain at least one number." })
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
    message: "Password must contain at least one special character.",
  });

// Schema
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Owner name must be at least 2 characters." }),

    phoneNumber: z.string()
      .min(10, { message: "Phone number must be at least 10 characters." })
      .max(10, { message: "Phone number must be at most 10 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    confirmEmail: z.string().email({ message: "Invalid email address." }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email and confirmation email do not match.",
        path: ["confirmEmail"],
      });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and confirmation password do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

interface OwnerFormProps {
  selectedOrg: string;
  handleSelect: (v: string) => void;
  setStep: any;
}

const OwnerForm: React.FC<OwnerFormProps> = ({
  selectedOrg,
  handleSelect,
  setStep,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",

      phoneNumber: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formShow = selectedOrg === "owner";

  const onSubmit = (values: FormValues) => {
    const payload = {
      fullName: values.fullName,

      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      role: selectedOrg,
    };
    console.log("Submitting:", payload);

    handleSelect("manager");
    setStep(2);
    // send to backend...
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Select / Create Owner */}
          <div>
            <label className="text-[#5E6366] text-xs block mb-1">
              Designated Manager
            </label>
            <Select value={selectedOrg} onValueChange={handleSelect}>
              <SelectTrigger className="w-full bg-[#F6F7FB]">
                <SelectValue placeholder="Choose Organization or Create Owner">
                  {selectedOrg || undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                <SelectItem value="owner">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="data-[state=checked]:bg-primary-100"
                      checked={selectedOrg === "owner"}
                      onCheckedChange={() => handleSelect("owner")}
                    />
                    <div className="font-medium">Create Owner</div>
                  </div>
                </SelectItem>
                {ORGS.map((o) => (
                  <SelectItem value={o.name} key={o.id}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        className="data-[state=checked]:bg-primary-100"
                        checked={selectedOrg === o.name}
                        onCheckedChange={() => handleSelect(o.name)}
                      />
                      <div className="font-medium">{o.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Only show the rest when Create Owner is selected */}
          {formShow && (
            <>
              <FormInput
                name="fullName"
                title="Designated Admin Name"
                placeholder="Admin Name"
                type="text"
                control={form.control}
                require
              />
              <FormInput
                name="phoneNumber"
                title="Phone Number"
                placeholder="+919664871161"
                type="tel"
                control={form.control}
                require
              />
              <FormInput
                name="email"
                title="Email"
                placeholder="johndoe@example.com"
                type="email"
                control={form.control}
                require
              />
              <FormInput
                name="confirmEmail"
                title="Confirm Email"
                placeholder="johndoe@example.com"
                type="email"
                control={form.control}
                require
              />
              <div>
                <FormInput
                  name="password"
                  title="Password"
                  placeholder="••••••••"
                  type="password"
                  control={form.control}
                  require
                />
              </div>
              <FormInput
                name="confirmPassword"
                title="Confirm Password"
                placeholder="••••••••"
                type="password"
                control={form.control}
                require
              />
            </>
          )}
        </div>

        {formShow && (
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-100 text-white rounded-md font-medium"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default OwnerForm;
