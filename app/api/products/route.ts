import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: "فشل استرجاع المنتجات", details: error.message },
      { status: 500 }
    );
  }
}
