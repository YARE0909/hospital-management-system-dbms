import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { AppointmentDetails } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function addAppointmentDetails(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while adding appointment details", data: null }

    try {
        const { appointmentId, appointmentDetails } = SchemaValidators.AddAppointmentDetailsSchema.parse(req.body);
        const dataToDb = appointmentDetails.map((appointmentDetail) => ({
            appointment_id: appointmentId,
            "`condition`": appointmentDetail.condition,
            prescription: appointmentDetail.prescription,
            notes: appointmentDetail.notes || null,
        }));

        await AppointmentDetails.bulkCreateAppointmentDetails(dataToDb);

        response.hasError = false;
        response.message = "Added appointment details successfully";
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