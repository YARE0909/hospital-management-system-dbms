import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Specializations } from "#src/entities/index.js";

export default async function getSpecializations(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting specializations", data: null }

    try {
        const specializations = await Specializations.getSpecializations();
        if (!specializations?.length) {
            response.hasError = false;
            response.message = "No specializations found";
            return response;
        }

        response.hasError = false;
        response.message = "Specializations fetched successfully";
        response.data = { specializations };
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