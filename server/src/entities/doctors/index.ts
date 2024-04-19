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