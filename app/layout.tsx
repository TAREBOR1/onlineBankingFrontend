import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ModernBank - Number 1 Digital Banking Platform",
  description:
    "ModernBank is a secure and  online banking platform that enables users to manage accounts, transfer funds, track transactions, pay bills, and experience seamless digital banking with speed, reliability, and advanced security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
       suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
       
        <Providers> 
         {children}
        </Providers>
          <Toaster/>
        </body>
    </html>
  );
}
