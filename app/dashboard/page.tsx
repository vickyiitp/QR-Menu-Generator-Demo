"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCard from "@/components/QRCard";
import AnalyticsWidget from "@/components/AnalyticsWidget";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard, FileText, Settings, LogOut, Bell, Smartphone } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

interface MenuData {
  id: string;
  fileName: string;
  uploadedAt: string;
  url: string;
  restaurantName: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<MenuData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("qr_menu_data");
    if (!stored) {
      router.push("/");
      return;
    }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Side Nav (Desktop) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col p-6 fixed inset-y-0 pt-20">
        <div className="space-y-2 flex-grow">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors w-full text-left font-medium">
            <FileText className="w-5 h-5" />
            My Menus
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors w-full text-left font-medium">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all font-medium">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <LayoutDashboard className="w-4 h-4" />
                DASHBOARD
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
              <p className="text-gray-500 mt-1">Managing your menu for <span className="font-semibold text-gray-900">{data.restaurantName}</span></p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-400 hover:text-primary transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Upload
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: QR Code */}
            <div className="lg:col-span-1">
              <QRCard url={data.url} restaurantName={data.restaurantName} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-primary/5 border border-primary/10 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900">File Details</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">File Name:</span>
                    <span className="font-medium text-gray-900 truncate max-w-[150px]">{data.fileName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="font-medium text-gray-900">{formatDate(new Date(data.uploadedAt))}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Analytics & Details */}
            <div className="lg:col-span-2">
              <AnalyticsWidget />
              
              {/* Additional Mockups */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft">
                  <h4 className="font-bold text-gray-900 mb-4">Recent Scans</h4>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">iPhone 14 Pro</p>
                            <p className="text-[10px] text-gray-400 uppercase">Just now • Brooklyn, NY</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">QR Optimization</h4>
                  <p className="text-xs text-gray-500 mb-6">Your QR code is optimized for 4K printing and high-speed recognition.</p>
                  <button className="text-xs font-bold text-primary hover:underline">Download Print Templates →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
