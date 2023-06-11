"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AiOutlineGoogle } from "react-icons/ai";

import { signIn, useSession } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();

  return (
    <Card className="w-96">
      <CardHeader className="mb-4 grid h-28 place-items-center">
        <h1 className="text-xl">Welcome back</h1>
      </CardHeader>
      <CardFooter className="pt-0">
        <button
          className="flex items-center justify-center mt-6 gap-4 bg-blue-400 w-full text-white py-2 rounded-md "
          onClick={() =>
            signIn("google", { callbackUrl: `${window.location.origin}` })
          }
        >
          <AiOutlineGoogle />
          Sign In
        </button>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
