import React from "react";
import { BackButton } from "@/components/auth/BackButton";
import { BiError } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";

export const ErrorCard = () => {
  return (
    <Card className="min-w-96 shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong." />
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-center">
          <BiError className="text-destructive text-xl" />
        </div>
      </CardContent>
      <CardFooter>
        <BackButton label={"Back to Login"} href={"/auth/login"} />
      </CardFooter>
    </Card>
  );
};
