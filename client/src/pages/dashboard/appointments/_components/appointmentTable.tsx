import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AppointmentListType from "@/lib/types/AppointmentListType";
import { Badge } from "@/components/ui/badge";

export function AppointmentListTable({
  appointmentList,
}: {
  appointmentList: AppointmentListType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled On</TableHead>
            <TableHead>Doctor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentList?.length !== 0 ? (
            appointmentList?.map((appointment) => (
              <TableRow key={appointment.appointmentDate}>
                <TableCell className="font-medium">
                  {appointment.patientFirstName} {appointment.patientLastName}
                </TableCell>
                <TableCell>{appointment.appointmentType}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      appointment.appointmentStatus === "pending"
                        ? "text-orange-500 font-bold pb-1"
                        : appointment.appointmentStatus === "cancelled"
                        ? "text-red-500 font-bold pb-1"
                        : appointment.appointmentStatus === "checkUp"
                        ? "text-blue-500 font-bold pb-1"
                        : appointment.appointmentStatus === "noShow"
                        ? "text-purple-500 font-bold pb-1"
                        : "text-green-500 font-bold pb-1"
                    }
                  >
                    {appointment.appointmentStatus.slice(0, 1).toUpperCase() +
                      appointment.appointmentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(appointment.appointmentDate).toDateString()}
                </TableCell>
                <TableCell>
                  Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
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
    </div>
  );
}
