import { z } from "zod";

export const RegisterPatientSchema = z.object({
    doctorId: z.string({ required_error: "Doctor ID is required", invalid_type_error: "Doctor ID must be a string" }),
    firstName: z.string({ required_error: "First name is required", invalid_type_error: "First name must be a string" }),
    lastName: z.string({ required_error: "Last name is required", invalid_type_error: "Last name must be a string" }).optional(),
    dateOfBirth: z.coerce.date({ required_error: "Date of birth is required", invalid_type_error: "Date of birth must be a date" }),
    gender: z.enum(["male", "female"], { required_error: "Gender is required", invalid_type_error: "Gender must be either male or female" }),
    mobileNo: z.string({ required_error: "Mobile number is required", invalid_type_error: "Mobile number must be a string" }).min(10, { message: "Mobile number must be minimum 10 digits" }).max(10, { message: "Mobile number must be maximum 10 digits" }),
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email" }),
    height: z.number({ required_error: "Height is required", invalid_type_error: "Height must be a number" }).min(0, { message: "Height must be minimum 0" }),
    weight: z.number({ required_error: "Weight is required", invalid_type_error: "Weight must be a number" }).min(0, { message: "Weight must be minimum 0" }),
    bloodPressure: z.number({ required_error: "Blood pressure is required", invalid_type_error: "Blood pressure must be a string" }),
}).strict();