import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  AtSign,
  Cake,
  CircleGauge,
  Dna,
  Dot,
  Phone,
  Ruler,
  UserRound,
  Weight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AppointmentInfoType, {
  AppointmentDetails,
} from "@/lib/types/AppointmentInfoType";
import RegisterDiagnosis from "./RegisterDiagnosis";

export default function AppointmentInfo({
  appointmentData,
  isOpen,
  setIsOpen,
}: {
  appointmentData: AppointmentInfoType;
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <Drawer open={isOpen} onDrag={() => setIsOpen(false)}>
      <DrawerContent className="h-fit max-h-screen">
        <div className="px-4 w-full overflow-auto">
          <DrawerHeader>
            <DrawerTitle>Appointment</DrawerTitle>
            <DrawerDescription>View appointment details</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col lg:flex lg:flex-row justify-between gap-5 overflow-auto h-full">
            <div className="flex flex-col gap-5 w-full lg:w-1/4 border-r-0 lg:border-r">
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Patient Details</h1>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <UserRound color="#A3A3A3" className="w-4 h-4" />
                    <h1>
                      {appointmentData?.patientInfo?.firstName}{" "}
                      {appointmentData?.patientInfo?.lastName}
                    </h1>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Cake color="#A3A3A3" className="w-4 h-4" />
                      <h1>
                        {new Date(
                          appointmentData?.patientInfo?.dateOfBirth
                        ).toDateString()}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <AtSign color="#A3A3A3" className="w-4 h-4" />
                      <h1>{appointmentData?.patientInfo?.email}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dna color="#A3A3A3" className="w-4 h-4" />
                    <h1>
                      {appointmentData?.patientInfo?.gender
                        .split("")[0]
                        .toUpperCase() +
                        appointmentData?.patientInfo?.gender.slice(1)}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone color="#A3A3A3" className="w-4 h-4" />
                    <h1>{appointmentData?.patientInfo?.mobileNo}</h1>
                  </div>
                </div>
              </div>
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Medical Record</h1>
                </div>
                {appointmentData.medicalRecordInfo ? (
                  <div>
                    <div className="flex gap-2 text-sm items-center">
                      <Ruler color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {appointmentData?.medicalRecordInfo?.height}
                        <span className="font-bold text-muted-foreground text-xs">
                          m
                        </span>
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                      <Weight color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {appointmentData?.medicalRecordInfo?.weight}
                        <span className="font-bold text-muted-foreground text-xs">
                          kg
                        </span>
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                      <CircleGauge color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {appointmentData?.medicalRecordInfo?.bloodPressure}
                        <span className="font-bold text-muted-foreground text-xs">
                          mmHg
                        </span>
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1>No medical records found.</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-3/4 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div>
                  <h1 className="text-2xl font-bold">Appointment Details</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <div>
                    <div className="flex">
                      <h1 className="font-medium text-sm text-muted-foreground">
                        {new Date(
                          appointmentData?.appointmentInfo?.appointmentCreatedAt
                        ).toDateString()}
                      </h1>
                      <div>
                        <Dot color="#9EA3A3" />
                      </div>
                      <div>
                        <h1 className="font-medium text-sm text-muted-foreground">
                          Dr. {appointmentData?.doctorInfo?.firstName}{" "}
                          {appointmentData?.doctorInfo?.lastName}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className={
                        appointmentData?.appointmentInfo?.appointmentStatus ===
                        "pending"
                          ? "text-orange-500 font-bold pb-1"
                          : appointmentData?.appointmentInfo
                              ?.appointmentStatus === "cancelled"
                          ? "text-red-500 font-bold pb-1"
                          : appointmentData?.appointmentInfo
                              ?.appointmentStatus === "noShow"
                          ? "text-purple-500 font-bold pb-1"
                          : "text-green-500 font-bold pb-1"
                      }
                    >
                      {appointmentData?.appointmentInfo?.appointmentStatus
                        .slice(0, 1)
                        .toUpperCase() +
                        appointmentData?.appointmentInfo?.appointmentStatus.slice(
                          1
                        )}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col lg:flex lg:flex-row gap-5 justify-between lg:items-center">
                <div>
                  <h1 className="font-medium">Diagnosis Information</h1>
                </div>
                <div>
                  <RegisterDiagnosis />
                </div>
              </div>
              <div className="w-full flex flex-wrap gap-5">
                {appointmentData?.appointmentDetails?.length !== 0 ? (
                  appointmentData?.appointmentDetails?.map(
                    (appointment: AppointmentDetails) => (
                      <Table key={appointment?.condition}>
                        <TableHeader>
                          <TableRow>
                            <TableCell>Condition</TableCell>
                            <TableCell>Prescription</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Created At</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{appointment?.condition}</TableCell>
                            <TableCell>{appointment?.prescription}</TableCell>
                            <TableCell>
                              {appointment.notes ? appointment.notes : "N/A"}
                            </TableCell>
                            <TableCell>
                              {new Date(appointment.createdAt).toDateString()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    )
                  )
                ) : (
                  <div>
                    <h1>No appointment details found.</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
              Close
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
