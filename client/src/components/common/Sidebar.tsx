import React from "react";
import { Button } from "../ui/button";
import { CalendarClock, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 border-r">
      <div className="w-full h-full flex flex-col justify-between p-6">
        <ul className="overflow-y-auto flex flex-col gap-2">
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
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
