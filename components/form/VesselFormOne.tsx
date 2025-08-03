"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";

import { authAPI, organizationAPI } from "@/lib/api";

import { SelectBox } from "../common/SelectBox";
import { toast } from "sonner";

const FLEET_GROUPS = [
  "Fleet A",
  "Fleet B",
  "Private",
  "Dedicated",
  "Preferred",
] as const;

const EXISTING_SISTER_VESSELS = [
  "Vessel Alpha",
  "Vessel Beta",
  "None",
] as const;

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

const formSchema = z
  .object({
    ownerId: z.string().min(1, { message: "Designated Manager is required." }),
    vesselName: z.string().min(1, { message: "Vessel name is required." }),
    imoNo: z
      .string()
      .regex(/^\d{7}$/, { message: "IMO number must be exactly 7 digits." }),
    captainEmail: z.string().email({ message: "Invalid captain email." }),
    passportNo: z.string().min(1, { message: "Passport number is required." }),
    password: passwordSchema,
    confirmPassword: z.string(),
    assignFleetGroup: z.string(),
    similarSisterGroup: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and confirmation password do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const VesselFormOne = ({ handleSelect, vessel }: any) => {
  const [organizations, setOrganizations] = useState([] as any[]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerId: "",
      vesselName: "",
      imoNo: "",
      captainEmail: "",
      passportNo: "",
      password: "",
      confirmPassword: "",
      assignFleetGroup: "Fleet A",
      similarSisterGroup: "None",
    },
  });
  const storedOrgId =
    typeof window !== "undefined"
      ? localStorage.getItem("organizationId")
      : null;
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrgs(true);
      try {
        const response = await organizationAPI.getOrg();

        if (vessel) {
          const orgData = response.data.data.data;
          const selectedOrg = orgData.find(
            (org: any) => org._id === storedOrgId
          );
          form.setValue("ownerId", selectedOrg?._id || "");
        }
        setOrganizations(response?.data?.data?.data || []);
      } catch (err: any) {
        console.error("Failed to fetch organizations:", err);
        setOrganizations([]);
      } finally {
        setLoadingOrgs(false);
      }
    };
    fetchOrganizations();
  }, [vessel, storedOrgId]);

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        vesselName: values.vesselName,
        imoNo: values.imoNo,
        captainEmail: values.captainEmail,
        organisationId: values.ownerId,
        password: values.password,
        passportNo: values.passportNo,
        assignFleetGroup: values.assignFleetGroup,
        similarSisterGroup: values.similarSisterGroup,
      };
      try {
        const response = await authAPI.checkUserEmail(values.captainEmail);
        console.log(response, "response");
        localStorage.setItem("vesselOne", JSON.stringify(payload));
        handleSelect();
      } catch (error: any) {
        console.error("Failed to check user email:", error);
        toast.error("Email already exists");
      }

      // return;

      console.log(payload, "payload");
    } catch (error: any) {
      console.error("Failed to create owner:", error);
      // TODO: surface error to user (toast/banner)
    }
  };

  if (loadingOrgs) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-100" />
        <p className="mt-2 text-sm text-gray-600">Loading organizations...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Designated Manager / Owner */}
          <SelectBox
            label="Organization"
            control={form.control}
            name="ownerId"
            placeholder="Select Manager / Owner"
            data={
              organizations.length > 0
                ? organizations
                : [{ label: "No organizations available", value: "" }]
            }
            disabled={organizations.length === 0 || vessel}
          />

          {/* Vessel Name */}
          <FormInput
            name="vesselName"
            title="Vessel Name"
            placeholder="e.g., Sea Explorer"
            type="text"
            control={form.control}
            require
          />

          {/* IMO Number */}
          <FormInput
            name="imoNo"
            title="IMO Number"
            placeholder="7-digit IMO number"
            type="text"
            control={form.control}
            require
          />

          {/* Captain Email */}
          <FormInput
            name="captainEmail"
            title="Captain Email"
            placeholder="captain@example.com"
            type="email"
            control={form.control}
            require
          />

          {/* Passport No */}
          <FormInput
            name="passportNo"
            title="Captain Passport No."
            placeholder="Passport No."
            type="text"
            control={form.control}
            require
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            title="Confirm Password"
            placeholder="••••••••"
            type="password"
            control={form.control}
            require
          />

          {/* Assigned Fleet Group */}
          <SelectBox
            label="Assigned Fleet Group"
            control={form.control}
            name="assignFleetGroup"
            placeholder="Select Fleet Group"
            data={FLEET_GROUPS as unknown as string[]}
          />

          {/* Similar / Sister Vessel */}
          <SelectBox
            label="Similar / Sister Vessel"
            control={form.control}
            name="similarSisterGroup"
            placeholder="Select Sister Vessel"
            data={EXISTING_SISTER_VESSELS as unknown as string[]}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-6 py-2 bg-primary-100 text-white rounded-md font-medium"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default VesselFormOne;
