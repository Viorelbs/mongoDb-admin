import Provider from "./providers/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import SidebarLayout from "./layout/layouts";
import { QueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <SidebarLayout>
            <div className="flex-[8] p-6 bg-custom-gray">{children}</div>
          </SidebarLayout>
        </Provider>
      </body>
    </html>
  );
}
