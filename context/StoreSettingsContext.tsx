"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface StoreSettingsData {
  storeNameAr: string;
  storeNameEn: string;
  taglineAr: string;
  taglineEn: string;
  whatsappPhone: string;
  hotline: string;
  secondaryPhone?: string;
  googleMapsUrl?: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursEn: string;
  instagramHandle: string;
  announcementAr: string;
  announcementEn: string;
  deliveryFee: number;
  freeShippingThreshold: number;
}

const defaultSettings: StoreSettingsData = {
  storeNameAr: "روفي ستور — بوتيك العطور الفاخرة",
  storeNameEn: "Rovy Store — Haute Parfumerie",
  taglineAr: "أفخم العطور العالمية والبدائل المستوحاة بثبات وأصالة لا تُقاوم",
  taglineEn: "Ultra-luxury designer & inspired niche fragrances",
  whatsappPhone: "01503012856",
  hotline: "01503012856",
  secondaryPhone: "01556718249",
  googleMapsUrl: "https://maps.app.goo.gl/z2QCHZzSuJaaNHPV7",
  addressAr: "مصر الجديدة — طريق العروبة ومساكن شيراتون (بالقرب من مطار القاهرة) — القاهرة",
  addressEn: "Heliopolis — El-Orouba Rd & Sheraton (Near Cairo Airport) — Cairo",
  workingHoursAr: "يومياً من 10 صباحاً وحتى 12 منتصف الليل",
  workingHoursEn: "Daily from 10:00 AM to 12:00 Midnight",
  instagramHandle: "rovystore2",
  announcementAr: "✨ شحن مجاني للطلبات فوق 1500 ج.م + عينات مجانية فاخرة مع كل طلب ✨",
  announcementEn: "✨ Free shipping on orders over 1500 EGP + complimentary luxury samples with every order ✨",
  deliveryFee: 50.0,
  freeShippingThreshold: 1500.0,
};

interface StoreSettingsContextType {
  settings: StoreSettingsData;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<StoreSettingsData>) => Promise<boolean>;
}

const StoreSettingsContext = createContext<StoreSettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
  updateSettings: async () => false,
});

export function StoreSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings({
            ...defaultSettings,
            ...data.settings,
          });
        }
      }
    } catch (e) {
      console.error("Failed to fetch store settings:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<StoreSettingsData>): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings({
            ...defaultSettings,
            ...data.settings,
          });
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error("Failed to update store settings:", e);
      return false;
    }
  };

  return (
    <StoreSettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
        updateSettings,
      }}
    >
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings() {
  return useContext(StoreSettingsContext);
}
