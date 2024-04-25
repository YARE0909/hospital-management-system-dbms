import { db } from "../../sql/index.js";

export async function getSpecializations() {
    const [result] = await db.query("SELECT * FROM specializations") as any;

    const response = result.map((res: any) => ({
        specializationId: res.id,
        specializationName: res.name,
    }));

    return response;
}