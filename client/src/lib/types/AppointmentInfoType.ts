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

interface AppointmentDetails {
  condition: string;
  prescription: string;
  notes: null | string;
}

export default interface AppointmentInfoType {
  medicalRecordInfo: MedicalRecordInfo;
  doctorInfo: DoctorInfo;
  patientInfo: PatientInfo;
  appointmentDetails: AppointmentDetails[];
}
