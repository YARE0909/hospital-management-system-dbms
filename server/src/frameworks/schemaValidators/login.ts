import { z } from "zod";

export const LoginSchema = z.object({
    patientEmail: z.string({ required_error: "Patient email is required", invalid_type_error: "Patient email must be a string" }).email({ message: "Invalid email" }).optional(),
    doctorEmail: z.string({ required_error: "Doctor email is required", invalid_type_error: "Doctor email must be a string" }).email({ message: "Invalid email" }).optional(),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
}).strict().refine(data => {
    if (!data.patientEmail && !data.doctorEmail) {
        return false;
    }

    if (data.patientEmail && data.doctorEmail) {
        return false;
    }

    return true;
}, { message: "Either patient email or admin email is required" }
);