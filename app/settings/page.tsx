"use client";

import React, { useState, useEffect } from "react";
import ErpLayout from "@/components/ErpLayout";
import { playSound } from "@/lib/sounds";
import { useStoreSettings } from "@/context/StoreSettingsContext";
import {
  Settings,
  Save,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Truck,
  Globe,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";

export default function SettingsPage() {
  const { settings, updateSettings, loading } = useStoreSettings();

  const [storeNameAr, setStoreNameAr] = useState("");
  const [storeNameEn, setStoreNameEn] = useState("");
  const [taglineAr, setTaglineAr] = useState("");
  const [taglineEn, setTaglineEn] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [hotline, setHotline] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [workingHoursAr, setWorkingHoursAr] = useState("");
  const [workingHoursEn, setWorkingHoursEn] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [announcementAr, setAnnouncementAr] = useState("");
  const [announcementEn, setAnnouncementEn] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("50");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("1500");

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (settings) {
      setStoreNameAr(settings.storeNameAr || "روفي ستور — للعطور الفاخرة");
      setStoreNameEn(settings.storeNameEn || "Rovy Store — Luxury Fragrances");
      setTaglineAr(settings.taglineAr || "");
      setTaglineEn(settings.taglineEn || "");
      setWhatsappPhone(settings.whatsappPhone || "");
      setHotline(settings.hotline || "");
      setAddressAr(settings.addressAr || "");
      setAddressEn(settings.addressEn || "");
      setWorkingHoursAr(settings.workingHoursAr || "");
      setWorkingHoursEn(settings.workingHoursEn || "");
      setInstagramHandle(settings.instagramHandle || "rovystore2");
      setAnnouncementAr(settings.announcementAr || "");
      setAnnouncementEn(settings.announcementEn || "");
      setDeliveryFee(settings.deliveryFee?.toString() || "50");
      setFreeShippingThreshold(settings.freeShippingThreshold?.toString() || "1500");
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    playSound("click");

    const ok = await updateSettings({
      storeNameAr,
      storeNameEn,
      taglineAr,
      taglineEn,
      whatsappPhone: whatsappPhone.trim(),
      hotline: hotline.trim(),
      addressAr,
      addressEn,
      workingHoursAr,
      workingHoursEn,
      instagramHandle: instagramHandle.trim(),
      announcementAr,
      announcementEn,
      deliveryFee: Number(deliveryFee) || 50,
      freeShippingThreshold: Number(freeShippingThreshold) || 1500,
    });

    setSaving(false);
    if (ok) {
      playSound("success");
      setSuccessMsg("تم حفظ كافة إعدادات المتجر وبيانات الاتصال بنجاح وظهرت في واجهة المتجر فوراً! ✨");
      setTimeout(() => setSuccessMsg(""), 5000);
    } else {
      alert("حدث خطأ أثناء حفظ الإعدادات، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <ErpLayout activeItem="settings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Settings size={22} />
            </span>
            <div>
              <h1 className="text-xl font-black font-serif text-gold-gradient">
                إعدادات المتجر وبيانات الاتصال والعناوين
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                تعديل رقم الهاتف، الواتساب، العناوين، مواعيد العمل، والشريط الإعلاني للمتجر بالكامل
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Contact Numbers & WhatsApp */}
          <div className="bg-[#0c0914] border border-amber-500/20 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-sm text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Phone size={17} className="text-amber-400" />
              <span>أرقام الهواتف وخدمة العملاء والواتساب (تظهر في الفوتر والترويسة)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  رقم الهاتف الأساسي للاتصال والفوتر:
                </label>
                <input
                  type="text"
                  required
                  value={hotline}
                  onChange={(e) => setHotline(e.target.value)}
                  placeholder="مثال: 010xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10.5px] text-zinc-500 mt-1 block">
                  يظهر في الترويسة العلوية وبند خدمة العملاء في الفوتر.
                </span>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  رقم الواتساب لاستقبال وتأكيد الأوردرات:
                </label>
                <input
                  type="text"
                  required
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10.5px] text-zinc-500 mt-1 block">
                  ترسل له سلة المشتريات والاستفسارات مباشرة بنقرة واحدة.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block text-zinc-300 font-medium mb-1 flex items-center gap-1.5">
                  <InstagramIcon size={14} className="text-amber-400" />
                  <span>معرف حساب إنستاجرام (Instagram Handle):</span>
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 rounded-r-xl bg-zinc-800 border border-r-0 border-zinc-700 text-zinc-400 font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="rovystore2"
                    className="w-full px-3.5 py-2.5 rounded-l-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-400" />
                  <span>مواعيد العمل وساعات خدمة العملاء:</span>
                </label>
                <input
                  type="text"
                  value={workingHoursAr}
                  onChange={(e) => setWorkingHoursAr(e.target.value)}
                  placeholder="يومياً من 10 صباحاً وحتى 12 منتصف الليل"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Address & Shipping Details */}
          <div className="bg-[#0c0914] border border-amber-500/20 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-sm text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <MapPin size={17} className="text-amber-400" />
              <span>العنوان، فروع التوزيع، وسياسة الشحن</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  العنوان ومناطق الشحن (عربي):
                </label>
                <input
                  type="text"
                  value={addressAr}
                  onChange={(e) => setAddressAr(e.target.value)}
                  placeholder="القاهرة والشيخ زايد — شحن سريع لجميع المحافظات"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  العنوان بالإنجليزية (English):
                </label>
                <input
                  type="text"
                  value={addressEn}
                  onChange={(e) => setAddressEn(e.target.value)}
                  placeholder="Cairo & Sheikh Zayed — Express Delivery All Egypt"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  تكلفة الشحن الافتراضية (ج.م):
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  الحد الأدنى للشحن المجاني (ج.م):
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10.5px] text-zinc-500 mt-1 block">
                  أي طلب يتجاوز هذا المبلغ يحصل على شحن مجاني تلقائياً.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Announcement Bar & Branding */}
          <div className="bg-[#0c0914] border border-amber-500/20 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-sm text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles size={17} className="text-amber-400" />
              <span>الشريط الإعلاني العلوي للموقع والهوية</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  نص الشريط الإعلاني (عربي):
                </label>
                <input
                  type="text"
                  value={announcementAr}
                  onChange={(e) => setAnnouncementAr(e.target.value)}
                  placeholder="✨ شحن مجاني للطلبات فوق 1500 ج.م + عينات مجانية فاخرة مع كل طلب ✨"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  نص الشريط الإعلاني بالإنجليزية:
                </label>
                <input
                  type="text"
                  value={announcementEn}
                  onChange={(e) => setAnnouncementEn(e.target.value)}
                  placeholder="✨ Free shipping on orders over 1500 EGP + complimentary luxury samples ✨"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Save size={16} />
              <span>{saving ? "جاري الحفظ..." : "حفظ وتطبيق الإعدادات على المتجر فوراً"}</span>
            </button>
          </div>
        </form>
      </div>
    </ErpLayout>
  );
}
