"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { useStoreSettings } from "../context/StoreSettingsContext";
import {
  ShoppingBag,
  Menu,
  X,
  Globe,
  Sparkles,
  Phone,
  ShieldCheck,
  CreditCard,
  Download,
  Lock,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const { settings } = useStoreSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide Navbar completely on ERP Management & POS routes
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

  const phoneDisplay = settings.hotline || settings.whatsappPhone || "01000000000";
  const announcementText =
    lang === "ar"
      ? settings.announcementAr || t("free_shipping_notice")
      : settings.announcementEn || t("free_shipping_notice");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border-b border-amber-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300 mx-auto sm:mx-0 font-medium">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>{announcementText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            <a
              href={`tel:${phoneDisplay}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone size={12} />
              <span>{phoneDisplay}</span>
            </a>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck size={13} />
              <span>{lang === "ar" ? "ضمان تجربة العطر قبل الاستلام" : "Test Before Paying"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-luxury border-b border-amber-500/15 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition">
              <div className="w-full h-full bg-[#0a080e] rounded-[10px] flex items-center justify-center">
                <span className="text-amber-400 font-serif font-black text-xl">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg sm:text-xl tracking-wider text-gold-gradient">
                {lang === "ar"
                  ? settings.storeNameAr || "روفي ستور"
                  : settings.storeNameEn || "ROVY STORE"}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-amber-500/80 font-medium -mt-0.5">
                {lang === "ar" ? "بوتيك العطور الفاخرة" : "Haute Parfumerie"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <Link href="/" className="hover:text-amber-400 transition">
              {t("nav_home")}
            </Link>
            <Link
              href="/#winter-collection"
              className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1 font-semibold"
            >
              <span>{t("nav_winter")}</span>
            </Link>
            <Link href="/#all-perfumes" className="hover:text-amber-400 transition">
              {t("nav_all_perfumes")}
            </Link>
            <Link href="/card" className="hover:text-amber-400 transition flex items-center gap-1">
              <CreditCard size={15} />
              <span>{t("nav_card")}</span>
            </Link>
            <Link href="/download" className="hover:text-amber-400 transition flex items-center gap-1">
              <Download size={15} />
              <span>{t("nav_download")}</span>
            </Link>
          </div>

          {/* Actions: Lang Toggle, Cart, Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/30 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 transition"
              title="Change Language"
            >
              <Globe size={14} />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-zinc-900/80 border border-amber-500/20 text-zinc-200 hover:text-amber-400 hover:border-amber-400 transition"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-black rounded-full flex items-center justify-center shadow-md">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Dashboard / Executive Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-xs text-zinc-300 hover:text-amber-400 transition"
            >
              <Lock size={12} />
              <span>{t("nav_login")}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-amber-400"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-amber-500/20 flex flex-col gap-3 text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-zinc-200 hover:text-amber-400"
            >
              {t("nav_home")}
            </Link>
            <Link
              href="/#winter-collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-amber-400 font-semibold flex items-center gap-2"
            >
              <span>{t("nav_winter")}</span>
            </Link>
            <Link
              href="/#all-perfumes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-zinc-200 hover:text-amber-400"
            >
              {t("nav_all_perfumes")}
            </Link>
            <Link
              href="/card"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-zinc-200 hover:text-amber-400 flex items-center gap-2"
            >
              <CreditCard size={16} />
              <span>{t("nav_card")}</span>
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-zinc-200 hover:text-amber-400 flex items-center gap-2"
            >
              <Download size={16} />
              <span>{t("nav_download")}</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-amber-400 font-semibold flex items-center gap-2 border-t border-zinc-800 pt-2"
            >
              <Lock size={15} />
              <span>{t("nav_login")}</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
