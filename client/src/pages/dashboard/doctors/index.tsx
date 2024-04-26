import DashboardLayout from "@/components/layouts/DashboardLayout";
import { server } from "@/lib/api/server";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { DoctorListTable } from "./_components/DoctorTable";
import DoctorListType from "@/lib/types/DoctorListType";
import RegisterDoctor from "./_components/RegisterDoctor";

const Index = ({
  doctorList,
  departmentList,
  specializationList,
}: {
  doctorList: DoctorListType[];
  departmentList: {
    label: string;
    value: string;
  }[];
  specializationList: {
    label: string;
    value: string;
  }[];
}) => {
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
            <RegisterDoctor specializationList={specializationList} />
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
  const specializationListResponse = await server.get("/specializations");
  const cookies = nookies.get(ctx);

  const specializationList =
    specializationListResponse.data.data.specializations.map(
      (specialization: {
        specializationName: string;
        specializationId: string;
      }) => {
        return {
          label: specialization.specializationName,
          value: specialization.specializationId,
        };
      }
    );

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
      specializationList,
    },
  };
};
