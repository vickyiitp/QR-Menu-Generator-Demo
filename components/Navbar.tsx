"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              QR Menu Gen
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link 
              href="/" 
              className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover shadow-soft transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
