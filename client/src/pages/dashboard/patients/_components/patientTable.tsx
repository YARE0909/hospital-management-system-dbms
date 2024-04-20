import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PatientListType from "@/lib/types/PatientListType";
import PatientInfo from "./PatientInfo";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { server } from "@/lib/api/server";

export function PatientListTable({
  patientList,
}: {
  patientList: PatientListType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [patientData, setPatientData] = useState<any>(patientList);

  const fetchPatientData = async (patientId: string) => {
    try {
      const response = await server.post(`/patients/info`, {
        patientId,
      });
      setPatientData(response.data.data);
      setIsOpen(true);
    } catch (error) {
      toast({
        title: "Failed to fetch patient data",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
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
              <TableRow
                onClick={() => {
                  fetchPatientData(patient.id);
                }}
                className="cursor-pointer"
                key={patient.id}
              >
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
      <PatientInfo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        patientData={patientData}
      />
    </div>
  );
}
