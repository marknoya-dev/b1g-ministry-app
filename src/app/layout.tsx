import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "B1G Ministry App",
  description: "Centralized Management System",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        <section className="px-[5%] md:px-[8%] max-w-[1800px] w-full mx-auto mt-[60px] mb-[50px]">
          {children}
        </section>
        <Toaster />
      </body>
    </html>
  );
}
