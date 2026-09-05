import { z } from "zod";

export const createScreenSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Screen name is required"),

  totalRows: z
    .number()
    .int()
    .positive("Total rows must be greater than 0"),

  totalColumns: z
    .number()
    .int()
    .positive("Total columns must be greater than 0"),
});

export const createTheatreSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Theatre name is required"),

  city: z
    .string()
    .trim()
    .min(1, "City is required"),

  pin: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "PIN must be a 6-digit number"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required"),

  screens: z
    .array(createScreenSchema)
    .min(1, "At least one screen is required"),
});

