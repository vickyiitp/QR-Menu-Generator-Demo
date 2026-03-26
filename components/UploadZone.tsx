"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateId } from "@/utils/generateId";
import { cn } from "@/lib/utils"; // I'll create this helper

export default function UploadZone() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
    setStatus("uploading");
    setIsDragging(false);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const id = generateId();
    const menuData = {
      id,
      fileName: selectedFile.name,
      uploadedAt: new Date().toISOString(),
      url: `https://qrmenu.app/menu/${id}`,
      restaurantName: "My Restaurant", // Default for demo
    };

    localStorage.setItem("qr_menu_data", JSON.stringify(menuData));
    setStatus("success");

    // Redirect to dashboard after short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }, [router]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleUpload(droppedFile);
  }, [handleUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleUpload(selectedFile);
  }, [handleUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.02] shadow-medium" 
            : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50/50"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <div className={cn(
                  "p-4 rounded-full bg-primary/10 mb-4 transition-transform duration-300",
                  isDragging ? "scale-110 rotate-12" : "group-hover:scale-110"
                )}>
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Upload your Menu PDF
                </h3>
                <p className="text-gray-500 max-w-xs">
                  Drag and drop your file here, or click to browse. (PDF only)
                </p>
              </motion.div>
            )}

            {status === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Processing Menu...
                </h3>
                <p className="text-gray-500">
                  {file?.name}
                </p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Menu Uploaded!
                </h3>
                <p className="text-gray-500">
                  Redirecting to your dashboard...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-primary/20 transition-colors" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-primary/20 transition-colors" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-primary/20 transition-colors" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-primary/20 transition-colors" />
      </motion.div>
    </div>
  );
}
