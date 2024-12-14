import { signOut } from "@/auth";
import { LoginButton } from "@/components/auth/LoginButton";
import { RegisterButton } from "@/components/auth/RegisterButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
    <p>hello unknown!</p>
    <LoginButton>
      <Button variant={"secondary"} size={"lg"}>Login</Button>
    </LoginButton>
    <RegisterButton>
      <Button variant={"secondary"} size={"lg"}>Register</Button>
    </RegisterButton>
    <form action={async () => {
      "use server";
      await signOut()
    }}>
      <button type="submit">sign out</button>
    </form>
    </>
  );
}
