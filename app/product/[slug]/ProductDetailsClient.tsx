"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { useCart } from "../../../context/CartContext";
import { useStoreSettings } from "../../../context/StoreSettingsContext";
import ProductCard from "../../../components/ProductCard";
import {
  Sparkles,
  ShoppingBag,
  Zap,
  MessageCircle,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Wind,
  Layers,
  Heart,
  Droplets,
  Share2,
  ChevronRight,
  ChevronLeft,
  Truck,
  Plus,
  Minus,
} from "lucide-react";

interface ProductDetailsClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { lang, dir, t } = useLanguage();
  const { addToCart } = useCart();
  const { settings } = useStoreSettings();
  const router = useRouter();
  const isAr = lang === "ar";

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Authenticity badge
  const typeBadgeMap: Record<string, { textAr: string; textEn: string; descAr: string; descEn: string; color: string }> = {
    ORIGINAL: {
      textAr: "أصلي 100% بالباركود",
      textEn: "100% Authentic Original",
      descAr: "منتج أصلي معتمد بكامل العبوة والباركود والسريال الدولي.",
      descEn: "Certified genuine fragrance with batch code and authentic retail packaging.",
      color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    },
    TESTER: {
      textAr: "تيستر أصلي بالكرتونة",
      textEn: "Authentic Original Tester",
      descAr: "نفس العطر والزجاجة الأصلية المخصصة للمعارض، بتركيز وثبات متطابق وسعر موفر.",
      descEn: "Original store tester bottle with identical fragrance oil & performance at substantial savings.",
      color: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    },
    HIGH_COPY: {
      textAr: "ماستر كوبي فاخر (Mirror 1:1)",
      textEn: "Master Mirror Copy 1:1",
      descAr: "أعلى درجة محاكاة دقيقة مطابقة للأصل شكلاً ورائحة وثباتاً بنسبة تتجاوز 95%.",
      descEn: "Highest-grade mirror replica matching original scent profile, bottle, and weight over 95%.",
      color: "bg-purple-500/20 border-purple-500/40 text-purple-300",
    },
    INSPIRED: {
      textAr: "بديل نيش مستوحى",
      textEn: "Bespoke Inspired Niche",
      descAr: "تركيبة عطرية حصرية من روفي ستور مستوحاة من العطر العالمي بزيوت فرنسية نقية.",
      descEn: "Exclusive Rovy Store formulation inspired by the iconic scent using pure Grasse oils.",
      color: "bg-blue-500/20 border-blue-500/40 text-blue-300",
    },
  };

  const badgeInfo = typeBadgeMap[product.type] || typeBadgeMap["INSPIRED"];

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isAr ? product.nameAr : product.nameEn,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappText = encodeURIComponent(
    `مساء الخير، أود الاستفسار والطلب لعطر:\n` +
      `*${product.nameAr} (${product.nameEn})*\n` +
      `البراند: ${product.brandAr}\n` +
      `درجة الأصالة: ${badgeInfo.textAr}\n` +
      `الحجم والتركيز: ${product.volume} - ${product.concentration}\n` +
      `السعر: ${product.price} ج.م\n` +
      `الكمية المطلوبة: ${quantity}\n` +
      `رابط العطر: ${typeof window !== "undefined" ? window.location.href : ""}`
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
        <Link href="/" className="hover:text-amber-400">
          {t("nav_home")}
        </Link>
        <span>/</span>
        <Link href="/#all-perfumes" className="hover:text-amber-400">
          {isAr ? product.category?.nameAr : product.category?.nameEn}
        </Link>
        <span>/</span>
        <span className="text-amber-300 font-medium">
          {isAr ? product.nameAr : product.nameEn}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Imagery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden glass-luxury-gold border border-amber-500/30 shadow-2xl bg-zinc-950">
            <Image
              src={product.image}
              alt={isAr ? product.nameAr : product.nameEn}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${badgeInfo.color}`}
              >
                {isAr ? badgeInfo.textAr : badgeInfo.textEn}
              </span>

              {product.isWinter && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300 backdrop-blur-md flex items-center gap-1.5">
                  <span>❄️</span>
                  <span>{isAr ? "تشكيلة الشتاء الفاخرة" : "Winter 1 Edition"}</span>
                </span>
              )}
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 backdrop-blur-md hover:bg-amber-500 hover:text-black transition"
              title="Share Fragrance"
            >
              <Share2 size={18} />
            </button>
            {copied && (
              <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold">
                {isAr ? "تم نسخ الرابط!" : "Link Copied!"}
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-400 font-serif uppercase tracking-widest text-xs font-bold">
                {isAr ? product.brandAr : product.brandEn}
              </span>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-500 text-xs">
                  ({product.reviewsCount} {isAr ? "تقييم حقيقي" : "reviews"})
                </span>
              </div>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-100">
              {isAr ? product.nameAr : product.nameEn}
            </h1>
            <p className="font-sans text-sm text-zinc-400 mt-1">
              {isAr ? product.nameEn : product.nameAr}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="glass-luxury p-4 rounded-2xl border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-400 block mb-1">{t("details_price")}</span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif font-black text-3xl text-gold-gradient">
                  {product.price} ج.م
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-zinc-500 line-through">
                    {product.originalPrice} ج.م
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    {t("details_save")} {product.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={14} />
                <span>{t("details_in_stock")}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-zinc-300 leading-relaxed font-light">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </div>

          {/* Quality & Authenticity Details */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck size={16} />
              <span>{isAr ? "ضمان درجة الجودة والأصالة:" : "Authenticity Guarantee:"} {isAr ? badgeInfo.textAr : badgeInfo.textEn}</span>
            </div>
            <p className="text-zinc-400">
              {isAr ? badgeInfo.descAr : badgeInfo.descEn}
            </p>
          </div>

          {/* Volume & Concentration Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">{t("details_volume")}</span>
              <span className="font-bold text-zinc-200 mt-0.5 block">{product.volume}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">{t("details_concentration")}</span>
              <span className="font-bold text-zinc-200 mt-0.5 block">{product.concentration}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">{t("details_longevity")}</span>
              <span className="font-bold text-amber-300 mt-0.5 block">{product.longevityAr}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">{t("details_sillage")}</span>
              <span className="font-bold text-amber-300 mt-0.5 block">{product.sillageAr}</span>
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold text-sm text-amber-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-4 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag size={18} />
                <span>{t("btn_add_to_cart")}</span>
              </button>
            </div>

            {/* Direct Buy & WhatsApp Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleInstantBuy}
                className="py-3 px-4 rounded-xl bg-amber-500/15 border border-amber-400/40 hover:bg-amber-500/25 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Zap size={16} />
                <span>{t("btn_buy_now")}</span>
              </button>

              <a
                href={`https://wa.me/${(settings.whatsappPhone || "01000000000").replace(/\D/g, "").replace(/^0/, "20")}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition text-center"
              >
                <MessageCircle size={16} />
                <span>{t("btn_order_whatsapp")}</span>
              </a>
            </div>
          </div>

          {/* The Rovy Golden Guarantee Banner */}
          <div className="p-4 rounded-2xl glass-luxury border border-amber-500/25 space-y-2">
            <h4 className="font-serif font-bold text-xs text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>{t("guarantee_title")}</span>
            </h4>
            <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside font-light">
              <li>{t("guarantee_inspection")}</li>
              <li>{t("guarantee_lasting")}</li>
              <li>{t("guarantee_shipping")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* OLFACTORY PYRAMID & INGREDIENTS SECTION (Zidances Masterpiece) */}
      <section className="mt-16 pt-12 border-t border-zinc-800">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            {isAr ? "أسرار التركيبة الفاخرة" : "The Olfactory Architecture"}
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient mt-1">
            {t("details_pyramid")}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {isAr
              ? "تدرج نوتات العطر خطوة بخطوة من الانتعاش الافتتاحي حتى استقرار القاعدة الملكية"
              : "The precise note breakdown from opening vibrancy to deep royal dry down"}
          </p>
        </div>

        {/* Pyramid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Top Notes */}
          <div className="glass-luxury p-6 rounded-2xl border border-amber-500/20 text-center relative overflow-hidden group hover:border-amber-400/50 transition">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Sparkles size={22} />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              {isAr ? "الانطباع الأول (15 دقيقة الأولى)" : "Opening (First 15 mins)"}
            </span>
            <h3 className="font-serif font-bold text-base text-zinc-100 mb-2">
              {t("details_top_notes")}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {isAr ? product.topNotesAr : product.topNotesEn}
            </p>
          </div>

          {/* Heart Notes */}
          <div className="glass-luxury-gold p-6 rounded-2xl border border-amber-500/35 text-center relative overflow-hidden group hover:border-amber-400/60 transition shadow-xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto mb-4">
              <Heart size={22} />
            </div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
              {isAr ? "جوهر وروح العطر (2 إلى 6 ساعات)" : "Core (2 to 6 hours)"}
            </span>
            <h3 className="font-serif font-bold text-base text-zinc-100 mb-2">
              {t("details_heart_notes")}
            </h3>
            <p className="text-xs text-zinc-200 leading-relaxed font-light">
              {isAr ? product.heartNotesAr : product.heartNotesEn}
            </p>
          </div>

          {/* Base Notes */}
          <div className="glass-luxury p-6 rounded-2xl border border-amber-500/20 text-center relative overflow-hidden group hover:border-amber-400/50 transition">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Layers size={22} />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              {isAr ? "الثبات والاستقرار (24+ ساعة)" : "Dry Down (24+ hours)"}
            </span>
            <h3 className="font-serif font-bold text-base text-zinc-100 mb-2">
              {t("details_base_notes")}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {isAr ? product.baseNotesAr : product.baseNotesEn}
            </p>
          </div>
        </div>

        {/* Ingredients & Formulation Box */}
        {product.ingredientsAr && (
          <div className="mt-8 max-w-5xl mx-auto glass-luxury p-6 rounded-2xl border border-zinc-800 text-xs">
            <h4 className="font-serif font-bold text-sm text-amber-300 mb-2 flex items-center gap-2">
              <Droplets size={16} />
              <span>{t("details_ingredients")}</span>
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              {isAr ? product.ingredientsAr : product.ingredientsEn}
            </p>
          </div>
        )}
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              {isAr ? "عطور مقترحة لذوقك الفاخر" : "You May Also Love"}
            </span>
            <h2 className="font-serif font-black text-2xl text-gold-gradient mt-1">
              {isAr ? "عطور من نفس العائلة العطرية" : "Complementary Masterpieces"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
