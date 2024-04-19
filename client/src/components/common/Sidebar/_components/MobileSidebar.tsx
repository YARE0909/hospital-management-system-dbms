"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarClock, LayoutDashboard, Menu, User } from "lucide-react";
import Link from "next/link";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="absolute top-2 left-2" asChild>
        <Button className="flex justify-start" variant="link">
          <Menu className="mr-2 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <div className="w-full flex justify-start">
              <h1 className="text-xl font-bold">MediCare</h1>
            </div>
            <ul className="overflow-y-auto flex flex-col gap-2">
              <Link className="w-full" href="/dashboard">
                <SheetClose asChild>
                  <Button className="w-full flex justify-start" variant="ghost">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </SheetClose>
              </Link>
              <Link className="w-full" href="/patients">
                <SheetClose asChild>
                  <Button className="w-full flex justify-start" variant="ghost">
                    <User className="mr-2 h-4 w-4" />
                    Patients
                  </Button>
                </SheetClose>
              </Link>
              <Link className="w-full" href="/appointments">
                <SheetClose asChild>
                  <Button className="w-full flex justify-start" variant="ghost">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Appointments
                  </Button>
                </SheetClose>
              </Link>
            </ul>
          </div>
          <Button>Logout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
