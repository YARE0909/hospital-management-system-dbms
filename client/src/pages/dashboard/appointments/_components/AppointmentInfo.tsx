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
import { toast } from "@/components/ui/use-toast";
import { server } from "@/lib/api/server";
import { PatientData } from "@/lib/types/PatientInfoTypes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AtSign,
  Cake,
  CircleGauge,
  CirclePlus,
  Dna,
  Phone,
  Ruler,
  UserRound,
  Weight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AppointmentInfoType from "@/lib/types/AppointmentInfoType";
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
  console.log({ appointmentData });
  return (
    <Drawer open={isOpen} onDrag={() => setIsOpen(false)}>
      <DrawerContent className="h-fit max-h-screen">
        <div className="px-4 w-full overflow-auto">
          <DrawerHeader>
            <DrawerTitle>Patient Record</DrawerTitle>
            <DrawerDescription>
              View patient details and medical records
            </DrawerDescription>
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
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">Appointment Details</h1>
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className={
                        // appointment.appointmentStatus === "pending"
                        //   ? "text-orange-500 font-bold pb-1"
                        //   : appointment.appointmentStatus === "cancelled"
                        //   ? "text-red-500 font-bold pb-1"
                        //   : appointment.appointmentStatus === "noShow"
                        //   ? "text-purple-500 font-bold pb-1"
                        //   : "text-green-500 font-bold pb-1"
                        "text-orange-500"
                      }
                    >
                      Pending
                      {/* {appointment.appointmentStatus.slice(0, 1).toUpperCase() +
                        appointment.appointmentStatus.slice(1)} */}
                    </Badge>
                  </div>
                </div>
                <div>
                  <RegisterDiagnosis />
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                {appointmentData?.appointmentDetails?.length !== 0 ? (
                  appointmentData?.appointmentDetails?.map((appointment) => (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full max-w-56 border-b-0"
                      key={appointment.condition}
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <h1 className="font-medium">25-02-24</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Card className="w-fit">
                            <CardHeader>
                              <div className="flex flex-col gap-2">
                                <div>
                                  <h1 className="text-sm font-bold text-muted-foreground">
                                    Condition
                                  </h1>
                                  <h1 className="font-bold">
                                    {appointment.condition}
                                  </h1>
                                </div>
                                <div>
                                  <h1 className="text-sm font-bold text-muted-foreground">
                                    Prescription
                                  </h1>
                                  <h1 className="font-bold">
                                    {appointment.prescription}
                                  </h1>
                                </div>
                                <div>
                                  <h1 className="text-sm font-bold text-muted-foreground">
                                    Notes
                                  </h1>
                                  <h1 className="font-bold">
                                    {appointment.notes || "None"}
                                  </h1>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))
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
