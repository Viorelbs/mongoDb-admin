"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const prodObj = {
    title: "Produs de test 4444 ",
    description: "Acesta este un test4444",
  };

  async function makeApiCall() {
    await axios.post("api/products", {
      body: prodObj,
    });
  }

  return (
    <div>
      <div className="bg-white">
        <h1>Dashboard</h1>
        {/* <button onClick={getProd}>Send req</button> */}
      </div>
    </div>
  );
}
