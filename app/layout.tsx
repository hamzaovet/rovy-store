import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import { StaffProvider } from "../context/StaffContext";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "روفي ستور | Rovy Store — بوتيك العطور الفاخرة والنيش",
  description:
    "أرقى العطور العالمية، التيسترات الأصلية المعتمدة وبدائل النيش الملكية. ثبات وفوحان استثنائي مع خدمة الدفع عند الاستلام والتجربة قبل الدفع.",
  keywords: [
    "روفي ستور",
    "عطور",
    "بدائل نيش",
    "عطور شتوية",
    "تيسترات أصلية",
    "عطور فرنسية",
    "Rovy Store",
    "Perfumes Egypt",
    "Winter Fragrances",
  ],
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen bg-[#07060a] text-[#f7f4ed] antialiased flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        <LanguageProvider>
          <StaffProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </StaffProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
