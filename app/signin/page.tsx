"use client";
import { Button, Card } from "@material-tailwind/react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      <Card className="border m-auto lg:max-w-xl w-full p-4 text-center">
        <h1 className="text-2xl font-medium mb-4">Welcome</h1>
        <Button onClick={() => signIn()}>Sign In</Button>
      </Card>
    </section>
  );
};

export default SignInPage;
