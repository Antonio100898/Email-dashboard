import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mail Dashboard",
  description: "by Anton Mishanin (using Next.js + shadcn/ui + tailwind)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
