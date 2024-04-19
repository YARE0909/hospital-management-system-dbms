import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Patients } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function getPatientInfo(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patient info", data: null }

    try {
        const { patientId } = SchemaValidators.GetPatientInfoSchema.parse(req.body);
        const patientInfo = await Patients.getPatientById(patientId);
        if (!patientInfo) {
            response.message = "Patient not found";
            return response;
        }

        response.hasError = false;
        response.message = "Patient info fetched successfully";
        response.data = { patientInfo };
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