import { server } from "@/lib/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegisterPatient } from "./_components/RegisterPatient";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  mobileNo: string;
  email: string;
}

async function getPatientList() {
  const patientListResponse = await server.get("/patients/get");

  return patientListResponse.data.data.patients;
}

export default async function Page() {
  const patients: Patient[] = await getPatientList();

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Patients</h1>
        </div>
        <div>
          <RegisterPatient />
        </div>
      </div>
      <div className="w-full px-0 lg:px-10">
        <Table>
          <TableCaption>A list of all patients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow className="cursor-pointer" key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell className="text-right">{patient.mobileNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
