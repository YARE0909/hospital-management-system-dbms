import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorInfo from "./DoctorInfo";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { server } from "@/lib/api/server";
import { Badge } from "@/components/ui/badge";
import DoctorListType from "@/lib/types/DoctorListType";

export function DoctorListTable({
  doctorList,
}: {
  doctorList: DoctorListType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorData, setDoctorData] = useState<any>(doctorList);

  const fetchDoctorData = async (doctorId: string) => {
    try {
      const response = await server.post(`/doctors/info`, {
        doctorId,
      });
      setDoctorData(response.data.data);
      setIsOpen(true);
    } catch (error) {
      toast({
        title: "Failed to fetch doctor data",
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
            <TableHead>Specialization</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctorList?.length !== 0 ? (
            doctorList?.map((doctor) => (
              <TableRow
                onClick={() => {
                  fetchDoctorData(doctor.id);
                }}
                className="cursor-pointer"
                key={doctor.id}
              >
                <TableCell className="font-bold">
                  {doctor.firstName} {doctor.lastName}
                </TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      doctor.gender === "male"
                        ? "text-blue-500 font-bold pb-1"
                        : "text-pink-500 font-bold pb-1"
                    }
                  >
                    {doctor.gender.slice(0, 1).toUpperCase() +
                      doctor.gender.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{doctor.mobileNo}</TableCell>
                <TableCell>
                  {doctor.specialization.slice(0, 1).toUpperCase() +
                    doctor.specialization.slice(1)}
                </TableCell>
                <TableCell>
                  {doctor.departmentName.slice(0, 1).toUpperCase() +
                    doctor.departmentName.slice(1)}
                </TableCell>
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
      <DoctorInfo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        doctorData={doctorData}
      />
    </div>
  );
}
