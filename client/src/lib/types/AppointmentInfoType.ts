interface MedicalRecordInfo {
  height: number;
  weight: number;
  bloodPressure: number;
}

interface DoctorInfo {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobileNo: string;
}

interface PatientInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  mobileNo: string;
}

export interface AppointmentDetails {
  condition: string;
  prescription: string;
  notes: null | string;
  createdAt: string;
}

export default interface AppointmentInfoType {
  appointmentInfo: {
    appointmentId: string;
    appointmentDate: string;
    appointmentCreatedAt: string;
    appointmentStatus: "pending" | "cancelled" | "noShow" | "completed";
    appointmentType: string;
  };
  medicalRecordInfo: MedicalRecordInfo;
  doctorInfo: DoctorInfo;
  patientInfo: PatientInfo;
  appointmentDetails: AppointmentDetails[];
}
