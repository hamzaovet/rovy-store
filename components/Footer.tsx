"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useStoreSettings } from "../context/StoreSettingsContext";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Download,
  CreditCard,
  Lock,
  MapPin,
} from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Footer() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const { settings } = useStoreSettings();
  const isAr = lang === "ar";

  // Hide Footer on ERP routes
  const isErpRoute =
    pathname === "/dashboard" ||
    pathname === "/cashier" ||
    pathname === "/menu-admin" ||
    pathname === "/inventory" ||
    pathname === "/reports" ||
    pathname === "/customers" ||
    pathname === "/users" ||
    pathname === "/suppliers" ||
    pathname === "/offers-admin" ||
    pathname === "/sales-returns" ||
    pathname === "/settings" ||
    pathname === "/login";

  if (isErpRoute) {
    return null;
  }

  const phoneDisplay = settings.hotline || settings.whatsappPhone || "01503012856";
  const secondaryPhoneDisplay = settings.secondaryPhone || "01556718249";
  const cleanPhone = phoneDisplay.replace(/\D/g, "");
  const waNumber = cleanPhone.startsWith("0") ? `2${cleanPhone}` : cleanPhone;
  const instagram = settings.instagramHandle || "rovystore2";
  const mapsUrl = settings.googleMapsUrl || "https://maps.app.goo.gl/z2QCHZzSuJaaNHPV7";
  const addressText = isAr
    ? settings.addressAr || "6 أكتوبر — الحي الرابع (شارع مجلس الدولة) — الجيزة"
    : settings.addressEn || "Cairo & Sheikh Zayed — Express Delivery All Egypt";
  const hoursText = isAr
    ? settings.workingHoursAr || "يومياً من 10 صباحاً وحتى 12 منتصف الليل"
    : settings.workingHoursEn || "Daily 10:00 AM - 12:00 Midnight";

  return (
    <footer className="bg-black/90 border-t border-amber-500/20 text-zinc-400 mt-20">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-800/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-serif font-bold text-base text-zinc-200 mb-1">
              {isAr ? "فحص وتجربة قبل الدفع" : "Inspect & Test Before Paying"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "حقك الكامل في فتح الشحنة وفحص العبوة وتجربة الرائحة مع المندوب قبل دفع أي جنيه."
                : "Full privilege to inspect packaging and test the scent with the courier prior to payment."}
            </p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Sparkles size={24} />
            </div>
            <h4 className="font-serif font-bold text-base text-zinc-200 mb-1">
              {isAr ? "ضمان الثبات والفوحان" : "Long-Lasting Performance"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "زيوت عطرية فرنسية بيور نقية بأعلى تركيز Parfum تضمن ثباتاً يتجاوز 24 إلى 48 ساعة."
                : "Pure French niche oils formulated at maximum concentration for 24-48 hours projection."}
            </p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Truck size={24} />
            </div>
            <h4 className="font-serif font-bold text-base text-zinc-200 mb-1">
              {isAr ? "شحن سريع وتغليف هدايا فاخر" : "Express Insured Delivery"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "توصيل خلال 24 - 48 ساعة لكافة محافظات مصر في بوكس هدايا مخملي فاخر وعينات مجانية."
                : "24-48 hours delivery across all Egyptian governorates with velvet gift boxes & free samples."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#0a080e] rounded-[10px] flex items-center justify-center">
                <span className="text-amber-400 font-serif font-black text-xl">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl text-gold-gradient">
                {isAr
                  ? settings.storeNameAr || "روفي ستور"
                  : settings.storeNameEn || "ROVY STORE"}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-amber-500/80 font-medium">
                {isAr ? "بوتيك العطور الفاخرة" : "Haute Parfumerie"}
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            {isAr
              ? "وجهتك الأولى لاقتناء أفخم العطور العالمية الأصلية، التيسترات المعتمدة، وبدائل النيش المستوحاة من كبرى دور العطور الباريسية والإيطالية."
              : "Your premier destination for authentic luxury designer perfumes, certified testers, and bespoke niche-inspired olfactory creations."}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition"
              title={`Instagram: @${instagram}`}
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-400 transition"
              title="WhatsApp Concierge"
            >
              <MessageCircle size={17} />
            </a>
            <a
              href={`tel:${phoneDisplay}`}
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition"
              title="Phone Support"
            >
              <Phone size={17} />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-serif font-bold text-sm text-zinc-100 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
            {isAr ? "المجموعات العطرية" : "Collections"}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#winter-collection" className="hover:text-amber-400 transition">
                {isAr ? "❄️ تشكيلة الشتاء الفاخرة (Winter 1)" : "❄️ Winter Luxury Line"}
              </Link>
            </li>
            <li>
              <Link href="/#all-perfumes" className="hover:text-amber-400 transition">
                {isAr ? "🪵 العود والشرقيات الملكية" : "🪵 Royal Oud & Orientals"}
              </Link>
            </li>
            <li>
              <Link href="/#all-perfumes" className="hover:text-amber-400 transition">
                {isAr ? "✨ العطور الفرنسية والعالمية" : "✨ French Designer Icons"}
              </Link>
            </li>
            <li>
              <Link href="/#all-perfumes" className="hover:text-amber-400 transition">
                {isAr ? "🧪 بدائل النيش المستوحاة" : "🧪 Inspired Niche Flacons"}
              </Link>
            </li>
            <li>
              <Link href="/#all-perfumes" className="hover:text-amber-400 transition">
                {isAr ? "🌸 المسك، العنبر والفانيليا" : "🌸 Musk, Amber & Vanilla"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Services */}
        <div>
          <h4 className="font-serif font-bold text-sm text-zinc-100 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
            {isAr ? "روابط سريعة وخدمات" : "Quick Links"}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/card" className="hover:text-amber-400 transition flex items-center gap-1.5">
                <CreditCard size={14} className="text-amber-400" />
                <span>{isAr ? "كارت المتجر الرسمي (QR Codes)" : "VIP Store Card"}</span>
              </Link>
            </li>
            <li>
              <Link href="/download" className="hover:text-amber-400 transition flex items-center gap-1.5">
                <Download size={14} className="text-amber-400" />
                <span>{isAr ? "تحميل تطبيق الأندرويد (APK)" : "Download Android App"}</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-amber-400 transition flex items-center gap-1.5">
                <Lock size={14} className="text-amber-400" />
                <span>{isAr ? "بوابة المالك والتشغيل" : "Executive Portal"}</span>
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  "مرحباً، أود الاستفسار عن عطور روفي ستور"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition flex items-center gap-1.5"
              >
                <MessageCircle size={14} className="text-emerald-400" />
                <span>{isAr ? "استشارة عطرية مجانية" : "Free Fragrance Consultation"}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <h4 className="font-serif font-bold text-sm text-zinc-100 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
            {isAr ? "خدمة العملاء والاتصال" : "Concierge & Inquiries"}
          </h4>
          <div className="space-y-3 text-xs">
            <p className="flex items-start gap-2">
              <Phone size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-zinc-200">{phoneDisplay}</strong>
                <br />
                <span className="text-[11px] text-zinc-500">{hoursText}</span>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <InstagramIcon size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <a
                href={`https://www.instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
              >
                @{instagram}
              </a>
            </p>
            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[11px] font-semibold hover:bg-amber-900/40 hover:border-amber-400/50 transition group"
              >
                <MapPin size={12} className="text-amber-400 group-hover:scale-110 transition shrink-0" />
                <span>{addressText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-900 py-4 px-4 text-center text-xs text-zinc-600">
        <p>
          © 2026 {isAr ? "روفي ستور (Rovy Store) — للعطور الفاخرة. جميع الحقوق محفوظة." : "Rovy Store — Haute Parfumerie. All rights reserved."}
        </p>
        <p className="text-[11px] text-zinc-500 mt-1">
          {isAr
            ? "تم تطوير النظام والمنظومة السحابية بواسطة شركة أوركا للحلول البرمجية"
            : "Developed & Powered by Orca Software Solutions"}
        </p>
      </div>
    </footer>
  );
}
