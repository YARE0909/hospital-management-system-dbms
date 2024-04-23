import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Departments, Doctors } from "#src/entities/index.js";

export default async function getDepartments(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting doctors", data: null }

    try {
        const departments = await Departments.getDepartments();
        if (!departments?.length) {
            response.hasError = false;
            response.message = "No departments found";
            return response;
        }

        response.hasError = false;
        response.message = "Departments fetched successfully";
        response.data = { departments };
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