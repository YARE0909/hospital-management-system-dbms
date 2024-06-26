import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Patients } from "#src/entities/index.js";

export default async function getPatientsList(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const patients = await Patients.getPatients();
        if (!patients?.length) {
            response.hasError = false;
            response.message = "No patients found";
            return response;
        }

        response.hasError = false;
        response.message = "Patients fetched successfully";
        response.data = { patients };
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