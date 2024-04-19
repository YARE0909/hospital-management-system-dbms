import { z } from "zod";

export const GetPatientInfoSchema = z.object({
    patientId: z.string({ required_error: "Patient ID is required", invalid_type_error: "Patient ID must be a string" })
}).strict();