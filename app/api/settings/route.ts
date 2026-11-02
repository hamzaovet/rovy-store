import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let settings = await prisma.storeSettings.findUnique({
      where: { id: "rovy_settings" },
    });

    if (!settings) {
      settings = await prisma.storeSettings.create({
        data: {
          id: "rovy_settings",
          storeNameAr: "روفي ستور — للعطور الفاخرة",
          storeNameEn: "Rovy Store — Luxury Fragrances",
          whatsappPhone: "01000000000",
          hotline: "01000000000",
          addressAr: "القاهرة والشيخ زايد — شحن سريع لجميع المحافظات",
          addressEn: "Cairo & Sheikh Zayed — Express Delivery All Egypt",
          workingHoursAr: "يومياً من 10 صباحاً وحتى 12 منتصف الليل",
          workingHoursEn: "Daily from 10:00 AM to 12:00 Midnight",
          instagramHandle: "rovystore2",
          deliveryFee: 50.0,
          freeShippingThreshold: 1500.0,
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json(
      { error: "فشل استرجاع إعدادات المتجر", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const updateData: any = {};
    if (body.storeNameAr !== undefined) updateData.storeNameAr = body.storeNameAr;
    if (body.storeNameEn !== undefined) updateData.storeNameEn = body.storeNameEn;
    if (body.taglineAr !== undefined) updateData.taglineAr = body.taglineAr;
    if (body.taglineEn !== undefined) updateData.taglineEn = body.taglineEn;
    if (body.whatsappPhone !== undefined) updateData.whatsappPhone = body.whatsappPhone.trim();
    if (body.hotline !== undefined) updateData.hotline = body.hotline.trim();
    if (body.addressAr !== undefined) updateData.addressAr = body.addressAr;
    if (body.addressEn !== undefined) updateData.addressEn = body.addressEn;
    if (body.workingHoursAr !== undefined) updateData.workingHoursAr = body.workingHoursAr;
    if (body.workingHoursEn !== undefined) updateData.workingHoursEn = body.workingHoursEn;
    if (body.instagramHandle !== undefined) updateData.instagramHandle = body.instagramHandle.trim();
    if (body.announcementAr !== undefined) updateData.announcementAr = body.announcementAr;
    if (body.announcementEn !== undefined) updateData.announcementEn = body.announcementEn;
    if (body.deliveryFee !== undefined) updateData.deliveryFee = Number(body.deliveryFee);
    if (body.freeShippingThreshold !== undefined) {
      updateData.freeShippingThreshold = Number(body.freeShippingThreshold);
    }

    const settings = await prisma.storeSettings.upsert({
      where: { id: "rovy_settings" },
      update: updateData,
      create: {
        id: "rovy_settings",
        ...updateData,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { error: "فشل حفظ إعدادات المتجر", details: error.message },
      { status: 500 }
    );
  }
}
