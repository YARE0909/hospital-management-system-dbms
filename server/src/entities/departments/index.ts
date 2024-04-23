import { db } from "../../sql/index.js";

export async function getDepartments() {
    const [result] = await db.query("SELECT * FROM departments") as any;

    const response = result.map((res: any) => ({
        departmentId: res.id,
        departmentName: res.name,
    }));

    return response;
}