import { Appointments, Doctors, Patients } from "#src/entities/index.js";
import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default async function getStatistics(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while registering patient", data: null }

    try {
        const [doctorCount, patientCount, genderRatio, patientsPerDay, appointmentCount] = await Promise.all([
            Doctors.getDoctorCount(),
            Patients.getPatientCount(),
            Patients.getGenderRatio(),
            Appointments.getPatientsPerDay(),
            Appointments.getAppointmentCount()
        ]);

        response.hasError = false;
        response.message = "Statistics found";
        response.data = {
            doctorCount,
            patientCount,
            appointmentCount,
            genderRatio: {
                maleCount: parseInt(genderRatio.maleCount),
                femaleCount: parseInt(genderRatio.femaleCount)
            },
            patientsPerDay,
        }
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