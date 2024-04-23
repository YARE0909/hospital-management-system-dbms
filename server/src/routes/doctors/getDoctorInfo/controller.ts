import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Doctors } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function getDoctorInfo(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting doctor info", data: null }

    try {
        const { doctorId } = SchemaValidators.GetDoctorInfoSchema.parse(req.body);
        const doctorInfo = await Doctors.getDoctorById(doctorId);
        if (!doctorInfo) {
            response.message = "Doctor info not found";
            return response;
        }

        response.hasError = false;
        response.message = "Doctor info found";
        response.data = doctorInfo;
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