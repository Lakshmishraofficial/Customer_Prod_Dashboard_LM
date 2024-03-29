import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "../themes/themeContext";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime-HR",
  description:
    "A Next.js 13 Meta Vercel , threads , facebook , prime-hr, primehr, Prime-HR application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
 
      <ClerkProvider appearance={{
        baseTheme: dark,
      }}>
        <html lang="en">
        <ThemeProvider>
          <body className={inter.className}>
            <Topbar />
            <ThemeSwitcher />
            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full sm:max-w-6xl max-w-xs">{children}</div>
              </section>
              {/* @ts-ignore */}
              <RightSidebar />
            </main>

            <Bottombar />
          </body>
          </ThemeProvider>  
        </html>
      </ClerkProvider>

  );
}
