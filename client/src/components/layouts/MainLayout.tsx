import React from "react";
import { MobileSidebar } from "../common/Sidebar/_components/MobileSidebar";
import Sidebar from "../common/Sidebar/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex lg:flex-row h-screen overflow-hidden w-full">
      <div className="flex flex-col justify-between lg:h-full h-14 w-full lg:w-64 p-6 border-b lg:border-b-0 lg:border-r">
        {/* Desktop Sidebar */}
        <Sidebar />
        {/* Mobile Sidebar */}
        <div className="lg:hidden w-full h-full flex items-center justify-start gap-5">
          <MobileSidebar />
          <h1 className="text-2xl font-bold ml-10">MediCare</h1>
        </div>
      </div>
      <div className="w-full overflow-auto p-6">{children}</div>
    </div>
  );
};

export default MainLayout;
