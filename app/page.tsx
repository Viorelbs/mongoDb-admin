"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackUrl=/protected/client");
    },
  });
  return <button onClick={() => signIn()}>Sign in</button>;
}
