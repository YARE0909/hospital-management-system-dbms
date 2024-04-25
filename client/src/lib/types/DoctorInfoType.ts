interface DoctorInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobileNo: string;
  gender: string;
  specialization: string;
}

interface Appointment {
  appointmentDate: string;
  appointmentStatus: string;
  appointmentType: string;
  appointmentCreatedAt: string;
  patientFirstName: string;
  patientLastName: string;
}

export default interface DoctorInfoType {
  doctorInfo: DoctorInfo;
  appointments: Appointment[];
}
