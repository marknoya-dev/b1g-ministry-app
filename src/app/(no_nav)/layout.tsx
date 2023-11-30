import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          `min-h-screen bg-background font-sans antialiased`,
          fontSans.variable
        )}
      >
        <section
          className={cn(
            `min-h-screen bg-background font-sans antialiased bg-commit bg-cover bg-center bg-no-repeat py-[120px] px-[5%] md:px-[8%]`,
            fontSans.variable
          )}
        >
          {children}
        </section>
      </body>
    </html>
  );
}
