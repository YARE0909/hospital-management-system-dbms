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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AtSign, Cake, Dna, Phone, Syringe, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DoctorInfoType from "@/lib/types/DoctorInfoType";

export default function DoctorInfo({
  doctorData,
  isOpen,
  setIsOpen,
}: {
  doctorData: DoctorInfoType;
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <Drawer open={isOpen} onDrag={() => setIsOpen(false)}>
      <DrawerContent className="h-fit max-h-screen">
        <div className="px-4 w-full overflow-auto">
          <DrawerHeader>
            <DrawerTitle>Doctor Information</DrawerTitle>
            <DrawerDescription>View doctor details</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col lg:flex lg:flex-row justify-between gap-5 overflow-auto h-full">
            <div className="flex flex-col gap-5 w-full lg:w-1/4 border-r-0 lg:border-r">
              <div className="w-fit flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Doctor Details</h1>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <UserRound color="#A3A3A3" className="w-4 h-4" />
                    <h1>
                      Dr.
                      {doctorData?.doctorInfo?.firstName}{" "}
                      {doctorData?.doctorInfo?.lastName}
                    </h1>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Cake color="#A3A3A3" className="w-4 h-4" />
                      <h1>
                        {new Date(
                          doctorData?.doctorInfo?.dateOfBirth
                        ).toDateString()}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <AtSign color="#A3A3A3" className="w-4 h-4" />
                      <h1>{doctorData?.doctorInfo?.email}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dna color="#A3A3A3" className="w-4 h-4" />
                    <h1>
                      {doctorData?.doctorInfo?.gender
                        .split("")[0]
                        .toUpperCase() +
                        doctorData?.doctorInfo?.gender.slice(1)}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone color="#A3A3A3" className="w-4 h-4" />
                    <h1>{doctorData?.doctorInfo?.mobileNo}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Syringe color="#A3A3A3" className="w-4 h-4" />
                    <h1>{doctorData?.doctorInfo?.specialization}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/4 flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold">Upcoming Appointment(s)</h1>
              </div>
              <div className="flex flex-col gap-2">
                {doctorData?.appointments?.length !== 0 ? (
                  doctorData?.appointments?.map((appointment) => (
                    <div key={appointment.appointmentCreatedAt}>
                      <Card className="space-y-0 min-w-64">
                        <CardHeader className="w-full space-y-0">
                          <div className="w-full flex justify-between">
                            <div>
                              <div>
                                <h1 className="font-medium">
                                  {new Date(
                                    appointment?.appointmentDate
                                  ).toDateString()}
                                </h1>
                              </div>
                              <div>
                                <h1 className="text-sm font-bold text-muted-foreground">
                                  {appointment?.patientFirstName}{" "}
                                  {appointment?.patientLastName}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <Badge
                                variant="secondary"
                                className={
                                  appointment.appointmentStatus === "pending"
                                    ? "text-orange-500 font-bold pb-1"
                                    : appointment.appointmentStatus ===
                                      "cancelled"
                                    ? "text-red-500 font-bold pb-1"
                                    : appointment.appointmentStatus === "noShow"
                                    ? "text-purple-500 font-bold pb-1"
                                    : "text-green-500 font-bold pb-1"
                                }
                              >
                                {appointment.appointmentStatus
                                  .slice(0, 1)
                                  .toUpperCase() +
                                  appointment.appointmentStatus.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3 items-center">
                            <div>
                              <h1 className="font-bold">
                                {appointment?.appointmentType === "checkUp"
                                  ? "Check Up"
                                  : appointment?.appointmentType === "followUp"
                                  ? "Follow Up"
                                  : "Routine"}
                              </h1>
                            </div>
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
