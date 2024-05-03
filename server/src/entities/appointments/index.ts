import { db } from "../../sql/index.js";

export async function createAppointment(dataToInsert: any) {
  const { patientId, doctorId, appointmentDate, status, type } = dataToInsert;
  await db.query(
    "INSERT INTO appointments(patient_id, doctor_id, appointment_date, status, type) VALUES (?, ?, ?, ?, ?)",
    [patientId, doctorId, appointmentDate, status, type]
  );
  const [result] = (await db.query(
    "SELECT id FROM appointments ORDER BY created_at DESC"
  )) as any;
  return result[0].id;
}

export async function getAppointmentsList() {
  const [result] = (await db.query(`
    SELECT *,
        appointments.id AS app_id,
        patients.first_name AS first_name,
        patients.last_name AS last_name,
        patients.gender AS gender,
        doctors.first_name AS doctor_first_name,
        doctors.last_name AS doctor_last_name
    FROM appointments
    INNER JOIN patients ON appointments.patient_id = patients.id
    INNER JOIN doctors ON appointments.doctor_id = doctors.id
    ORDER BY appointment_date ASC
    `)) as any;
  const response = result.map((res: any) => ({
    appointmentId: res.app_id,
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
  const [result] = (await db.query(`
    SELECT 
        DATE_FORMAT(appointment_date, '%Y-%m-%d') AS date,
        COUNT(*) AS count
    FROM appointments
    GROUP BY date
    ORDER BY DATE_FORMAT(appointment_date, '%Y-%m-%d') ASC
    `)) as any;
  const response = result.map((res: any) => ({
    date: res.date,
    count: res.count,
  }));

  return response;
}

export async function getAppointmentCount() {
  const [result] = (await db.query(`
    SELECT COUNT(*) AS count
    FROM appointments
    `)) as any;
  return result[0].count;
}

export async function getAppointmentInfo(id: string) {
  const [result] = (await db.query(
    `
    SELECT *,
        appointments.id AS app_id,
        appointments.created_at AS app_created_at,
        appointment_details.created_at AS appointment_details_created_at,
        patients.first_name AS first_name,
        patients.last_name AS last_name,
        patients.gender AS gender,
        patients.email AS email,
        patients.mobile_no AS mobile_no,
        patients.date_of_birth AS date_of_birth,
        doctors.first_name AS doctor_first_name,
        doctors.last_name AS doctor_last_name,
        doctors.gender AS doctor_gender,
        doctors.email AS doctor_email,
        doctors.mobile_no AS doctor_mobile_no
    FROM appointments
    LEFT JOIN patients ON appointments.patient_id = patients.id
    LEFT JOIN doctors ON appointments.doctor_id = doctors.id
    LEFT JOIN appointment_details ON appointments.id = appointment_details.appointment_id
    LEFT JOIN medical_records ON appointments.id = medical_records.appointment_id
    WHERE appointments.id = ?
    `,
    [id]
  )) as any;

  const response = result.map((res: any) => {
    const medicalRecordInfo =
      res.height && res.weight && res.blood_pressure
        ? {
            height: parseInt(res.height),
            weight: parseInt(res.weight),
            bloodPressure: res.blood_pressure,
          }
        : null;

    return {
      condition: res.condition,
      prescription: res.prescription,
      notes: res.notes,
      createdAt: res.appointment_details_created_at,
      medicalRecordInfo: medicalRecordInfo,
    };
  });

  // Check if there's no data in the response, return null
  if (response.length === 0) {
    return null;
  }

  // If there's no appointment details, set it to an empty array
  const appointmentDetails = response.map((res: any) => ({
    condition: res.condition,
    prescription: res.prescription,
    notes: res.notes,
    createdAt: res.createdAt,
  }));

  const hasAppointmentDetails = appointmentDetails.some((detail: any) => {
    return (
      detail.condition !== null ||
      detail.prescription !== null ||
      detail.notes !== null
    );
  });

  const responseToSend = {
    appointmentInfo: {
      appointmentId: result[0].app_id,
      appointmentDate: result[0].appointment_date,
      appointmentCreatedAt: result[0].app_created_at,
      appointmentStatus: result[0].status,
      appointmentType: result[0].type,
    },
    medicalRecordInfo: response[0].medicalRecordInfo,
    doctorInfo: {
      firstName: result[0].doctor_first_name,
      lastName: result[0].doctor_last_name,
      gender: result[0].doctor_gender,
      email: result[0].doctor_email,
      mobileNo: result[0].doctor_mobile_no,
    },
    patientInfo: {
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      gender: result[0].gender,
      dateOfBirth: result[0].date_of_birth,
      email: result[0].email,
      mobileNo: result[0].mobile_no,
    },
    appointmentDetails: hasAppointmentDetails ? appointmentDetails : [],
  };

  return responseToSend;
}
