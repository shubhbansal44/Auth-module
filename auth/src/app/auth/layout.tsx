import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-screen flex items-center justify-center">
      {children}
    </main>
  );
}
