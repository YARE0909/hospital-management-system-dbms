export function _formatData(rows: any[]) {
    const appointmentsMap = new Map();

    rows.forEach((row) => {
        const { appointmentId, appointmentDate, appointmentStatus, appointmentType, condition, prescription, notes, height, weight, bloodPressure, doctorFirstName, doctorLastName, doctorGender, doctorMobileNo, doctorEmail } = row;

        if (appointmentId) {
            if (!appointmentsMap.has(appointmentId)) {
                appointmentsMap.set(appointmentId, {
                    appointmentId,
                    appointmentDate,
                    appointmentStatus,
                    appointmentType,
                    appointmentDetails: [],
                    medicalRecordInfo: null,
                    doctorInfo: {
                        firstName: doctorFirstName || null,
                        lastName: doctorLastName || null,
                        gender: doctorGender || null,
                        mobileNo: doctorMobileNo || null,
                        email: doctorEmail || null
                    }
                });
            }

            const appointment = appointmentsMap.get(appointmentId);
            if (condition !== null) {
                appointment.appointmentDetails.push({
                    condition: condition || null,
                    prescription: prescription || null,
                    notes: notes || null
                });
            }

            if (height && weight && bloodPressure) {
                appointment.medicalRecordInfo = {
                    height: parseFloat(height),
                    weight: parseFloat(weight),
                    bloodPressure
                };
            }

            appointmentsMap.set(appointmentId, appointment);
        }
    });

    const appointments = Array.from(appointmentsMap.values());

    return {
        patientInfo: {
            patientId: rows[0].patientId,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            dateOfBirth: rows[0].dateOfBirth,
            gender: rows[0].gender,
            email: rows[0].email,
            mobileNo: rows[0].mobileNo,
        },
        appointments,
        latestMedicalRecordInfo: appointments.length ? appointments?.[appointments?.length - 1]?.medicalRecordInfo : null
    };
}