import DashboardLayout from "@/components/layouts/DashboardLayout";
import { server } from "@/lib/api/server";
import PatientListType from "@/lib/types/PatientListType";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import nookies from "nookies";
import RegisterPatient from "./_components/RegisterDoctor";
import { DoctorListTable } from "./_components/DoctorTable";
import DoctorListType from "@/lib/types/DoctorListType";

const Index = ({ doctorList }: { doctorList: DoctorListType[] }) => {
  const [patients, setPatients] = useState<DoctorListType[]>(doctorList);

  useEffect(() => {
    setPatients(doctorList);
  }, [doctorList]);

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col gap-5 lg:gap-0">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">Doctor List</h1>
          </div>
          <div>
            <RegisterPatient />
          </div>
        </div>
        <DoctorListTable doctorList={patients} />
      </div>
    </DashboardLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const doctorListResponse = await server.get("/doctors/list");
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
      doctorList: doctorListResponse.data.data.doctors,
    },
  };
};
