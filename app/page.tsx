"use client";

import UploadZone from "@/components/UploadZone";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Smartphone, Globe } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "No App Required",
      description: "Customers just scan and view. No downloads needed.",
      icon: Smartphone,
    },
    {
      title: "Instant QR Code",
      description: "Generate and download your QR code in seconds.",
      icon: Zap,
    },
    {
      title: "Always Online",
      description: "Your digital menu is hosted securely on our cloud.",
      icon: Globe,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Zap className="w-4 h-4" />
              Instant PDF to QR
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Turn Your PDF Menu into a <br className="hidden md:block" />
              <span className="text-primary">QR Code in 10 Seconds.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              The simplest contactless menu solution for modern restaurants. <br />
              Upload, generate, and place on your tables instantly.
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <UploadZone />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose QR Menu Gen?</h2>
            <p className="text-gray-500 mt-4">Built for restaurants that value speed and simplicity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-medium transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center gap-2 text-accent text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Ready to use
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Still using paper menus?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Join 500+ restaurants that have switched to QR Menu Gen for a better customer experience.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 shadow-lg transition-all hover:scale-105"
          >
            Generate Your QR Now
          </button>
        </div>
      </section>
    </div>
  );
}
