import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Appointments, AppointmentDetails, MedicalRecords } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function getAppointmentList(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const appointments = await Appointments.getAppointmentsList();

        response.hasError = false;
        response.message = "Appointment list fetched successfully";
        response.data = { appointments };
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