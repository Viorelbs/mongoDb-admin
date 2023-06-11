import Provider from "./providers/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import SidebarLayout from "./layout/SidebarLayout";
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
  // const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider client={queryClient}> */}

        <Provider>
          <SidebarLayout>
            <div className="flex-[8] p-6 bg-gray-50">{children}</div>
          </SidebarLayout>
        </Provider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
