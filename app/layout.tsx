export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/app/ui/navbar';
import AuthRefresher from "@/app/auth-refresher";
import "./globals.css";
import { getSession } from "@/app/lib/auth/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookstore",
  description: "Minimalist book archiving and management platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
        {session.isAuthenticated && <AuthRefresher />}
        {/* Navigation Layer */}
        <Navbar isAuthenticated={session.isAuthenticated}/>
        {/* Main Content Area */}
        <main className="w-full flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}