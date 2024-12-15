"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface loginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export function RegisterButton({
  children,
  mode = "redirect",
  asChild,
}: loginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/signup");
  };

  if (mode == "modal") {
    return <span>CURRENTLY UNAVAILABLE!</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
