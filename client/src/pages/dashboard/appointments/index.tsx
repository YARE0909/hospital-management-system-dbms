import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import nookies from "nookies";
import { server } from "@/lib/api/server";
import AppointmentListType from "@/lib/types/AppointmentListType";
import { AppointmentListTable } from "./_components/appointmentTable";
import RegisterAppointment from "./_components/RegisterAppointment";

const Index = ({
  appointmentList,
}: {
  appointmentList: AppointmentListType[];
}) => {
  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col gap-5 lg:gap-0">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">Appointment List</h1>
          </div>
          <div>
            <RegisterAppointment />
          </div>
        </div>
        <AppointmentListTable appointmentList={appointmentList} />
      </div>
    </DashboardLayout>
  );
};

export default Index;

export const getServerSideProps = async (ctx: any) => {
  const appointmentListResponse = await server.get("/appointments/list");
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
    },
  };
};
