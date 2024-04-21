import { z } from "zod";

export const AddAppointmentDetailsSchema = z.object({
    appointmentId: z.string({ required_error: "Appointment ID is required", invalid_type_error: "Appointment ID must be a string" }),
    appointmentDetails: z.object({
        condition: z.string({ required_error: "Condition is required", invalid_type_error: "Condition must be a string" }),
        prescription: z.string({ required_error: "Prescription is required", invalid_type_error: "Prescription must be a string" }),
        notes: z.string({ invalid_type_error: "Notes must be a string" }).optional(),
    }).strict().array(),
}).strict();