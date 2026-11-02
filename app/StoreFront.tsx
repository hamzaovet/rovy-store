"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/ProductCard";
import {
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Phone,
  MessageCircle,
} from "lucide-react";
import InstagramIcon from "../components/InstagramIcon";

interface StoreFrontProps {
  initialProducts: any[];
  categories: any[];
  reviews: any[];
}

export default function StoreFront({
  initialProducts,
  categories,
  reviews,
}: StoreFrontProps) {
  const { lang, dir, t } = useLanguage();
  const isAr = lang === "ar";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Winter Collection specifically
  const winterProducts = useMemo(() => {
    return initialProducts.filter((p) => p.isWinter);
  }, [initialProducts]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all") {
          if (p.category?.slug !== selectedCategory) return false;
        }

        // Type filter
        if (selectedType !== "all") {
          if (p.type !== selectedType) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName =
            p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
          const matchBrand =
            p.brandAr.toLowerCase().includes(q) || p.brandEn.toLowerCase().includes(q);
          const matchNotes =
            p.topNotesAr.toLowerCase().includes(q) ||
            p.heartNotesAr.toLowerCase().includes(q) ||
            p.baseNotesAr.toLowerCase().includes(q) ||
            p.descriptionAr.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchNotes) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, selectedType, searchQuery, sortBy]);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 border-b border-amber-500/15">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-purple-900/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles size={14} className="text-amber-400" />
              <span>
                {isAr
                  ? "أحدث إصدارات شتاء 2026 — تشكيلة Winter 1 الفاخرة"
                  : "Winter 2026 Haute Parfumerie Release"}
              </span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-gold-gradient leading-[1.15]">
              {t("hero_title")}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-light">
              {t("hero_subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#winter-collection"
                className="px-6 py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center gap-2 shadow-xl"
              >
                <span>{t("hero_cta_winter")}</span>
                {dir === "rtl" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>

              <a
                href="#all-perfumes"
                className="px-6 py-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-sm font-bold transition flex items-center gap-2"
              >
                <span>{t("hero_cta_all")}</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-xs text-zinc-400">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-black text-amber-400 text-lg">100%</span>
                <span>{isAr ? "ضمان تجربة قبل الدفع" : "Inspect Before Pay"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1 border-x border-zinc-800 px-2">
                <span className="font-black text-amber-400 text-lg">+24h</span>
                <span>{isAr ? "ثبات وفوحان فائق" : "Extreme Longevity"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-black text-amber-400 text-lg">48h</span>
                <span>{isAr ? "شحن سريع لكافة مصر" : "Express All Egypt"}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-luxury-gold p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/perfumes/hero-perfume-1.jpg"
                  alt="Rovy Store Luxury Perfume"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Floating Glass Label */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl glass-luxury border border-amber-500/30 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                    {isAr ? "العطر الأكثر طلباً هذا الشتاء" : "Winter Bestseller"}
                  </span>
                  <h3 className="font-serif font-black text-xl text-zinc-100 mt-0.5">
                    Aura Booster (100 ml)
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="font-black text-gold-gradient text-lg">850 ج.م</span>
                    <span className="text-xs text-zinc-500 line-through">1100 ج.م</span>
                    <Link
                      href="/product/aura-booster"
                      className="px-3 py-1 rounded-lg btn-gold text-xs font-bold"
                    >
                      {isAr ? "اطلب الآن" : "Order Now"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WINTER COLLECTION (Zidances Inspired Section) */}
      <section id="winter-collection" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
              <span>❄️</span>
              <span>{isAr ? "تشكيلة الشتاء الفاخرة 2026" : "Winter 1 Luxury Collection"}</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
              {isAr ? "عطور الشتاء الأكثر دفئاً وجاذبية" : "The Most Decadent Winter Warmers"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {isAr
                ? "مستوحاة من أرقى خلطات النيش العالمية: خشب الأكيجالاوود، التبغ الكوبي، والكونياك المعتق"
                : "Inspired by supreme niche formulations: Akigalawood, Cuban tobacco, aged cognac & bourbon vanilla."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300 font-semibold px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
              {winterProducts.length} {isAr ? "عطور شتوية حصرية" : "Winter Editions"}
            </span>
          </div>
        </div>

        {/* Winter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {winterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FULL CATALOG WITH ADVANCED FILTERING */}
      <section id="all-perfumes" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 border-t border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            {isAr ? "الكتالوج الملكي الشامل" : "The Complete Royalty Catalog"}
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-gold-gradient mt-1">
            {isAr ? "تصفح أفخم العطور حسب اختيارك" : "Curated Haute Parfumerie"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {isAr
              ? "ابحث حسب المكونات، الدار العطرية، أو نوع الأصالة (أصلي، تيستر، ماستر كوبي، بديل نيش)"
              : "Filter by notes, fragrance house, or authenticity grade (Original, Tester, Master Mirror, Niche Inspired)"}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-luxury rounded-2xl p-4 sm:p-6 mb-8 border border-amber-500/20 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "rtl" ? "right-3.5" : "left-3.5"
                } text-zinc-400`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className={`w-full py-3 ${
                  dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"
                } rounded-xl bg-zinc-900/90 border border-zinc-700/80 focus:border-amber-400 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    dir === "rtl" ? "left-3.5" : "right-3.5"
                  } text-xs text-zinc-400 hover:text-white`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Authenticity Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-semibold text-zinc-200 outline-none focus:border-amber-400"
            >
              <option value="all">{isAr ? "كافة درجات الأصالة" : "All Authenticity Grades"}</option>
              <option value="ORIGINAL">{isAr ? "أصلي 100% (Original)" : "100% Original"}</option>
              <option value="TESTER">{isAr ? "تيستر أصلي بالكرتونة (Tester)" : "Authentic Tester"}</option>
              <option value="HIGH_COPY">{isAr ? "ماستر كوبي فاخر (Master Mirror)" : "Master Mirror Copy"}</option>
              <option value="INSPIRED">{isAr ? "بديل نيش مستوحى (Inspired)" : "Inspired Niche"}</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-semibold text-zinc-200 outline-none focus:border-amber-400"
            >
              <option value="featured">{t("sort_featured")}</option>
              <option value="price-low">{t("sort_price_low")}</option>
              <option value="price-high">{t("sort_price_high")}</option>
              <option value="rating">{isAr ? "الأعلى تقييماً" : "Top Rated"}</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedCategory === "all"
                  ? "btn-gold"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-amber-500/40"
              }`}
            >
              {t("filter_all")}
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === c.slug
                    ? "btn-gold"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                }`}
              >
                {isAr ? c.nameAr : c.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/40 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 text-sm mb-2">
              {isAr ? "لا توجد عطور تطابق خيارات البحث الحالية" : "No fragrances found matching your search."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="text-xs text-amber-400 underline font-semibold"
            >
              {isAr ? "إعادة ضبط الفلاتر" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* VERIFIED REVIEWS SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            {isAr ? "آراء عملاء روفي ستور" : "Client Experiences"}
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient mt-1">
            {isAr ? "ثقة وتجارب نعتز بها" : "Loved by Perfume Enthusiasts"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="glass-luxury p-5 rounded-2xl border border-amber-500/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xs text-zinc-100">
                    {r.customerName}
                  </h4>
                  <p className="text-[10px] text-zinc-500">{r.city}</p>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>{isAr ? "مشترٍ موثق" : "Verified Buyer"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM BANNER */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-luxury-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {isAr ? "تابعنا على إنستغرام" : "Join Our Community on Instagram"}
            </span>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
              @rovystore2
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              {isAr
                ? "عروض أسبوعية حصرية، ريفيوز مباشرة للعطور، ونصائح لاختيار عطرك المثالي حسب شخصيتك ومناسبتك."
                : "Weekly exclusive drops, live perfume reviews, and expert layering advice."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/rovystore2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center gap-2 shadow-lg"
            >
              <InstagramIcon size={18} />
              <span>{isAr ? "متابعة الحساب الآن" : "Follow @rovystore2"}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
