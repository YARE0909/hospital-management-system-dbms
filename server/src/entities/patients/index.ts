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