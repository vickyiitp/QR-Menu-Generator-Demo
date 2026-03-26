"use client";

import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, ExternalLink, Copy, Check } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QRCardProps {
  url: string;
  restaurantName?: string;
}

export default function QRCard({ url, restaurantName = "Your Restaurant" }: QRCardProps) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<SVGSVGElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 100;
      if (ctx) {
        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw Text
        ctx.fillStyle = "#111827";
        ctx.font = "bold 20px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SCAN TO VIEW MENU", canvas.width / 2, 40);
        
        // Draw QR
        ctx.drawImage(img, 20, 60);
        
        // Footer Text
        ctx.fillStyle = "#6B7280";
        ctx.font = "14px Inter, sans-serif";
        ctx.fillText(restaurantName, canvas.width / 2, canvas.height - 15);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR-Menu-${restaurantName.replace(/\s+/g, "-")}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-medium border border-gray-100 overflow-hidden"
    >
      <div className="p-8 flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">
          Your Menu QR Code
        </h3>
        
        <div className="bg-white p-4 rounded-xl border-4 border-gray-50 shadow-inner mb-8">
          <QRCodeSVG
            ref={qrRef}
            value={url}
            size={220}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/qr-icon.png", // Optional: If we had a logo
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-mono text-gray-500 truncate flex-1">
              {url}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-primary"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-hover shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-5 h-5" />
            Download Print QR
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          Generated for <span className="font-semibold text-gray-700">{restaurantName}</span>
        </p>
      </div>
    </motion.div>
  );
}
