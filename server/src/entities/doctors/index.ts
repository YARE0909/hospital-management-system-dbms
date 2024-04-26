import { SQLQueryResult, Doctor } from "#src/types/index.js";
import { db } from "../../sql/index.js";

export async function getDoctorByEmail(email: string) {
    const [result] = await db.query<SQLQueryResult<Doctor[]>>("SELECT * FROM doctors WHERE email = ? LIMIT 1", [email]);
    const doctorInfo = result.map((res) => ({
        id: res.id,
        firstName: res.first_name,
        lastName: res.last_name,
        dateOfBirth: res.date_of_birth,
        gender: res.gender,
        mobileNo: res.mobile_no,
        email: res.email,
        specialization: res.specialization,
        password: res.password,
    }));

    return doctorInfo[0];
}

export async function getDoctors() {
    const [result] = await db.query(`
    SELECT 
        *,
        specializations.name AS specialization_name,
        departments.name AS department_name
    FROM doctors
    INNER JOIN specializations ON doctors.specialization_id = specializations.id
    INNER JOIN departments ON specializations.department_id = departments.id
    `) as any;
    const doctors = result.map((res: any) => ({
        id: res.id,
        firstName: res.first_name,
        lastName: res.last_name,
        dateOfBirth: res.date_of_birth,
        gender: res.gender,
        mobileNo: res.mobile_no,
        email: res.email,
        specialization: res.specialization_name,
        departmentName: res.department_name,
    }));

    return doctors;
}

export async function getDoctorCount() {
    const [result] = await db.query("SELECT COUNT(*) as doctorCount FROM doctors") as any;
    return result[0].doctorCount;
}

export async function getDoctorById(id: string) {
    const [result] = await db.query(`
        SELECT
            doctors.first_name AS first_name,
            doctors.last_name AS last_name,
            doctors.date_of_birth AS date_of_birth,
            doctors.email AS email,
            doctors.mobile_no AS mobile_no,
            doctors.gender AS gender,
            departments.name AS department_name,
            appointments.id AS appointment_id,
            appointments.appointment_date AS appointment_date,
            appointments.status AS appointment_status,
            appointments.type AS appointment_type,
            appointments.created_at AS appointment_created_at,
            patients.first_name AS patient_first_name,
            patients.last_name AS patient_last_name,
            departments.name AS department_name
        FROM doctors
        LEFT JOIN appointments ON doctors.id = appointments.doctor_id
        LEFT JOIN patients ON appointments.patient_id = patients.id
        LEFT JOIN specializations ON doctors.specialization_id = specializations.id
        LEFT JOIN departments ON specializations.department_id = departments.id
        WHERE doctors.id = ?
        ORDER BY appointments.appointment_date ASC
    `, [id]) as any;

    if (!result?.length) {
        return null;
    };

    const response = {
        doctorInfo: {
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            dateOfBirth: result[0].date_of_birth,
            email: result[0].email,
            mobileNo: result[0].mobile_no,
            gender: result[0].gender,
            departmentName: result[0].department_name,
            specialization: result[0].specialization,
        },
        appointments: result.map((res: any) => {
            if (!res.appointment_id) return null;
            else return {
                appointmentDate: res.appointment_date,
                appointmentStatus: res.appointment_status,
                appointmentType: res.appointment_type,
                appointmentCreatedAt: res.appointment_created_at,
                patientFirstName: res.patient_first_name,
                patientLastName: res.patient_last_name,
            };
        }).filter((res: any) => res !== null),
    }

    return response;
}

export async function createDoctor(data: any) {
    const { firstName, lastName, dateOfBirth, email, mobileNo, gender, password, specializationId } = data;
    await db.query("INSERT INTO doctors VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())", [firstName, lastName, dateOfBirth, gender, mobileNo, email, password, specializationId]);
}