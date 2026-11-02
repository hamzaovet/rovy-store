"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  dir: "rtl" | "ltr";
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand & Header
    store_name: "روفي ستور",
    store_subname: "بوتيك العطور الفاخرة",
    nav_home: "الرئيسية",
    nav_winter: "تشكيلة الشتاء ❄️",
    nav_all_perfumes: "جميع العطور",
    nav_oud: "العود والشرقيات",
    nav_testers: "تيسترات أصلية",
    nav_card: "كارت المتجر",
    nav_download: "تحميل التطبيق",
    nav_dashboard: "لوحة التحكم",
    nav_login: "دخول المالك والإدارة",
    cart_title: "سلة المشتريات",
    cart_empty: "سلة المشتريات فارغة حتى الآن",
    cart_explore: "تصفح أفخم العطور",
    free_shipping_notice: "شحن مجاني لكافة محافظات مصر للطلبات فوق 1500 ج.م",
    
    // Hero & Badges
    hero_title: "فخامة تدوم وأصالة لا تُضاهى",
    hero_subtitle: "استكشف أرقى العطور العالمية، التيسترات الأصلية وبدائل النيش الملكية المستوحاة من أكبر دور العطور الباريسية.",
    hero_cta_winter: "تصفح تشكيلة الشتاء ❄️",
    hero_cta_all: "استكشف الكتالوج الكامل",
    badge_original: "أصلي 100%",
    badge_tester: "تيستر أصلي",
    badge_high_copy: "ماستر كوبي فاخر",
    badge_inspired: "بديل نيش مستوحى",
    badge_winter: "تشكيلة الشتاء",
    badge_bestseller: "الأكثر مبيعاً",
    
    // Product Details
    details_pyramid: "الهرم العطري",
    details_top_notes: "المقدمة العطرية (Top Notes)",
    details_heart_notes: "قلب العطر (Heart Notes)",
    details_base_notes: "قاعدة العطر (Base Notes)",
    details_ingredients: "المكونات والتركيبة",
    details_specs: "مواصفات العطر",
    details_brand: "الدار العطرية / البراند",
    details_authenticity: "درجة الجودة والأصالة",
    details_concentration: "التركيز العطري",
    details_volume: "حجم الزجاجة",
    details_season: "الموسم المناسب",
    details_gender: "الفئة",
    details_longevity: "الثبات",
    details_sillage: "الفوحان",
    details_price: "السعر",
    details_save: "وفر",
    details_in_stock: "متوفر بالمخزون جاهز للشحن",
    details_out_of_stock: "نفد مؤقتاً",
    btn_add_to_cart: "أضف إلى السلة",
    btn_buy_now: "شراء فوري وسريع",
    btn_order_whatsapp: "طلب مباشر عبر واتساب",
    btn_continue_shopping: "متابعة التسوق",
    
    // Filters & Tabs
    filter_all: "الكل",
    filter_winter: "❄️ عطور الشتاء",
    filter_oud: "🪵 العود والشرقيات",
    filter_french: "✨ الفرنسية والعالمية",
    filter_niche: "🧪 بدائل النيش",
    filter_musk: "🌸 المسك والفانيليا",
    sort_featured: "المقترحة",
    sort_price_low: "الأقل سعراً",
    sort_price_high: "الأعلى سعراً",
    search_placeholder: "ابحث عن عطرك المفضل، براند، أو مكونات...",

    // Checkout
    checkout_title: "إتمام الطلب الراقي",
    checkout_customer_info: "بيانات العميل والشحن",
    checkout_name: "الاسم بالكامل",
    checkout_phone: "رقم الهاتف / واتساب",
    checkout_city: "المحافظة / المدينة",
    checkout_address: "العنوان التفصيلي (المنطقة - الشارع - رقم العقار)",
    checkout_notes: "ملاحظات إضافية على الطلب أو وقت الاستلام",
    checkout_payment_method: "طريقة الدفع",
    checkout_cod: "الدفع نقداً عند الاستلام (COD)",
    checkout_instapay: "إنستاباي / فودافون كاش (InstaPay)",
    checkout_order_summary: "ملخص الطلب",
    checkout_subtotal: "إجمالي المنتجات",
    checkout_delivery: "مصاريف الشحن",
    checkout_free_delivery: "شحن مجاني",
    checkout_total: "المبلغ الإجمالي للدفع",
    checkout_submit: "تأكيد الطلب وشحنه الآن",
    checkout_submitting: "جاري تأكيد طلبك...",
    checkout_success_title: "تم استلام طلبك الملكي بنجاح! 🎉",
    checkout_success_desc: "رقم طلبك هو: ",
    checkout_whatsapp_track: "متابعة الطلب عبر واتساب المطعم",

    // Guarantees
    guarantee_title: "الضمان الذهبي لروفي ستور",
    guarantee_inspection: "فحص العبوة وتجربتها قبل الاستلام مع المندوب",
    guarantee_lasting: "ضمان ثبات وفوحان يدوم طويلاً",
    guarantee_shipping: "تغليف هدايا فاخر وشحن مبرد وآمن",

    // Auth & Dashboard
    login_title: "بوابة المالك والتشغيل",
    login_subtitle: "أدخل اسم المستخدم، كلمة المرور، وكود الأمان PIN",
    login_user: "اسم المستخدم",
    login_password: "كلمة المرور",
    login_pin: "كود الأمان السري (PIN)",
    login_submit: "دخول المنظومة",
    login_error: "بيانات الدخول غير صحيحة أو تم إدخال PIN خاطئ",
    login_lockdown_error: "تم تفعيل وضع طوارئ المالك! جميع الحسابات معطلة حالياً",
    
    dashboard_title: "لوحة التحكم الشاملة",
    dashboard_emergency_lockdown: "حالة إغلاق الطوارئ الشامل",
    dashboard_emergency_desc: "تعطيل فوري لجميع حسابات الموظفين والمديرين بنقرة واحدة (صلاحية المالك المايسترو فقط)",
    dashboard_lockdown_active: "وضع الطوارئ مُفعّل (الحسابات معطلة)",
    dashboard_lockdown_inactive: "النظام يعمل بشكل طبيعي",
    dashboard_toggle_lockdown: "تبديل حالة الطوارئ",
    dashboard_total_sales: "إجمالي المبيعات",
    dashboard_total_orders: "إجمالي الطلبات",
    dashboard_products_count: "العطور المعروضة",
    dashboard_users_count: "حسابات التشغيل",
  },
  en: {
    // Brand & Header
    store_name: "ROVY STORE",
    store_subname: "Haute Parfumerie Boutique",
    nav_home: "Home",
    nav_winter: "Winter Line ❄️",
    nav_all_perfumes: "All Fragrances",
    nav_oud: "Royal Oud",
    nav_testers: "Authentic Testers",
    nav_card: "VIP Card",
    nav_download: "Get App",
    nav_dashboard: "Dashboard",
    nav_login: "Executive Login",
    cart_title: "Shopping Bag",
    cart_empty: "Your luxury shopping bag is currently empty",
    cart_explore: "Discover Fragrances",
    free_shipping_notice: "Complimentary express shipping across Egypt on orders over 1500 EGP",
    
    // Hero & Badges
    hero_title: "Unrivaled Elegance, Eternal Sillage",
    hero_subtitle: "Explore high-end designer icons, authentic testers, and inspired niche masterpieces crafted from the finest Parisian oils.",
    hero_cta_winter: "Explore Winter Collection ❄️",
    hero_cta_all: "View Full Catalog",
    badge_original: "100% Original",
    badge_tester: "Authentic Tester",
    badge_high_copy: "Master Mirror Copy",
    badge_inspired: "Inspired Niche Luxury",
    badge_winter: "Winter Collection",
    badge_bestseller: "Best Seller",
    
    // Product Details
    details_pyramid: "Olfactory Pyramid",
    details_top_notes: "Top Notes (Opening)",
    details_heart_notes: "Heart Notes (Middle)",
    details_base_notes: "Base Notes (Dry Down)",
    details_ingredients: "Ingredients & Formulation",
    details_specs: "Specifications",
    details_brand: "Fragrance House / Brand",
    details_authenticity: "Quality & Authenticity",
    details_concentration: "Concentration",
    details_volume: "Bottle Volume",
    details_season: "Season",
    details_gender: "Category",
    details_longevity: "Longevity",
    details_sillage: "Sillage / Projection",
    details_price: "Price",
    details_save: "Save",
    details_in_stock: "In Stock & Ready to Ship",
    details_out_of_stock: "Temporarily Sold Out",
    btn_add_to_cart: "Add to Bag",
    btn_buy_now: "Instant Buy Now",
    btn_order_whatsapp: "Order via WhatsApp",
    btn_continue_shopping: "Continue Shopping",
    
    // Filters & Tabs
    filter_all: "All",
    filter_winter: "❄️ Winter Warmers",
    filter_oud: "🪵 Royal Oud",
    filter_french: "✨ French Designer",
    filter_niche: "🧪 Inspired Niche",
    filter_musk: "🌸 Musk & Vanilla",
    sort_featured: "Featured",
    sort_price_low: "Price: Low to High",
    sort_price_high: "Price: High to Low",
    search_placeholder: "Search fragrances, brands, or notes...",

    // Checkout
    checkout_title: "Complete Your Luxury Order",
    checkout_customer_info: "Shipping & Contact Details",
    checkout_name: "Full Name",
    checkout_phone: "Phone / WhatsApp Number",
    checkout_city: "City / Governorate",
    checkout_address: "Delivery Address (Area, Street, Building)",
    checkout_notes: "Special delivery instructions or timing",
    checkout_payment_method: "Payment Method",
    checkout_cod: "Cash on Delivery (COD)",
    checkout_instapay: "InstaPay / Mobile Wallet",
    checkout_order_summary: "Order Summary",
    checkout_subtotal: "Items Subtotal",
    checkout_delivery: "Express Shipping",
    checkout_free_delivery: "FREE",
    checkout_total: "Total Amount Due",
    checkout_submit: "Confirm & Dispatch Order",
    checkout_submitting: "Processing order...",
    checkout_success_title: "Your Order Has Been Placed! 🎉",
    checkout_success_desc: "Order Reference: ",
    checkout_whatsapp_track: "Track via WhatsApp Concierge",

    // Guarantees
    guarantee_title: "The Rovy Store Golden Promise",
    guarantee_inspection: "Inspect & test before paying the courier",
    guarantee_lasting: "Guaranteed long-lasting projection & sillage",
    guarantee_shipping: "Luxury gift packaging & insured delivery",

    // Auth & Dashboard
    login_title: "Executive Portal",
    login_subtitle: "Enter Username, Password, and Security PIN",
    login_user: "Username",
    login_password: "Password",
    login_pin: "Security PIN",
    login_submit: "Access System",
    login_error: "Invalid credentials or incorrect security PIN",
    login_lockdown_error: "Emergency lockdown active! Only Owner Maestro can sign in.",
    
    dashboard_title: "Operations & Management",
    dashboard_emergency_lockdown: "Master Emergency Lockdown",
    dashboard_emergency_desc: "Instantly deactivate all staff and manager accounts with a single toggle (Owner Only)",
    dashboard_lockdown_active: "Lockdown Active (All Accounts Disabled)",
    dashboard_lockdown_inactive: "System Running Normally",
    dashboard_toggle_lockdown: "Toggle Lockdown",
    dashboard_total_sales: "Total Revenue",
    dashboard_total_orders: "Total Orders",
    dashboard_products_count: "Fragrances",
    dashboard_users_count: "Active Staff",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("rovy_lang") as Language;
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("rovy_lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const toggleLanguage = () => {
    setLanguage(lang === "ar" ? "en" : "ar");
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations["ar"][key] || key;
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
