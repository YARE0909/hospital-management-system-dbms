import { db } from "../../sql/index.js";

export async function createMedicalRecord(dataToInsert: any) {
    const { appointmentId, height, weight, bloodPressure } = dataToInsert
    await db.query("INSERT INTO medical_records(appointment_id, height, weight, blood_pressure) VALUES (?, ?, ?, ?)", [appointmentId, height, weight, bloodPressure])
}