import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { fromZodError, isValidationError } from "zod-validation-error";
import { Patients, Doctors } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function login(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const { patientEmail, doctorEmail, password } = SchemaValidators.LoginSchema.parse(req.body);
        if (patientEmail) {
            const patientInfo = await Patients.getPatientByEmail(patientEmail);
            if (!patientInfo) {
                response.message = "Patient not found";
                return response;
            }

            if (patientInfo.password !== password) {
                response.message = "Invalid password";
                return response;
            }

            const token = jwt.sign({ userId: patientInfo.id }, process.env.JWT_SECRET);

            response.hasError = false;
            response.message = "Patient fetched successfully";
            response.data = { patientToken: token };
        } else if (doctorEmail) {
            const doctorInfo = await Doctors.getDoctorByEmail(doctorEmail);
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
            response.data = { doctorToken: token };
        }

        return response;
    } catch (err) {
        if (isValidationError(err)) {
            const formattedError = fromZodError(err as unknown as ZodError);
            console.error(formattedError);
            response.message = formattedError.details[0].message;
        } else {
            console.error(err);
        }

        return response;
    }
}