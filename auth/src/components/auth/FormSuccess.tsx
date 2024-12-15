import { FaRegCheckCircle } from "react-icons/fa";

interface formSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: formSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center text-sm text-emerald-500 gap-x-2">
      <FaRegCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
