import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import Home from "./page";


export const metadata: Metadata = {
  title: "Hostel Feedback",
  description: "From VSSUT Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body>
       
       {children}
       
       <Toaster />
      </body>
    </html>
  );
}
