"use client";
import { Button, Card } from "@material-tailwind/react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const { data: session } = useSession();
  console.log(process.env.NEXT_PUBLIC_MONGODB_URI);

  return (
    <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      <Card className="border m-auto lg:max-w-xl w-full p-4 text-center">
        <h1 className="text-2xl font-medium mb-4">Welcome</h1>
        <pre>{JSON.stringify(session)}</pre>

        <Button
          onClick={() =>
            signIn("google", { callbackUrl: `${window.location.origin}` })
          }
        >
          Sign In
        </Button>
      </Card>
    </section>
  );
};

export default SignInPage;
