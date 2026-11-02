import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      notes,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
    } = body;

    if (!customerName || !customerPhone || !customerAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: "بيانات العميل أو المنتجات غير مكتملة" },
        { status: 400 }
      );
    }

    const orderNumber = `ROVY-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        customerCity: customerCity || "القاهرة والجيزة",
        customerAddress,
        notes: notes || "",
        items: JSON.stringify(items),
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee),
        totalAmount: Number(totalAmount),
        paymentMethod: paymentMethod || "COD",
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حفظ الطلب", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: "فشل استرجاع الطلبات", details: error.message },
      { status: 500 }
    );
  }
}
