import type { ServerResponse } from "#src/types/index.js";
import { type Request, type Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Appointments, AppointmentDetails, MedicalRecords } from "#src/entities/index.js";
import { SchemaValidators } from "#src/frameworks/index.js";

export default async function registerAppointment(req: Request, res: Response): Promise<ServerResponse> {
    const response: ServerResponse = { hasError: true, message: "An error occured while getting patients", data: null }

    try {
        const { patientId, doctorId, appointmentDate, status, type, appointmentDetails, medicalRecordInfo } = SchemaValidators.RegisterAppointmentSchema.parse(req.body);
        const appointmentInfo = {
            patientId,
            doctorId,
            appointmentDate,
            status,
            type
        }
        const appointmentId = await Appointments.createAppointment(appointmentInfo);

        const appointmentDetailsToInsert = appointmentDetails.map((appointmentDetail) => ({
            appointment_id: appointmentId,
            "`condition`": appointmentDetail.condition,
            prescription: appointmentDetail.prescription,
            notes: appointmentDetail.notes || null
        }))
        await AppointmentDetails.bulkCreateAppointmentDetails(appointmentDetailsToInsert);

        await MedicalRecords.createMedicalRecord({
            appointmentId,
            ...medicalRecordInfo
        });
        response.hasError = false;
        response.message = "Appointment registered successfully";
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