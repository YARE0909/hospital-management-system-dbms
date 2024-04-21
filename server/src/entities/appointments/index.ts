import { db } from "../../sql/index.js";

export async function createAppointment(dataToInsert: any) {
    const { patientId, doctorId, appointmentDate, status, type } = dataToInsert
    await db.query("INSERT INTO appointments(patient_id, doctor_id, appointment_date, status, type) VALUES (?, ?, ?, ?, ?)", [patientId, doctorId, appointmentDate, status, type]);
    const [result] = await db.query("SELECT id FROM appointments ORDER BY created_at DESC") as any;
    return result[0].id;
}

export async function getAppointmentsList() {
    const [result] = await db.query(`
    SELECT *,
        patients.first_name AS first_name,
        patients.last_name AS last_name,
        patients.gender AS gender,
        doctors.first_name AS doctor_first_name,
        doctors.last_name AS doctor_last_name
    FROM appointments
    INNER JOIN patients ON appointments.patient_id = patients.id
    INNER JOIN doctors ON appointments.doctor_id = doctors.id
    ORDER BY appointment_date ASC
    `
    ) as any;
    const response = result.map((res: any) => ({
        patientFirstName: res.first_name,
        patientLastName: res.last_name ?? null,
        patientGender: res.gender,
        doctorFirstName: res.doctor_first_name,
        doctorLastName: res.doctor_last_name,
        appointmentType: res.type,
        appointmentStatus: res.status,
        appointmentDate: res.appointment_date,
    }));

    return response;
}

export async function getPatientsPerDay() {
    const [result] = await db.query(`
    SELECT 
        DATE_FORMAT(appointment_date, '%Y-%m-%d') AS date,
        COUNT(*) AS count
    FROM appointments
    GROUP BY date
    ORDER BY DATE_FORMAT(appointment_date, '%Y-%m-%d') ASC
    `
    ) as any;
    const response = result.map((res: any) => ({
        date: res.date,
        count: res.count
    }));

    return response;
}

export async function getAppointmentCount() {
    const [result] = await db.query(`
    SELECT COUNT(*) AS count
    FROM appointments
    `) as any;
    return result[0].count;
}

export async function getAppointmentDetailsInfoById(id: string) {
    const [result] = await db.query(`
    SELECT * FROM appointments
    LEFT JOIN appointment_details ON appointments.id = appointment_details.appointment_id
    LEFT JOIN medical_records ON appointments.id = medical_records.appointment_id
    WHERE appointments.id = ?
    `, [id]) as any;

    const response = result.map((res: any) => {
        const medicalRecordInfo = (res.height && res.weight && res.blood_pressure) ?
            { height: parseInt(res.height), weight: parseInt(res.weight), bloodPressure: res.blood_pressure } : null;

        return {
            condition: res.condition,
            prescription: res.prescription,
            notes: res.notes,
            medicalRecordInfo: medicalRecordInfo
        };
    });

    // Check if there's no data in the response, return null
    if (response.length === 0) {
        return null;
    }

    // Check if there's no medical record info and no appointment details, return null
    const hasAppointmentDetails = response.some((res: any) => res.condition !== null);
    const hasMedicalRecordInfo = response.some((res: any) => res.medicalRecordInfo !== null);
    if (!hasAppointmentDetails && !hasMedicalRecordInfo) {
        return null;
    }

    // If there's appointment details but no medical record info, set medicalRecordInfo to null
    if (hasAppointmentDetails && !hasMedicalRecordInfo) {
        response.forEach((res: any) => {
            res.medicalRecordInfo = null;
        });
    }

    const appointmentInfo = {
        medicalRecordInfo: response[0].medicalRecordInfo,
        appointmentDetails: response.map((res: any) => ({
            condition: res.condition,
            prescription: res.prescription,
            notes: res.notes
        }))
    };

    return appointmentInfo;

}