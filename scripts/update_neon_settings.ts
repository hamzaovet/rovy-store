import { prisma } from "../lib/prisma";

async function main() {
  const settings = await prisma.storeSettings.upsert({
    where: { id: "rovy_settings" },
    create: {
      id: "rovy_settings",
      storeNameAr: "روفي ستور — للعطور الفاخرة",
      storeNameEn: "Rovy Store — Haute Parfumerie",
      taglineAr: "أفخم العطور العالمية والبدائل المستوحاة بثبات وأصالة لا تُقاوم",
      taglineEn: "Exclusive Designer, Authentic Testers & Inspired Niche Fragrances",
      whatsappPhone: "01503012856",
      hotline: "01503012856",
      secondaryPhone: "01556718249",
      googleMapsUrl: "https://maps.app.goo.gl/z2QCHZzSuJaaNHPV7",
      addressAr: "6 أكتوبر — الحي الرابع (شارع مجلس الدولة) — الجيزة",
      addressEn: "6th of October — 4th District (Council of State St) — Giza",
      workingHoursAr: "يومياً من 10 صباحاً وحتى 12 منتصف الليل",
      workingHoursEn: "Daily from 10:00 AM to 12:00 Midnight",
      instagramHandle: "rovystore2",
      announcementAr: "✨ شحن مجاني لكافة محافظات مصر للطلبات فوق 1500 ج.م + عينات مجانية فاخرة ✨",
      announcementEn: "✨ Free express delivery across Egypt on orders over 1500 EGP + complimentary samples ✨",
      deliveryFee: 50.0,
      freeShippingThreshold: 1500.0,
    },
    update: {
      whatsappPhone: "01503012856",
      hotline: "01503012856",
      secondaryPhone: "01556718249",
      googleMapsUrl: "https://maps.app.goo.gl/z2QCHZzSuJaaNHPV7",
      addressAr: "6 أكتوبر — الحي الرابع (شارع مجلس الدولة) — الجيزة",
      addressEn: "6th of October — 4th District (Council of State St) — Giza",
      workingHoursAr: "يومياً من 10 صباحاً وحتى 12 منتصف الليل",
      workingHoursEn: "Daily from 10:00 AM to 12:00 Midnight",
      instagramHandle: "rovystore2",
    },
  });

  console.log("Successfully updated settings in Neon DB:", settings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
