import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
  Droplet,
  Phone,
  Ruler,
  UserRound,
  Weight,
} from "lucide-react";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

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
    <Drawer open={isOpen}>
      <DrawerContent className="h-fit max-h-screen">
        <div className="px-4 w-full overflow-auto">
          <DrawerHeader>
            <DrawerTitle>Patient Record</DrawerTitle>
            <DrawerDescription>
              View patient details and medical records
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col lg:flex lg:flex-row justify-between gap-5 overflow-auto h-full">
            <div className="flex flex-col gap-5">
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Patient Details</h1>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <UserRound className="w-4 h-4" />
                    <h1 className="font-medium">
                      {patientData?.patientInfo?.firstName}{" "}
                      {patientData?.patientInfo?.lastName}
                    </h1>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Cake className="w-4 h-4" />
                      <h1 className="font-medium">
                        {new Date(
                          patientData?.patientInfo?.dateOfBirth
                        ).toDateString()}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <AtSign className="w-4 h-4" />
                      <h1 className="font-medium">
                        {patientData?.patientInfo?.email}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dna className="w-4 h-4" />
                    <h1 className="font-medium">
                      {patientData?.patientInfo?.gender
                        .split("")[0]
                        .toUpperCase() +
                        patientData?.patientInfo?.gender.slice(1)}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <h1 className="font-medium">
                      {patientData?.patientInfo?.mobileNo}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Medical Record</h1>
                </div>
                <div>
                  <div className="flex gap-1 text-sm items-center">
                    <Ruler className="w-4 h-4" />
                    <h1 className="font-medium text-2xl">
                      {/* {patientData?.appointments[0]?.medicalRecordInfo?.height} */}
                      1.72
                      <span className="font-bold text-muted-foreground text-sm">
                        m
                      </span>
                    </h1>
                  </div>
                  <div className="flex gap-1 text-sm items-center">
                    <Weight className="w-4 h-4" />
                    <h1 className="font-medium text-2xl">
                      {/* {patientData?.appointments[0]?.medicalRecordInfo?.weight}{" "} */}
                      70
                      <span className="font-bold text-muted-foreground text-sm">
                        kg
                      </span>
                    </h1>
                  </div>
                  <div className="flex gap-1 text-sm items-center">
                    <CircleGauge className="w-4 h-4" />
                    <h1 className="font-medium text-2xl">
                      {/* {patientData?.appointments[0]?.medicalRecordInfo?.bloodPressure}{" "} */}
                      120/80
                      <span className="font-bold text-muted-foreground text-sm">
                        mmHg
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-fit flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold">Appointment Details</h1>
              </div>
              <div className="flex flex-col md:flex md:flex-wrap md:flex-row gap-2">
                {patientData?.appointments?.map((appointment) => (
                  <div key={appointment.appointmentId}>
                    <Card className="space-y-0">
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
                        <div className="flex gap-1 text-xl">
                          <h1 className="font-medium">
                            {appointment?.appointmentType}
                          </h1>
                        </div>
                        <div className="flex gap-5 mt-2">
                          {appointment?.appointmentDetails?.map((detail) => (
                            <Card key={detail.condition}>
                              <CardHeader>
                                <h1 className="font-medium flex flex-col">
                                  <span className="font-bold text-xs text-muted-foreground">
                                    Condition
                                  </span>
                                  {detail?.condition}
                                </h1>
                                <h1 className="font-medium flex flex-col">
                                  <span className="font-bold text-xs text-muted-foreground">
                                    Prescription
                                  </span>
                                  {detail?.prescription}
                                </h1>
                                <span className="font-bold text-xs text-muted-foreground">
                                  notes
                                </span>
                                <h1 className="font-medium flex flex-col">
                                  {detail?.notes || "None"}
                                </h1>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
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
