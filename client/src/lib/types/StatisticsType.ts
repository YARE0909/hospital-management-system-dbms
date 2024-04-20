export interface StatisticsType {
  doctorCount: number;
  patientCount: number;
  appointmentCount: number;
  genderRatio: {
    maleCount: number;
    femaleCount: number;
  };
  patientsPerDay: {
    date: string;
    count: number;
  }[];
}
