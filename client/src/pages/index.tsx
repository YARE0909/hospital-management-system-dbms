import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center relative z-10">
      <div>
        <Activity className="h-[40rem] w-[40rem] text-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center gap-3">
          <h1 className="text-9xl font-bold">MediCare</h1>
          <div>
            <Link href="/login">
              <Button variant={"outline"}>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
