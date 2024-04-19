import { QueryUtils } from "#src/frameworks/utils/index.js";
import { db } from "../../sql/index.js";

export async function bulkCreateAppointmentDetails(appointmentDetails: any) {
    const { query, values } = QueryUtils.generateBulkInsertQuery("appointment_details", appointmentDetails);
    await db.query(query, values);
}