# Table Schema

### Patients
- PatientID (Primary Key)
- FirstName
- LastName
- DateOfBirth
- Gender
- Address
- ContactNumber

### Doctors
- DoctorID (Primary Key)
- FirstName
- LastName
- DateOfBirth
- Gender
- ContactNumber
- DepartmentID (Foreign Key)
- Specialization

### Appointments
- AppointmentID (Primary Key)
- PatientID (Foreign Key)
- DoctorID (Foreign Key)
- AppointmentDateTime
- Status (completed, pending, cancelled, noShow)
- Type (checkup, routine, followUp)

### AppointmentDetails
- AppointmentDetailID (Primary Key)
- AppointmentID (Foreign Key)
- Condition (Ex: Hypertension, Diabetes)
- Prescription
- Notes
- CreatedAt
- UpdatedAt

### Departments
- DepartmentID (Primary Key)
- DepartmentName
- CreatedAt
- UpdatedAt