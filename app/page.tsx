"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "./components/client/Sidebar";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const prodObj = {
    title: "Produs de test 4444 ",
    description: "Acesta este un test4444",
  };

  async function makeApiCall() {
    await axios.post("api/products", {
      body: prodObj,
    });
  }

  // return <button onClick={makeApiCall}>Send req</button>;
  return (
    <div className="flex-[8] p-6 bg-gray-50">
      <div className="bg-white">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
