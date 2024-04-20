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

export default function PatientInfo({
  patientData,
  isOpen,
  setIsOpen,
}: {
  patientData: PatientData;
  isOpen: boolean;
  setIsOpen: any;
}) {
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
                      {patientData?.patientInfo?.firstName}{" "}
                      {patientData?.patientInfo?.lastName}
                    </h1>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Cake color="#A3A3A3" className="w-4 h-4" />
                      <h1>
                        {new Date(
                          patientData?.patientInfo?.dateOfBirth
                        ).toDateString()}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <AtSign color="#A3A3A3" className="w-4 h-4" />
                      <h1>{patientData?.patientInfo?.email}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dna color="#A3A3A3" className="w-4 h-4" />
                    <h1>
                      {patientData?.patientInfo?.gender
                        .split("")[0]
                        .toUpperCase() +
                        patientData?.patientInfo?.gender.slice(1)}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone color="#A3A3A3" className="w-4 h-4" />
                    <h1>{patientData?.patientInfo?.mobileNo}</h1>
                  </div>
                </div>
              </div>
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Medical Record</h1>
                </div>
                {patientData?.latestMedicalRecordInfo ? (
                  <div>
                    <div className="flex gap-2 text-sm items-center">
                      <Ruler color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {patientData?.latestMedicalRecordInfo?.height}
                        <span className="font-bold text-muted-foreground text-xs">
                          m
                        </span>
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                      <Weight color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {patientData?.latestMedicalRecordInfo?.weight}
                        <span className="font-bold text-muted-foreground text-xs">
                          kg
                        </span>
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                      <CircleGauge color="#A3A3A3" className="w-4 h-4" />
                      <h1 className="text-2xl flex gap-1 items-center">
                        {patientData?.latestMedicalRecordInfo?.bloodPressure}
                        <span className="font-bold text-muted-foreground text-xs">
                          mmHg
                        </span>
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-muted-foreground">
                      No medical history found.
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-3/4 flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold">Appointment Details</h1>
              </div>
              <div className="flex flex-col md:flex md:flex-wrap md:flex-row gap-2">
                {patientData?.appointments?.length !== 0 ? (
                  patientData?.appointments?.map((appointment) => (
                    <div key={appointment.appointmentId}>
                      <Card className="space-y-0 min-w-64">
                        <CardHeader className="space-y-0">
                          <div>
                            <h1 className="font-medium">
                              {new Date(
                                appointment?.appointmentDate
                              ).toDateString()}
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-sm font-bold text-muted-foreground">
                              Dr. {appointment?.doctorInfo?.firstName}{" "}
                              {appointment?.doctorInfo?.lastName}
                            </h1>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-5 mt-2">
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full border-b-0"
                            >
                              <AccordionItem value="item-1">
                                <AccordionTrigger>
                                  <h1 className="font-medium">
                                    {appointment?.appointmentType === "checkUp"
                                      ? "Check Up"
                                      : appointment?.appointmentType ===
                                        "followUp"
                                      ? "Follow Up"
                                      : "Routine"}
                                  </h1>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableCell>Condition</TableCell>
                                        <TableCell>Prescription</TableCell>
                                        <TableCell>Notes</TableCell>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {appointment?.appointmentDetails?.map(
                                        (detail) => (
                                          <TableRow key={detail.condition}>
                                            <TableCell>
                                              {detail?.condition}
                                            </TableCell>
                                            <TableCell>
                                              {detail?.prescription}
                                            </TableCell>
                                            <TableCell>
                                              {detail?.notes || "None"}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1 className="text-muted-foreground">
                      No appointments found.
                    </h1>
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
