"use client";
import React from "react";
import Sidebar from "../components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar />
      {children}
    </main>
  );
}
