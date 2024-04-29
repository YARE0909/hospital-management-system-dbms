import { SchemaValidators } from "#src/frameworks/index.js";
import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Appointments, MedicalRecords, Patients } from "#src/entities/index.js";
import { Utils } from "#src/frameworks/index.js";
import { AppointmentStatus } from "#src/enums/appointmentStatus.js";
import { AppointmentType } from "#src/enums/appointmentType.js";

export default async function registerPatients(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while registering patient", data: null }

    try {
        const { firstName, lastName = null, dateOfBirth, gender, mobileNo, email } = SchemaValidators.RegisterPatientSchema.parse(req.body);
        await Patients.registerPatient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            mobileNo,
            email,
            password: Utils.randomString(8)
        });

        response.hasError = false;
        response.message = "Patient registered successfully";
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