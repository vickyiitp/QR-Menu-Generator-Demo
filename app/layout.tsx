import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Menu Gen | Turn PDF Menus into QR Codes",
  description: "Convert your restaurant's PDF menu into a professional QR code in 10 seconds. Contactless, fast, and modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/50">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <footer className="py-12 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} QR Menu Gen. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
