"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useStoreSettings } from "../../context/StoreSettingsContext";
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
  Navigation,
} from "lucide-react";
import InstagramIcon from "../../components/InstagramIcon";

export default function VipCardPage() {
  const { lang, dir, t } = useLanguage();
  const { settings } = useStoreSettings();
  const isAr = lang === "ar";
  const cardRef = useRef<HTMLDivElement>(null);

  const webUrl = "https://rovy-store.vercel.app";
  const apkUrl = "https://github.com/hamzaovet/rovy-store/releases/download/v1.0.0/rovy-store.apk";
  const mapsUrl = settings.googleMapsUrl || "https://maps.app.goo.gl/z2QCHZzSuJaaNHPV7";

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
            ? "يحتوي على 2 كيو ار كود: كود مباشر لزيارة الموقع، وكود فوري لتحميل تطبيق الأندرويد الرسمي مع اللوكيشن وبيانات التواصل المعتمدة."
            : "Features Dual QR Codes: Instant Website Access & Direct Android APK Download."}
        </p>
      </div>

      {/* The Printable VIP Card */}
      <div
        ref={cardRef}
        id="vip-card"
        className="relative max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 border border-amber-500/40 bg-gradient-to-br from-[#120e1f] via-[#090710] to-[#040306] shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden space-y-8"
      >
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Brand Logo & Title */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-2xl shadow-lg border border-amber-300/40">
              R
            </div>
            <div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-gold-gradient tracking-wide">
                {isAr ? "روفي ستور" : "Rovy Store"}
              </h2>
              <p className="text-xs text-amber-400/90 tracking-widest font-sans font-medium uppercase">
                {isAr ? "بوتيك العطور الفاخرة والبدائل الملكية" : "Haute Parfumerie & Inspired Luxury"}
              </p>
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
        <div className="relative z-10 border-t border-amber-500/20 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300 text-center sm:text-start">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-amber-400 shrink-0" />
              <span className="font-mono font-bold text-zinc-100">
                {settings.hotline || "01503012856"}
              </span>
            </div>
            {settings.secondaryPhone && (
              <span className="font-mono text-[11px] text-zinc-400 pr-5">
                واتس وأوردرات: {settings.secondaryPhone}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2">
            <InstagramIcon size={15} className="text-amber-400 shrink-0" />
            <a
              href={`https://www.instagram.com/${settings.instagramHandle || "rovystore2"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-amber-400 transition"
            >
              @{settings.instagramHandle || "rovystore2"}
            </a>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-1">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-amber-400 transition"
            >
              <MapPin size={15} className="text-amber-400 shrink-0" />
              <span className="text-[11px] line-clamp-1 underline decoration-amber-500/40">
                {isAr ? (settings.addressAr || "6 أكتوبر — الحي الرابع (شارع مجلس الدولة)") : settings.addressEn}
              </span>
            </a>
            <span className="text-[10px] text-emerald-400/80 pr-5 flex items-center gap-1">
              <Navigation size={10} />
              <span>موقع معتمد على Google Maps</span>
            </span>
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
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-6 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition flex items-center gap-2"
        >
          <MapPin size={16} />
          <span>{isAr ? "فتح موقعنا على خرائط جوجل 📍" : "Open on Google Maps"}</span>
        </a>

        <a
          href="/api/download/apk"
          download="rovy-store.apk"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-amber-500/30 text-emerald-400 text-xs font-bold hover:bg-zinc-800 transition flex items-center gap-2"
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
