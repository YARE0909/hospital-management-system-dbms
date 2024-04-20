export interface PatientInfo {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobileNo: string;
}

export interface AppointmentDetails {
  condition: string | null;
  prescription: string | null;
  notes: string | null;
}

export interface MedicalRecordInfo {
  height: number | null;
  weight: number | null;
  bloodPressure: string | null;
}

export interface DoctorInfo {
  firstName: string;
  lastName: string;
  gender: string;
  mobileNo: string;
  email: string;
}

export interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentStatus: string;
  appointmentType: string;
  appointmentDetails: AppointmentDetails[];
  medicalRecordInfo: MedicalRecordInfo;
  doctorInfo: DoctorInfo;
}

export interface PatientData {
  patientInfo: PatientInfo;
  appointments: Appointment[];
}
