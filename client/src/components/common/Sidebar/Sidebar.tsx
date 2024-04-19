import React from "react";
import { Button } from "../../ui/button";
import { CalendarClock, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { MobileSidebar } from "./_components/MobileSidebar";

const Sidebar: React.FC = () => {
  return (
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
  );
};

export default Sidebar;
