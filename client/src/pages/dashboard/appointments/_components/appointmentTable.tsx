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
import AppointmentInfo from "./AppointmentInfo";
import { toast } from "@/components/ui/use-toast";
import { server } from "@/lib/api/server";

export function AppointmentListTable({
  appointmentList,
}: {
  appointmentList: AppointmentListType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(appointmentList);

  const fetchAppointmentData = async (appointmentId: string) => {
    try {
      const response = await server.post(`/appointments/info`, {
        appointmentId,
      });
      setAppointmentData(response.data.data);
      setIsOpen(true);
    } catch (error) {
      toast({
        title: "Failed to fetch appointment data",
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
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled On</TableHead>
            <TableHead>Doctor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentList?.length !== 0 ? (
            appointmentList?.map((appointment) => (
              <TableRow
                onClick={() => {
                  fetchAppointmentData(appointment.appointmentId);
                }}
                className="cursor-pointer"
                key={appointment.appointmentDate}
              >
                <TableCell className="font-bold">
                  {appointment.patientFirstName} {appointment.patientLastName}
                </TableCell>
                <TableCell>
                  {appointment.appointmentType === "checkUp"
                    ? "Check Up"
                    : appointment.appointmentType === "followUp"
                    ? "Follow Up"
                    : "Routine"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      appointment.appointmentStatus === "pending"
                        ? "text-orange-500 font-bold pb-1"
                        : appointment.appointmentStatus === "cancelled"
                        ? "text-red-500 font-bold pb-1"
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
      <AppointmentInfo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        appointmentData={appointmentData}
      />
    </div>
  );
}
