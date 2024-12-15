// import {  } from "lucide-react";
import { BiError } from "react-icons/bi";

interface formErrorProps {
  message?: string;
}

export const FormError = ({ message }: formErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive gap-x-2">
      <BiError className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
