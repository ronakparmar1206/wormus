"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";

import { organizationAPI } from "@/lib/api";

// Schema
const formSchema = z.object({
  organisationName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters." }),
  registrationNo: z
    .string()
    .min(1, { message: "Registration number is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const NameForm: React.FC<any> = ({ ownerId, managerId, handleSelect }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organisationName: "",
      registrationNo: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        organisationName: values.organisationName,
        registrationNo: values.registrationNo,
        ownerId,
        managerId,
      };

      const response = await organizationAPI.create(payload);
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

          {/* Only show the rest when Create Owner is selected */}

          <FormInput
            name="organisationName"
            title="Organization Name"
            placeholder="Enter Organization Name"
            type="text"
            control={form.control}
            require
          />
          <FormInput
            name="registrationNo"
            title="Organization Regsitration No."
            placeholder="Enter Registration No."
            type="text"
            control={form.control}
            require
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-100 text-white rounded-md font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </Form>
  );
};

export default NameForm;
