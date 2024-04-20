import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import nookies from "nookies";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="w-full h-full">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </DashboardLayout>
  );
};

export default Index;

export const getServerSideProps = async (ctx: any) => {
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
    props: {},
  };
};
