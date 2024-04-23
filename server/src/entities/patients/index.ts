import { Patient } from "#src/types/index.js";
import { db } from "../../sql/index.js";
import { _formatData } from "./_utils.js";

export async function getPatients() {
    const [result] = await db.query("SELECT * FROM patients") as any;
    const patients = result.map((res: any) => ({
        id: res.id,
        firstName: res.first_name,
        lastName: res.last_name,
        gender: res.gender === "male" ? "Male" : "Female",
        mobileNo: res.mobile_no,
        email: res.email,
    }))
    return patients;
}

export async function registerPatient(dataToInsert: Patient) {
    const { firstName, lastName, dateOfBirth, gender, mobileNo, email, password } = dataToInsert;
    await db.query("INSERT INTO patients(first_name, last_name, date_of_birth, gender, mobile_no, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [firstName, lastName, dateOfBirth, gender, mobileNo, email, password])
}

export async function getPatientByEmail(email: string) {
    const [result] = await db.query("SELECT * FROM patients WHERE email = ? LIMIT 1", [email]) as any;
    if (result.length === 0) {
        return null;
    }

    const patientInfo = {
        id: result[0].id,
        firstName: result[0].first_name,
        lastName: result[0].last_name,
        dateOfBirth: result[0].date_of_birth,
        gender: result[0].gender,
        mobileNo: result[0].mobile_no,
        email: result[0].email,
        password: result[0].password,
    }

    return patientInfo;
}

export async function getPatientById(id: string) {
    const [rows] = await db.query(
        `SELECT
            patients.id AS patientId,
            patients.first_name AS firstName,
            patients.last_name AS lastName,
            patients.date_of_birth AS dateOfBirth,
            patients.gender AS gender,
            patients.email AS email,
            patients.mobile_no AS mobileNo,
            appointments.id AS appointmentId,
            appointments.appointment_date AS appointmentDate,
            appointments.status AS appointmentStatus,
            appointments.type AS appointmentType,
            appointment_details.\`condition\` AS \`condition\`,
            appointment_details.prescription AS prescription,
            appointment_details.notes AS notes,
            medical_records.height AS height,
            medical_records.weight AS weight,
            medical_records.blood_pressure AS bloodPressure,
            doctors.first_name AS doctorFirstName,
            doctors.last_name AS doctorLastName,
            doctors.gender AS doctorGender,
            doctors.mobile_no AS doctorMobileNo,
            doctors.email AS doctorEmail
        FROM patients
        LEFT JOIN appointments ON patients.id = appointments.patient_id
        LEFT JOIN appointment_details ON appointments.id = appointment_details.appointment_id
        LEFT JOIN medical_records ON appointments.id = medical_records.appointment_id
        LEFT JOIN doctors ON appointments.doctor_id = doctors.id
        WHERE patients.id = ?`
        , [id]) as any;

    if (rows.length === 0) {
        return null;
    }
    return _formatData(rows);
}

export async function getGenderRatio() {
    const [result] = await db.query(`
    SELECT 
        SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) AS maleCount,
        SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) AS femaleCount
    FROM patients
    `) as any;
    return result[0];
}

export async function getPatientCount() {
    const [result] = await db.query("SELECT COUNT(*) as patientCount FROM patients") as any;
    return result[0].patientCount;
}