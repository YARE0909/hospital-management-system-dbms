import { Doctor } from "#src/types/index.js";
import { db } from "../../sql/index.js";

export async function getDoctorByEmail(email: string) {
    const [result] = await db.query("SELECT * FROM doctors WHERE email = ? LIMIT 1", [email]) as unknown as Doctor[][];
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
    const [result] = await db.query("SELECT * FROM doctors") as unknown as Doctor[][];
    const doctors = result.map((res) => ({
        id: res.id,
        firstName: res.first_name,
        lastName: res.last_name,
        dateOfBirth: res.date_of_birth,
        gender: res.gender,
        mobileNo: res.mobile_no,
        email: res.email,
        specialization: res.specialization,
    }));

    return doctors;
}

export async function getDoctorCount() {
    const [result] = await db.query("SELECT COUNT(*) as doctorCount FROM doctors") as any;
    return result[0].doctorCount;
}