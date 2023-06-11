"use client";
import React from "react";
import Sidebar from "../components/client/Sidebar";
import { usePathname } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
