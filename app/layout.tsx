import Provider from "./providers/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import SidebarLayout from "./layout/SidebarLayout";

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
          <SidebarLayout>{children}</SidebarLayout>
        </Provider>
      </body>
    </html>
  );
}
