import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }).min(8, { message: "Password must be minimum 8 characters" }),
}).strict();