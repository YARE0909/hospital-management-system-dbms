import { db } from "../../sql/index.js";

export async function createAppointment(dataToInsert: any) {
    const { patientId, doctorId, appointmentDate, status, type } = dataToInsert
    await db.query("INSERT INTO appointments(patient_id, doctor_id, appointment_date, status, type) VALUES (?, ?, ?, ?, ?)", [patientId, doctorId, appointmentDate, status, type]);
    const [result] = await db.query("SELECT id FROM appointments ORDER BY created_at DESC") as any;
    return result[0].id;
}

export async function getAppointmentsList() {
    const [result] = await db.query(`
    SELECT * FROM appointments
    INNER JOIN patients ON appointments.patient_id = patients.id
    ORDER BY appointment_date DESC
    `
    ) as any;
    const response = result.map((res: any) => ({
        patientFirstName: res.first_name,
        patientLastName: res.last_name ?? null,
        patientGender: res.gender,
        appointmentType: res.type,
        appointmentStatus: res.status,
        appointmentDate: res.appointment_date,
    }));

    return response;
}