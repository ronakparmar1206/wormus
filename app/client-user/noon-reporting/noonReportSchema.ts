import { z } from "zod";

export const step1Schema = z.object({
 watchPeriod: z.string().min(1, "Watch period is required"),
  timeOfLog: z.string().min(1, "Time of log is required"),
  lookout: z.string().min(1, "Lookout / Deck Watch is required"),
  watchCondition: z.string().min(1, "Watch condition is required"),
  helmsman: z.string().min(1, "Helmsman is required"),
  steeringGear: z.string().min(1, "Steering gear is required"),
});

export const step2Schema = z.object({
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  courseTrue: z.string().optional(),
  courseGyro: z.string().optional(),
  courseMagnetic: z.string().optional(),
  gyroError: z.string().optional(),
});

export const step3Schema = z.object({
  windDirection: z.string().optional().or(z.literal("")),
  seaDirection: z.string().optional().or(z.literal("")),
  windForce: z.string().optional().or(z.literal("")),
  seaHeight: z.string().optional().or(z.literal("")),
  swellDirection: z.string().optional().or(z.literal("")),
  swellHeight: z.string().optional().or(z.literal("")),
  visibility: z.string().optional().or(z.literal("")),
  barometer: z.string().optional().or(z.literal("")),
});

export const step4Schema = z.object({
 airTemp: z.string().optional().or(z.literal("")),
  seaTemp: z.string().optional().or(z.literal("")),
  tankPressureCargo: z.string().optional().or(z.literal("")),
  tankPressureFuelGas: z.string().optional().or(z.literal("")),

});

export const step5Schema = z.object({
 vesselSpeed: z.string().optional().or(z.literal("")),
  observedDistance: z.string().optional().or(z.literal("")),
  logDistance: z.string().optional().or(z.literal("")),
  steamingTime: z.string().min(1, "Steaming Time is required"),

});

export const step6Schema = z.object({
  watchRemarks: z.string().optional().or(z.literal("")),
  officerOfWatch: z.string().optional().or(z.literal("")),
  approver: z.string().optional().or(z.literal("")),
});

const fullNoonReportSchema = step1Schema.extend({
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
  ...step5Schema.shape,
  ...step6Schema.shape,
});

export type NoonReportFormData = z.infer<typeof fullNoonReportSchema>;