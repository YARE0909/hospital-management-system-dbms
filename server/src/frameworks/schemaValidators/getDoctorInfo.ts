import { z } from "zod";

export const GetDoctorInfoSchema = z.object({
    doctorId: z.string({ required_error: "Doctor ID is required", invalid_type_error: "Doctor ID must be a string" })
}).strict();