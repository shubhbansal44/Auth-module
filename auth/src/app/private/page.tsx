import React from "react";
import { auth, signOut } from "@/auth";

export default async function Private() {
  const session = await auth();

  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">sign out</button>
      </form>
    </>
  );
}
