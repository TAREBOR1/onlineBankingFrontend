import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import LenisScroll from "@/components/LenisScroll";

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
  title: "Tyrex- Smart vehicle booking platform",
  description: "tyrex is a wonderrful smart web app, with modern interface and reliable ride where use can have any kind of car they want ",
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
        <LenisScroll/>
        <Providers> 
         {children}
        </Providers>
          <Toaster/>
        </body>
    </html>
  );
}
