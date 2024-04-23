import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Doctors } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";
import { Utils } from "#src/frameworks/index.js";

export default async function registerDoctor(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while registering doctor", data: null }

    try {
        const { firstName, lastName, dateOfBirth, gender, email, mobileNo, specialization, departmentId } = SchemaValidators.RegisterDoctorSchema.parse(req.body);
        const dataToSave = {
            firstName,
            lastName,
            dateOfBirth,
            email,
            mobileNo,
            gender,
            password: Utils.randomString(8),
            departmentId,
            specialization
        }

        await Doctors.createDoctor(dataToSave);

        response.hasError = false;
        response.message = "Doctor created successfully";
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