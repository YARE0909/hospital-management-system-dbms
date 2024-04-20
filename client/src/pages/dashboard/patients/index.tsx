import DashboardLayout from "@/components/layouts/DashboardLayout";
import { server } from "@/lib/api/server";
import PatientListType from "@/lib/types/PatientListType";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { PatientListTable } from "./_components/patientTable";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import RegisterPatient from "./_components/registerPatient";

const Index = ({ patientList }: { patientList: PatientListType[] }) => {
  const [patients, setPatients] = useState<PatientListType[]>(patientList);

  useEffect(() => {
    setPatients(patientList);
  }, [patientList]);

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col gap-5 lg:gap-0">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">Patient List</h1>
          </div>
          <div>
            <RegisterPatient />
          </div>
        </div>
        <PatientListTable patientList={patients} />
      </div>
    </DashboardLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const patientListResponse = await server.get("/patients/list");

  return {
    props: {
      patientList: patientListResponse.data.data.patients,
    },
  };
};
