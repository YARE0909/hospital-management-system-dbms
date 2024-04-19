import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { fromZodError, isValidationError } from "zod-validation-error";
import { Doctors } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function login(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const { email, password } = SchemaValidators.LoginSchema.parse(req.body);

        const doctorInfo = await Doctors.getDoctorByEmail(email);
        if (!doctorInfo) {
            response.message = "Doctor not found";
            return response;
        }

        if (doctorInfo.password !== password) {
            response.message = "Invalid password";
            return response;
        }

        const token = jwt.sign({ userId: doctorInfo.id }, process.env.JWT_SECRET);

        response.hasError = false;
        response.message = "Doctor fetched successfully";
        response.data = { token };

        return response;
    } catch (err) {
        if (err instanceof ZodError) {
            const formattedError = fromZodError(err as unknown as ZodError);
            console.error(formattedError);
            response.message = formattedError.details[0].message;
        } else {
            console.error(err);
        }

        return response;
    }
}