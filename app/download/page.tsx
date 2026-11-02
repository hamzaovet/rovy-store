"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import {
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Bell,
  ArrowRight,
  ArrowLeft,
  QrCode,
} from "lucide-react";

export default function DownloadAppPage() {
  const { lang, dir, t } = useLanguage();
  const isAr = lang === "ar";
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/api/download/apk";
    link.setAttribute("download", "rovy-store.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 3000);
  };

  const appUrl = "https://rovy-store.vercel.app/download";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Smartphone size={14} className="text-amber-400" />
            <span>
              {isAr ? "التطبيق الرسمي لأجهزة الأندرويد v1.0.0" : "Official Android App v1.0.0"}
            </span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl text-gold-gradient leading-tight">
            {isAr
              ? "تطبيق روفي ستور — عالم العطور في جيبك"
              : "Rovy Store App — Haute Parfumerie in Your Pocket"}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {isAr
              ? "استمتع بتجربة تسوق عطرية فائقة السرعة، إشعارات حصرية عند وصول أندر عطور الشتاء والنيش، وتتبع لحظي لحالة طلبك خطوة بخطوة."
              : "Experience lightning-fast fragrance ordering, exclusive drop alerts for rare winter flacons, and live tracking directly from your phone."}
          </p>

          {/* Features Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{isAr ? "إشعارات وصول عطور الشتاء الحصرية" : "Instant Winter Drop Alerts"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{isAr ? "طلب فوري بلمسة واحدة بدون تعقيد" : "One-Touch Fast Checkout"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{isAr ? "خصومات وهدايا وعينات مجانية إضافية" : "In-App Exclusive Free Samples"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{isAr ? "خفيف وسريع جداً على كافة الهواتف" : "Lightweight & Ultra Fast"}</span>
            </div>
          </div>

          {/* Action Download Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="py-4 px-8 rounded-2xl btn-gold text-sm font-black flex items-center justify-center gap-3 shadow-2xl transition disabled:opacity-50"
            >
              <Download size={20} className={downloading ? "animate-bounce" : ""} />
              <span>
                {downloading
                  ? isAr
                    ? "جاري بدء التحميل..."
                    : "Starting Download..."
                  : isAr
                  ? "تحميل التطبيق الآن (APK)"
                  : "Download Official APK"}
              </span>
            </button>

            <Link
              href="/card"
              className="py-4 px-6 rounded-2xl bg-zinc-900 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
            >
              <QrCode size={16} />
              <span>{isAr ? "كارت المتجر ورمز QR" : "VIP Store Card"}</span>
            </Link>
          </div>

          {/* Install Steps */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-2">
            <h4 className="font-bold text-zinc-200">
              {isAr ? "خطوات التثبيت على الهاتف:" : "Installation Steps:"}
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>{isAr ? "اضغط على زر التحميل المباشر وحمل ملف rovy-store.apk." : "Tap Download and save rovy-store.apk."}</li>
              <li>{isAr ? "افتح الملف من التنزيلات واضغط تثبيت (Install)." : "Open downloaded file and tap Install."}</li>
              <li>{isAr ? "إذا ظهر تنبيه الأمان، اختر (السماح بالتثبيت من هذا المصدر)." : "Allow installation from this source if prompted."}</li>
            </ol>
          </div>
        </div>

        {/* Right Phone Mockup & QR Code */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="glass-luxury-gold p-6 rounded-3xl border border-amber-500/30 text-center space-y-4 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#0a080e] border border-amber-500/40 p-2 mx-auto flex items-center justify-center shadow-lg">
              <span className="text-amber-400 font-serif font-black text-2xl">R</span>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">
                {isAr ? "امسح الكود بكاميرا الموبايل" : "Scan with Phone Camera"}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isAr ? "للتحميل والتثبيت المباشر على الهاتف" : "To download and install directly on Android"}
              </p>
            </div>

            <div className="bg-white p-3 rounded-2xl inline-block shadow-inner mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  "https://github.com/hamzaovet/rovy-store/releases/download/v1.0.0/rovy-store.apk"
                )}`}
                alt="Rovy Store APK QR"
                className="w-44 h-44"
              />
            </div>

            <div className="pt-2 text-[11px] text-zinc-400 font-mono">
              com.rovystore.app • v1.0.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
