"use client";
import React from "react";
import Sidebar from "../components/client/Sidebar";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession({
    required: pathname.includes("signin") ? false : true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <>
      {pathname.includes("signin") ? (
        <main className="min-w-screen min-h-screen grid place-content-center">
          {children}
        </main>
      ) : (
        <main className="flex">
          <Sidebar />
          {children}
        </main>
      )}
    </>
  );
}
