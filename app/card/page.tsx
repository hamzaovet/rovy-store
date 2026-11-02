"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import {
  Download,
  ExternalLink,
  Printer,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  QrCode,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import InstagramIcon from "../../components/InstagramIcon";

export default function VipCardPage() {
  const { lang, dir, t } = useLanguage();
  const isAr = lang === "ar";
  const cardRef = useRef<HTMLDivElement>(null);

  const webUrl = "https://rovy-store.vercel.app";
  const apkUrl = "https://github.com/hamzaovet/rovy-store/releases/download/v1.0.0/rovy-store.apk";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Sparkles size={14} className="text-amber-400" />
          <span>{isAr ? "كارت المتجر الرسمي الفاخر (VIP Card)" : "Official VIP Store Card"}</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-gold-gradient">
          {isAr ? "كارت روفي ستور — بطاقة العطور الملكية" : "Rovy Store — Haute Parfumerie Card"}
        </h1>
        <p className="text-xs text-zinc-400">
          {isAr
            ? "يحتوي على 2 كيو ار كود: كود مباشر لزيارة الموقع، وكود فوري لتحميل تطبيق الأندرويد الرسمي."
            : "Features Dual QR Codes: Instant Website Access & Direct Android APK Download."}
        </p>
      </div>

      {/* THE LUXURY VIP CARD */}
      <div
        ref={cardRef}
        className="relative mx-auto max-w-2xl w-full rounded-3xl overflow-hidden glass-luxury-gold p-8 border-2 border-amber-500/40 shadow-2xl space-y-8"
        style={{
          background: "radial-gradient(circle at top right, #1d1726 0%, #0c0912 60%, #050407 100%)",
        }}
      >
        {/* Subtle Gold Frame Lines */}
        <div className="absolute inset-3 rounded-2xl border border-amber-500/20 pointer-events-none" />
        <div className="absolute inset-4 rounded-xl border border-amber-500/10 pointer-events-none" />

        {/* Top Header of Card */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-xl">
              <div className="w-full h-full bg-[#0a080e] rounded-[14px] flex items-center justify-center">
                <span className="text-amber-400 font-serif font-black text-3xl">R</span>
              </div>
            </div>
            <div>
              <h2 className="font-serif font-black text-2xl text-gold-gradient tracking-wide">
                ROVY STORE
              </h2>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block -mt-0.5">
                {isAr ? "روفي ستور — بوتيك العطور الفاخرة" : "Haute Parfumerie Boutique"}
              </span>
            </div>
          </div>

          <div className="text-end hidden sm:block">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
              VIP PRIVILEGE
            </span>
          </div>
        </div>

        {/* Middle: Dual QR Codes Section */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* QR 1: Website */}
          <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/25 text-center space-y-3 shadow-lg">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  webUrl
                )}`}
                alt="Website QR"
                className="w-36 h-36 mx-auto"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1">
                <ExternalLink size={12} />
                <span>{isAr ? "كود زيارة الموقع الإلكتروني" : "Scan to Visit Website"}</span>
              </span>
              <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                rovy-store.vercel.app
              </p>
            </div>
          </div>

          {/* QR 2: Android APK */}
          <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/25 text-center space-y-3 shadow-lg">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  apkUrl
                )}`}
                alt="Android APK QR"
                className="w-36 h-36 mx-auto"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Download size={12} />
                <span>{isAr ? "كود تحميل تطبيق الأندرويد" : "Scan to Download Android APK"}</span>
              </span>
              <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                rovy-store.apk (v1.0.0)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Contacts & Location */}
        <div className="relative z-10 border-t border-amber-500/20 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300 text-center sm:text-start">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Phone size={15} className="text-amber-400 shrink-0" />
            <span className="font-mono font-bold">01010568615</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2">
            <InstagramIcon size={15} className="text-amber-400 shrink-0" />
            <span className="font-medium">@rovystore2</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2">
            <MapPin size={15} className="text-amber-400 shrink-0" />
            <span className="text-[11px]">{isAr ? "القاهرة والشيخ زايد" : "Cairo & Sheikh Zayed"}</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="py-3 px-6 rounded-xl btn-gold text-xs font-bold flex items-center gap-2 shadow-xl"
        >
          <Printer size={16} />
          <span>{isAr ? "طباعة الكارت الفاخر" : "Print VIP Card"}</span>
        </button>

        <a
          href="/api/download/apk"
          download="rovy-store.apk"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-zinc-800 transition flex items-center gap-2"
        >
          <Download size={16} />
          <span>{isAr ? "تحميل ملف APK مباشرة" : "Direct Download APK"}</span>
        </a>

        <Link
          href="/"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:text-white transition"
        >
          {isAr ? "العودة للمتجر" : "Back to Store"}
        </Link>
      </div>
    </div>
  );
}
