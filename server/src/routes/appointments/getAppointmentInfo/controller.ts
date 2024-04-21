import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Appointments } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function getAppointmentInfo(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const { appointmentId } = SchemaValidators.GetAppointmentInfoSchema.parse(req.body);
        const appointmentInfo = await Appointments.getAppointmentInfo(appointmentId);

        if (!appointmentInfo) {
            response.hasError = false;
            response.message = "Appointment info not found";
            return response;
        }

        response.hasError = false;
        response.message = "Appointment info fetched successfully";
        response.data = appointmentInfo;
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