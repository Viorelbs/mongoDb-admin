"use client";
import React from "react";
import Sidebar from "../components/client/Sidebar";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const queryClient = new QueryClient();

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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Provider>
    </>
  );
}
