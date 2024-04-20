import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PatientListType from "@/lib/types/PatientListType";

export function PatientListTable({
  patientList,
}: {
  patientList: PatientListType[];
}) {
  console.log({ patientList });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Mobile Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patientList?.length !== 0 ? (
          patientList?.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">
                {patient.firstName} {patient.lastName}
              </TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.mobileNo}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No patients found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
