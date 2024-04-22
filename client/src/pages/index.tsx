import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import nookies from "nookies";

export default function Home({ userAuth }: { userAuth: string }) {
  return (
    <div className="w-full h-screen flex items-center justify-center relative z-10">
      <div>
        <Activity className="h-[40rem] w-[40rem] text-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center gap-3">
          <h1 className="text-9xl font-bold">MediCare</h1>
          <div>
            {userAuth.length === 0 ? (
              <Link href="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button variant={"outline"}>Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  return {
    props: {
      userAuth: cookies.userToken || "",
    },
  };
};
