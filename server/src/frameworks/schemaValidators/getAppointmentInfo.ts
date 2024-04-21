import { z } from "zod";

export const GetAppointmentInfoSchema = z.object({
    appointmentId: z.string({ required_error: "Appointment ID is required", invalid_type_error: "Appointment ID must be a string" })
}).strict();