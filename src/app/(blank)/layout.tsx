"use client";
import ModeToggle from "@/components/ModeToggle";
import NavigationBar from "@/components/NavigationBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const themeQuery = searchParams.get("theme");
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ background: themeQuery === "dark" ? "black" : "white" }}
      >
        <div className="flex justify-end p-10">
          <ModeToggle />
        </div>

        {children}
      </body>
    </html>
  );
}
