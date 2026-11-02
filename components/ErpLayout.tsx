"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStaff } from "@/context/StaffContext";
import { playSound, isSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import {
  MonitorSmartphone,
  ChefHat,
  Package,
  Layers,
  CircleDollarSign,
  UserCheck,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Flame,
  Truck,
} from "lucide-react";

interface ErpLayoutProps {
  children: React.ReactNode;
  activeItem?: "cashier" | "orders" | "menu" | "inventory" | "reports" | "customers" | "users";
}

export default function ErpLayout({ children, activeItem }: ErpLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isAuthenticated, loading } = useStaff();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setMounted(true);
    setSoundOn(isSoundEnabled());
  }, []);

  useEffect(() => {
    if (mounted && !loading && !currentUser) {
      router.push("/login");
    }
  }, [mounted, loading, currentUser, router]);

  const currentActive =
    activeItem ||
    (pathname === "/cashier"
      ? "cashier"
      : pathname === "/dashboard"
      ? "orders"
      : pathname === "/menu-admin"
      ? "menu"
      : pathname === "/inventory"
      ? "inventory"
      : pathname === "/reports" || pathname === "/expenses"
      ? "reports"
      : pathname === "/customers"
      ? "customers"
      : pathname === "/users"
      ? "users"
      : "orders");

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound("click");
  };

  const handleLogout = () => {
    playSound("click");
    logout();
    router.push("/login");
  };

  const navItems = [
    {
      id: "cashier",
      href: "/cashier",
      label: "كاشير نقطة البيع (POS)",
      icon: MonitorSmartphone,
      badge: "بيع فوري",
    },
    {
      id: "orders",
      href: "/dashboard",
      label: "الطلبات الحية والتشغيل",
      icon: Truck,
      badge: "لوجستيات",
    },
    {
      id: "menu",
      href: "/menu-admin",
      label: "كتالوج العطور وقائمة الأسعار",
      icon: Layers,
    },
    {
      id: "inventory",
      href: "/inventory",
      label: "المخزون وتوريد الزيوت والزجاجات",
      icon: Package,
    },
    {
      id: "reports",
      href: "/reports",
      label: "الخزينة والأرباح والمصروفات",
      icon: CircleDollarSign,
    },
    {
      id: "customers",
      href: "/customers",
      label: "قاعدة بيانات العملاء والـ CRM",
      icon: UserCheck,
    },
    {
      id: "users",
      href: "/users",
      label: "إدارة الحسابات وطوارئ المالك",
      icon: Shield,
      badge: currentUser?.role === "owner" ? "سلطة مطلقة" : undefined,
    },
  ];

  if (!mounted || loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#07050a] flex items-center justify-center text-amber-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
            <span className="font-serif font-black text-2xl text-amber-400">R</span>
          </div>
          <span className="text-xs font-serif tracking-widest text-zinc-400">
            جاري تهيئة نظام روفي ستور الإداري...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#07050a] text-zinc-100 flex font-sans antialiased selection:bg-amber-500 selection:text-black"
    >
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen z-50 w-[270px] bg-[#0b0811] border-l border-amber-500/20 flex flex-col justify-between p-4 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } shadow-2xl lg:shadow-none`}
      >
        {/* Top: Brand & Nav Links */}
        <div className="space-y-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-3 border-b border-amber-500/15">
            <Link
              href="/dashboard"
              onClick={() => {
                playSound("click");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0a080e] rounded-[10px] flex items-center justify-center">
                  <span className="text-amber-400 font-serif font-black text-lg">R</span>
                </div>
              </div>
              <div>
                <div className="font-serif font-black text-base text-gold-gradient tracking-wide leading-tight">
                  روفي ستور
                </div>
                <div className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1 mt-0.5">
                  <span>لوحة الإدارة والـ ERP</span>
                  <Sparkles size={10} className="text-amber-400" />
                </div>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentActive === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    playSound("click");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 scale-[1.02]"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} className={isActive ? "text-black" : "text-amber-400/80"} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-bold ${
                        isActive
                          ? "bg-black/20 text-black"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Card & Store Link & Logout */}
        <div className="space-y-2.5 pt-4 border-t border-amber-500/15">
          {currentUser && (
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-serif">
                  {currentUser.name}
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    currentUser.role === "owner"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                  }`}
                >
                  {currentUser.role === "owner" ? "👑 المالك العام" : "👔 مدير التشغيل"}
                </span>
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">
                @{currentUser.username}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              target="_blank"
              onClick={() => playSound("click")}
              className="py-2 px-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition"
            >
              <ExternalLink size={13} />
              <span>المتجر</span>
            </Link>

            <button
              onClick={handleLogout}
              className="py-2 px-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition"
            >
              <LogOut size={13} />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0b0811]/90 backdrop-blur-md border-b border-amber-500/15 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-zinc-800/80 text-amber-400 hover:bg-zinc-800"
            >
              <Menu size={20} />
            </button>

            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <span>روفي ستور للـعـطـور الـفـاخـرة</span>
                <span className="text-zinc-500">•</span>
                <span className="text-amber-400 font-serif">ROVY Haute Parfumerie ERP</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundOn ? "كتم التنبيهات الصوتية" : "تشغيل التنبيهات الصوتية"}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                soundOn
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden md:inline text-[11px]">
                {soundOn ? "الصوت مفعل" : "صامت"}
              </span>
            </button>

            {/* Quick POS Shortcut */}
            <Link
              href="/cashier"
              onClick={() => playSound("click")}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs shadow-md hover:brightness-110 transition"
            >
              <MonitorSmartphone size={15} />
              <span>شاشة الكاشير (POS)</span>
            </Link>

            {/* View Store */}
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-xl bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline text-[11px]">المتجر</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
