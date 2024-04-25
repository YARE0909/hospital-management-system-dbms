import { z } from "zod";

export const RegisterDoctorSchema = z.object({
    firstName: z.string({ required_error: "First name is required", invalid_type_error: "First name must be a string" }),
    lastName: z.string({ required_error: "Last name is required", invalid_type_error: "Last name must be a string" }),
    dateOfBirth: z.coerce.date({ required_error: "Date of birth is required", invalid_type_error: "Date of birth must be a date" }),
    gender: z.enum(["male", "female"], { required_error: "Gender is required", invalid_type_error: "Gender must be either male or female" }),
    mobileNo: z.string({ required_error: "Mobile number is required", invalid_type_error: "Mobile number must be a string" }).regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email" }),
    specializationId: z.string({ required_error: "Specialization ID is required", invalid_type_error: "Specialization ID must be a string" }),
}).strict();