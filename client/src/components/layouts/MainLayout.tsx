import React from "react";
import { CalendarClock, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MobileSidebar } from "../common/Sidebar/_components/MobileSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex lg:flex-row h-screen overflow-hidden w-full">
      <div className="flex flex-col justify-between lg:h-full h-14 w-full lg:w-64 p-6">
        {/* Desktop Sidebar */}
        <div className="hidden h-full lg:flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">MediCare</h1>
            </div>
            <ul className="flex flex-col gap-2">
              <Link className="w-full" href="/dashboard">
                <Button className="w-full flex justify-start" variant="ghost">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link className="w-full" href="/patients">
                <Button className="w-full flex justify-start" variant="ghost">
                  <User className="mr-2 h-4 w-4" />
                  Patients
                </Button>
              </Link>
              <Link className="w-full" href="/appointments">
                <Button className="w-full flex justify-start" variant="ghost">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Appointments
                </Button>
              </Link>
            </ul>
          </div>
          <Button>Logout</Button>
        </div>
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
