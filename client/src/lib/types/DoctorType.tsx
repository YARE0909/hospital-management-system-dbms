export default interface DoctorType {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Assuming you'll handle date parsing separately
  gender: string; // Could use an enum if there are limited options
  mobileNo: string;
  email: string;
  specialization: string; // Assuming specialization can be a string for simplicity
}