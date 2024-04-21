import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import nookies from "nookies";
import { server } from "@/lib/api/server";
import AppointmentListType from "@/lib/types/AppointmentListType";
import { AppointmentListTable } from "./_components/appointmentTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Area,
  CartesianGrid,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dynamic from "next/dynamic";
import { StatisticsType } from "@/lib/types/StatisticsType";

const PieChart = dynamic(
  () => import("recharts").then((recharts) => recharts.PieChart),
  { ssr: false }
);

const AreaChart = dynamic(
  () => import("recharts").then((recharts) => recharts.AreaChart),
  { ssr: false }
);

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any[];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Index = ({
  appointmentList,
  dashboardStatistics,
}: {
  appointmentList: AppointmentListType[];
  dashboardStatistics: StatisticsType;
}) => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-5">
          <Card className="w-full">
            <CardHeader>
              <h1 className="font-bold text-md text-muted-foreground">
                Total Number Of Patients
              </h1>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-4xl">
                {dashboardStatistics.patientCount}
              </h1>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <h1 className="font-bold text-md text-muted-foreground">
                Total Number Of Doctors
              </h1>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-4xl">
                {dashboardStatistics.doctorCount}
              </h1>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <h1 className="font-bold text-md text-muted-foreground">
                Total Number Of Appointments
              </h1>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-4xl">
                {dashboardStatistics.appointmentCount}
              </h1>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col md:flex md:flex-row gap-5">
          <Card className="w-full lg:w-1/4">
            <CardHeader>
              <h1 className="text-2xl font-bold">Gender Ratio</h1>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                className="lg:hidden"
                width="100%"
                height={500}
              >
                <PieChart className="outline-none">
                  <Pie
                    stroke="none"
                    className="outline-none"
                    data={[
                      {
                        name: "Male",
                        value: dashboardStatistics.genderRatio.maleCount,
                        fill: "#3B82F6",
                      },
                      {
                        name: "Female",
                        value: dashboardStatistics.genderRatio.femaleCount,
                        fill: "#E11D48",
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={200}
                    fill="#fff"
                  />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer
                className="hidden lg:block"
                width={"100%"}
                height={160}
              >
                <PieChart className="outline-none">
                  <Pie
                    stroke="none"
                    className="outline-none"
                    data={[
                      {
                        name: "Male",
                        value: dashboardStatistics.genderRatio.maleCount,
                        fill: "#3582F6",
                      },
                      {
                        name: "Female",
                        value: dashboardStatistics.genderRatio.femaleCount,
                        fill: "#EC4899",
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#fff"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <div>
                <div className="flex gap-1">
                  <h1 className="font-bold text-muted-foreground">Male</h1>
                  <h1 className="font-bold">
                    {dashboardStatistics.genderRatio.maleCount}
                  </h1>
                </div>
                <div className="flex gap-1">
                  <h1 className="font-bold text-muted-foreground">Female</h1>
                  <h1 className="font-bold">
                    {dashboardStatistics.genderRatio.femaleCount}
                  </h1>
                </div>
                <div className="flex gap-1">
                  <h1 className="font-bold text-muted-foreground">Ratio</h1>
                  <h1 className="font-bold">
                    {(
                      dashboardStatistics.genderRatio.maleCount /
                      dashboardStatistics.genderRatio.femaleCount
                    ).toFixed(2)}
                  </h1>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full lg:w-3/4">
            <CardHeader>
              <h1 className="text-2xl font-bold">Patients Per Day</h1>
            </CardHeader>
            <CardContent className="w-full">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dashboardStatistics.patientsPerDay}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={true}
                        payload={dashboardStatistics.patientsPerDay}
                        label={"Patients Per Day"}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <div>
              <h1 className="font-bold text-2xl">Upcoming Appointments</h1>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-full flex flex-col gap-5 lg:gap-0">
              <AppointmentListTable appointmentList={appointmentList} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;

export const getServerSideProps = async (ctx: any) => {
  const appointmentListResponse = await server.get("/appointments/list");
  const dashboardStatsResponse = await server.get("/statistics");
  const cookies = nookies.get(ctx);

  if (!cookies.userToken) {
    if (cookies.userToken === undefined || cookies.userToken === null) {
      nookies.destroy(ctx, "userToken");
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      appointmentList: appointmentListResponse.data.data.appointments,
      dashboardStatistics: dashboardStatsResponse.data.data,
    },
  };
};
