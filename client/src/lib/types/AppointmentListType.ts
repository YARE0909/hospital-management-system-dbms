export default interface AppointmentListType {
  patientFirstName: string;
  patientLastName: string;
  appointmentType: "checkUp" | "routine" | "followUp";
  appointmentStatus: "completed" | "pending" | "cancelled" | "noShow";
  appointmentDate: string;
  doctorFirstName: string;
  doctorLastName: string;
  appointmentId: string;
}
