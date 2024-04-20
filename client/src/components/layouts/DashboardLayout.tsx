import Link from "next/link";
import {
  Bell,
  CalendarClock,
  CircleUser,
  Cross,
  Gauge,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  UserRound,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/router";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Cross className="h-6 w-6" />
              <span className="">MediCare</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`${
                  router.pathname === "/dashboard"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-muted-foreground transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                }`}
              >
                <Gauge className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/patients"
                className={`${
                  router.pathname === "/dashboard/patients"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-muted-foreground transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                }`}
              >
                <UserRound className="h-4 w-4" />
                Patients
              </Link>
              <Link
                href="/dashboard/appointments"
                className={`${
                  router.pathname === "/dashboard/appointments"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-muted-foreground transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                }`}
              >
                <CalendarClock className="h-4 w-4" />
                Appointments
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="flex gap-5 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Cross className="h-6 w-6" />
                  <span className="text-2xl">MediCare</span>
                </Link>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Gauge className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/patients"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <UserRound className="h-4 w-4" />
                    Patients
                  </Link>
                  <Link
                    href="/dashboard/appointments"
                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  >
                    <CalendarClock className="h-4 w-4" />
                    Appointments
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-2xl font-bold">
                {router.pathname === "/dashboard"
                  ? "Dashboard"
                  : router.pathname
                      .replace("/dashboard/", "")
                      .charAt(0)
                      .toUpperCase() +
                    router.pathname.replace("/dashboard/", "").slice(1)}
              </h1>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}