"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, Zap, Eye, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const isAr = lang === "ar";

  // Badges map
  const typeBadgeMap: Record<string, { textAr: string; textEn: string; color: string }> = {
    ORIGINAL: {
      textAr: "أصلي 100%",
      textEn: "100% Original",
      color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    },
    TESTER: {
      textAr: "تيستر أصلي",
      textEn: "Authentic Tester",
      color: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    },
    HIGH_COPY: {
      textAr: "ماستر كوبي فاخر",
      textEn: "Master High Copy",
      color: "bg-purple-500/20 border-purple-500/40 text-purple-300",
    },
    INSPIRED: {
      textAr: "بديل نيش مستوحى",
      textEn: "Inspired Niche",
      color: "bg-blue-500/20 border-blue-500/40 text-blue-300",
    },
  };

  const badgeInfo = typeBadgeMap[product.type] || typeBadgeMap["INSPIRED"];

  return (
    <div className="group glass-luxury rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-zinc-950 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={isAr ? product.nameAr : product.nameEn}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${badgeInfo.color}`}
          >
            {isAr ? badgeInfo.textAr : badgeInfo.textEn}
          </span>

          {product.isWinter && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300 backdrop-blur-md flex items-center gap-1">
              <span>❄️</span>
              <span>{isAr ? "شتوي فاخر" : "Winter 1"}</span>
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-amber-500 hover:text-black"
          title="Quick View"
        >
          <Eye size={16} />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Volume */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold text-amber-400/90 tracking-wider uppercase text-[11px]">
              {isAr ? product.brandAr : product.brandEn}
            </span>
            <span className="text-[11px] text-zinc-500">
              {product.volume} • {product.concentration}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-base text-zinc-100 group-hover:text-amber-300 transition line-clamp-1">
              {isAr ? product.nameAr : product.nameEn}
            </h3>
          </Link>

          {/* Key Olfactory Preview */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </p>

          {/* Scent Notes Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/20 text-[10px] text-amber-200">
              {isAr ? "المقدمة: " : "Top: "}
              {isAr ? product.topNotesAr.split("،")[0] : product.topNotesEn.split(",")[0]}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700/60 text-[10px] text-zinc-300">
              {isAr ? "القاعدة: " : "Base: "}
              {isAr ? product.baseNotesAr.split("،")[0] : product.baseNotesEn.split(",")[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-black text-lg text-gold-gradient">
                  {product.price} ج.م
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-zinc-500 line-through">
                    {product.originalPrice} ج.م
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:bg-amber-500/10 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <ShoppingBag size={14} />
              <span>{t("btn_add_to_cart")}</span>
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="py-2.5 px-3 rounded-xl btn-gold text-xs font-bold flex items-center justify-center gap-1.5 text-center shadow-md"
            >
              <Zap size={14} />
              <span>{isAr ? "تفاصيل والطلب" : "Details & Buy"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
