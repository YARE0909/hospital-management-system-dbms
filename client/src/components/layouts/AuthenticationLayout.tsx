import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthenticationLayout = ({ type }: { type: "login" | "register" }) => {
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });

  const [signinForm, setSigninForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement login API
    console.log(loginForm);
  };
  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement register API
    console.log(signinForm);
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center ">
      <div className="w-full h-20 flex justify-center p-6">
        <h1 className="text-3xl font-bold">FarmEase</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{type === "login" ? "Log In" : "Register"}</CardTitle>
            <CardDescription>
              {type === "login"
                ? "Welcome back! Log in to your account"
                : "Welcome! Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={type === "login" ? login : register}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    type="email"
                    id="email"
                    placeholder="someone@example.com"
                    onChange={(e) =>
                      type === "login"
                        ? setLoginForm({ ...loginForm, email: e.target.value })
                        : setSigninForm({
                            ...signinForm,
                            email: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    required
                    type="password"
                    id="password"
                    placeholder="**********"
                    onChange={(e) =>
                      type === "login"
                        ? setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        : setSigninForm({
                            ...signinForm,
                            password: e.target.value,
                          })
                    }
                  />
                </div>
                {type === "register" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      required
                      type="password"
                      id="confirmPassword"
                      placeholder="**********"
                      onChange={(e) =>
                        setSigninForm({
                          ...signinForm,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" variant="default">
                {type === "login" ? "Log In" : "Register"}
              </Button>
              <Link href={type === "login" ? "/register" : "/login"}>
                {type === "login" ? (
                  <Button variant="link">Register</Button>
                ) : (
                  <Button variant="link">Log in</Button>
                )}
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
