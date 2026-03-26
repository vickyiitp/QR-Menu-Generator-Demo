"use client";

import { Eye, Smartphone, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnalyticsWidget() {
  const stats = [
    {
      label: "Total Views",
      value: "1,284",
      change: "+12%",
      icon: Eye,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Scans Today",
      value: "42",
      change: "+5",
      icon: Smartphone,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Avg. Daily Scans",
      value: "115",
      change: "+8%",
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
          <Calendar className="w-3.5 h-3.5" />
          Last 7 Days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold",
                stat.change.startsWith("+") ? "bg-accent/10 text-accent" : "bg-red-50 text-red-500"
              )}>
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Chart Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft"
      >
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-gray-900">Traffic Trend</p>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/20" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
        </div>
        
        <div className="h-32 flex items-end justify-between gap-2">
          {[40, 65, 45, 90, 55, 75, 85].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: "easeOut" }}
              className={cn(
                "flex-1 rounded-t-lg transition-all duration-300",
                i === 6 ? "bg-primary" : "bg-gray-100 group-hover:bg-gray-200"
              )}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3 px-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-400">{day}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
