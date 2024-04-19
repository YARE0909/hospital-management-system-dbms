import { db } from "../../sql/index.js";

export async function createAppointment(dataToInsert: any) {
    const { patientId, doctorId, appointmentDate, status, type } = dataToInsert
    await db.query("INSERT INTO appointments(patient_id, doctor_id, appointment_date, status, type) VALUES (?, ?, ?, ?, ?)", [patientId, doctorId, appointmentDate, status, type]);
    const [result] = await db.query("SELECT id FROM appointments ORDER BY created_at DESC") as any;
    return result[0].id;
}