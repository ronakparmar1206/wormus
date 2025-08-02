"use client";
import React, { useEffect, useState } from "react";
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
import { authAPI, organizationAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
    passportNo: z.string().min(1, { message: "Passport number is required." }),

    phoneNumber: z.string(),
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

interface ManagerProps {
  selectedOrg: string;
  handleSelect: (v: string) => void;
}

const ManagerForm: React.FC<ManagerProps> = ({ selectedOrg, handleSelect }) => {
  const [manager, setManager] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",

      phoneNumber: "",
      passportNo: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const response = await organizationAPI.getAll("manager");
        console.log(response);
        setManager(response?.data?.data?.data || []);
      } catch (error: any) {
        console.error("Failed to fetch organizations:", error);
        setManager([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);
  const formShow = selectedOrg === "manager";

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        role: selectedOrg,
      };

      const response = await authAPI.createOwner(payload);
      console.log("Manager created successfully:", response.data);
      handleSelect(response.data.data._id);
      // Handle success (redirect, show success message, etc.)
    } catch (error: any) {
      console.error("Failed to create manager:", error);
      // Handle error (show toast, etc.)
    }
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
                <SelectValue placeholder="Choose Manager or Create Manager" />
              </SelectTrigger>
              <SelectContent className="w-full p-1">
                <SelectItem value="manager">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="data-[state=checked]:bg-primary-100"
                      checked={selectedOrg === "manager"}
                      onCheckedChange={() => handleSelect("manager")}
                    />
                    <div className="font-medium">Create Manager</div>
                  </div>
                </SelectItem>
                {loading ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2 text-sm">Loading managers...</span>
                  </div>
                ) : (
                  manager.map((mgr) => (
                    <SelectItem value={mgr._id} key={mgr._id}>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:bg-primary-100"
                          checked={selectedOrg === mgr._id}
                          onCheckedChange={() => handleSelect(mgr._id)}
                        />
                        <div className="font-medium">{mgr.fullName}</div>
                      </div>
                    </SelectItem>
                  ))
                )}
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
                name="passportNo"
                title="Manager Passport No."
                placeholder="Passport No."
                type="number"
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

export default ManagerForm;
