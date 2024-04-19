import { Patient } from "#src/types/index.js";
import { db } from "../../sql/index.js";

export async function getPatients() {
    const [result] = await db.query("SELECT * FROM patients") as unknown as Patient[][];
    const patients = result.map((res) => ({
        id: res.id,
        firstName: res.first_name,
        lastName: res.last_name,
        dateOfBirth: res.date_of_birth,
        gender: res.gender,
        mobileNo: res.mobile_no,
        email: res.email,
    }))
    return patients;
}

export async function registerPatient(dataToInsert: { firstName: string, lastName: string | null, dateOfBirth: Date, gender: string, mobileNo: string, email: string, password: string }) {
    const { firstName, lastName, dateOfBirth, gender, mobileNo, email, password } = dataToInsert;
    await db.query("INSERT INTO patients(first_name, last_name, date_of_birth, gender, mobile_no, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [firstName, lastName, dateOfBirth, gender, mobileNo, email, password])
}

export async function getPatientByEmail(email: string) {
    const [result] = await db.query("SELECT * FROM patients WHERE email = ? LIMIT 1", [email]) as unknown as Patient[][];
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