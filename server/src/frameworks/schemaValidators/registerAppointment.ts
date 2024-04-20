import { z } from "zod";

export const RegisterAppointmentSchema = z.object({
    patientId: z.string({ required_error: "Patient ID is required", invalid_type_error: "Patient ID must be a string" }),
    doctorId: z.string({ required_error: "Doctor ID is required", invalid_type_error: "Doctor ID must be a string" }),
    appointmentDate: z.coerce.date({ required_error: "Appointment date is required", invalid_type_error: "Appointment date must be a valid date" }),
    appointmentType: z.enum(["checkUp", "routine", "followUp"], { required_error: "Type is required", invalid_type_error: "Type must be one of 'checkUp', 'routine', 'followUp'" }),
    // appointmentDetails: z.object({
    //     condition: z.string({ required_error: "Condition is required", invalid_type_error: "Condition must be a string" }).max(255, { message: "Condition must not exceed 255 characters" }),
    //     prescription: z.string({ required_error: "Prescription is required", invalid_type_error: "Prescription must be a string" }).max(255, { message: "Prescription must not exceed 255 characters" }),
    //     notes: z.string({ invalid_type_error: "Notes must be a string" }).optional()
    // }).array(),
    // medicalRecordInfo: z.object({
    //     height: z.number({ required_error: "Height is required", invalid_type_error: "Height must be a number" }),
    //     weight: z.number({ required_error: "Weight is required", invalid_type_error: "Weight must be a number" }),
    //     bloodPressure: z.number({ required_error: "Blood pressure is required", invalid_type_error: "Blood pressure must be a number" }),
    // })

}).strict();