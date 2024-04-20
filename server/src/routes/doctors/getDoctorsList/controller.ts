import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Doctors } from "#src/entities/index.js";

export default async function getDoctorsList(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting doctors", data: null }

    try {
        const doctors = await Doctors.getDoctors();
        if (!doctors?.length) {
            response.hasError = false;
            response.message = "No doctors found";
            return response;
        }

        response.hasError = false;
        response.message = "Doctors fetched successfully";
        response.data = { doctors };
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