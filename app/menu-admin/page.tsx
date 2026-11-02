"use client";

import React, { useState, useEffect } from "react";
import ErpLayout from "@/components/ErpLayout";
import { playSound } from "@/lib/sounds";
import {
  Layers,
  Plus,
  Search,
  Edit3,
  Trash2,
  Check,
  X,
  RefreshCw,
  Sparkles,
  Tag,
  Eye,
  Sliders,
  DollarSign,
  Package,
} from "lucide-react";

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  brandAr: string;
  brandEn: string;
  price: number;
  originalPrice?: number | null;
  discountPercent: number;
  volume: string;
  concentration: string;
  type: string;
  inStock: boolean;
  stockQuantity: number;
  isWinter: boolean;
  isFeatured: boolean;
  topNotesAr: string;
  topNotesEn: string;
  heartNotesAr: string;
  heartNotesEn: string;
  baseNotesAr: string;
  baseNotesEn: string;
  descriptionAr: string;
  descriptionEn: string;
  ingredientsAr?: string | null;
  image: string;
}

export default function MenuAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("الكل");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formNameAr, setFormNameAr] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formBrandAr, setFormBrandAr] = useState("روفي بارفيومز");
  const [formBrandEn, setFormBrandEn] = useState("Rovy Parfums");
  const [formPrice, setFormPrice] = useState("1200");
  const [formOriginalPrice, setFormOriginalPrice] = useState("1500");
  const [formVolume, setFormVolume] = useState("100 ml");
  const [formConcentration, setFormConcentration] = useState("Eau de Parfum");
  const [formType, setFormType] = useState("ORIGINAL");
  const [formStockQty, setFormStockQty] = useState("50");
  const [formIsWinter, setFormIsWinter] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formTopNotesAr, setFormTopNotesAr] = useState("البرغموت الإيطالي والزعفران الفاخر");
  const [formTopNotesEn, setFormTopNotesEn] = useState("Italian Bergamot & Royal Saffron");
  const [formHeartNotesAr, setFormHeartNotesAr] = useState("الورد الدمشقي وخشب الأرز والعنبر");
  const [formHeartNotesEn, setFormHeartNotesEn] = useState("Damask Rose, Cedarwood & Amber");
  const [formBaseNotesAr, setFormBaseNotesAr] = useState("العود الكمبودي والمسك وفانيليا مدغشقر");
  const [formBaseNotesEn, setFormBaseNotesEn] = useState("Cambodian Oud, Musk & Madagascar Vanilla");
  const [formDescAr, setFormDescAr] = useState("عطر فاخر يجسد الأصالة والرقي من روفي ستور.");
  const [formDescEn, setFormDescEn] = useState("Ultra-luxurious fragrance from Rovy Store.");
  const [formImage, setFormImage] = useState("/perfumes/ombre-nomade.webp");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    playSound("click");
    setEditingProduct(null);
    setFormNameAr("");
    setFormNameEn("");
    setFormBrandAr("روفي بارفيومز");
    setFormBrandEn("Rovy Parfums");
    setFormPrice("1250");
    setFormOriginalPrice("1600");
    setFormVolume("100 ml");
    setFormConcentration("Eau de Parfum");
    setFormType("ORIGINAL");
    setFormStockQty("50");
    setFormIsWinter(false);
    setFormIsFeatured(false);
    setFormTopNotesAr("البرغموت الإيطالي والزعفران الفاخر");
    setFormTopNotesEn("Italian Bergamot & Royal Saffron");
    setFormHeartNotesAr("الورد الدمشقي وخشب الأرز والعنبر");
    setFormHeartNotesEn("Damask Rose, Cedarwood & Amber");
    setFormBaseNotesAr("العود الكمبودي والمسك وفانيليا مدغشقر");
    setFormBaseNotesEn("Cambodian Oud, Musk & Madagascar Vanilla");
    setFormDescAr("عطر فاخر يجسد الأصالة والرقي من روفي ستور.");
    setFormDescEn("Ultra-luxurious fragrance from Rovy Store.");
    setFormImage("/perfumes/ombre-nomade.webp");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    playSound("click");
    setEditingProduct(p);
    setFormNameAr(p.nameAr);
    setFormNameEn(p.nameEn);
    setFormBrandAr(p.brandAr);
    setFormBrandEn(p.brandEn);
    setFormPrice(p.price.toString());
    setFormOriginalPrice(p.originalPrice ? p.originalPrice.toString() : "");
    setFormVolume(p.volume);
    setFormConcentration(p.concentration);
    setFormType(p.type);
    setFormStockQty(p.stockQuantity.toString());
    setFormIsWinter(p.isWinter);
    setFormIsFeatured(p.isFeatured);
    setFormTopNotesAr(p.topNotesAr);
    setFormTopNotesEn(p.topNotesEn);
    setFormHeartNotesAr(p.heartNotesAr);
    setFormHeartNotesEn(p.heartNotesEn);
    setFormBaseNotesAr(p.baseNotesAr);
    setFormBaseNotesEn(p.baseNotesEn);
    setFormDescAr(p.descriptionAr);
    setFormDescEn(p.descriptionEn);
    setFormImage(p.image);
    setIsModalOpen(true);
  };

  // Toggle inStock with one click
  const handleToggleStock = async (product: Product) => {
    playSound("click");
    const nextVal = !product.inStock;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: nextVal }),
      });
      if (res.ok) {
        playSound("pop");
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: nextVal } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العطر نهائياً من الكتالوج؟")) return;
    playSound("trash");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        playSound("success");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Modal
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameAr.trim() || !formPrice) {
      alert("يرجى ملء اسم العطر والسعر");
      return;
    }

    setSaving(true);
    playSound("click");

    const payload = {
      nameAr: formNameAr.trim(),
      nameEn: formNameEn.trim() || formNameAr.trim(),
      brandAr: formBrandAr.trim(),
      brandEn: formBrandEn.trim(),
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : null,
      volume: formVolume,
      concentration: formConcentration,
      type: formType,
      stockQuantity: Number(formStockQty) || 50,
      isWinter: formIsWinter,
      isFeatured: formIsFeatured,
      topNotesAr: formTopNotesAr,
      topNotesEn: formTopNotesEn,
      heartNotesAr: formHeartNotesAr,
      heartNotesEn: formHeartNotesEn,
      baseNotesAr: formBaseNotesAr,
      baseNotesEn: formBaseNotesEn,
      descriptionAr: formDescAr,
      descriptionEn: formDescEn,
      image: formImage,
    };

    try {
      if (editingProduct) {
        // Edit
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          playSound("success");
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
          );
          setIsModalOpen(false);
        } else {
          alert(data.error || "فشل تعديل العطر");
        }
      } else {
        // Create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          playSound("success");
          setProducts((prev) => [data.product, ...prev]);
          setIsModalOpen(false);
        } else {
          alert(data.error || "فشل حفظ العطر");
        }
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (filterType === "شتاء ❄️" && !p.isWinter) return false;
    if (filterType === "أصلي" && p.type !== "ORIGINAL") return false;
    if (filterType === "تستر" && p.type !== "TESTER") return false;
    if (filterType === "بدائل" && p.type !== "INSPIRED") return false;
    if (filterType === "متوفر فقط" && !p.inStock) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName =
        p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
      const matchBrand =
        p.brandAr.toLowerCase().includes(q) || p.brandEn.toLowerCase().includes(q);
      return matchName || matchBrand;
    }

    return true;
  });

  return (
    <ErpLayout activeItem="menu">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 border border-amber-500/20 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers size={22} />
            </span>
            <div>
              <h1 className="text-xl font-black font-serif text-gold-gradient">
                كتالوج العطور الفاخرة وقائمة الأسعار
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                التحكم الكامل في الأصناف المعروضة، الأسعار، الهرم العطري، والصور وحالة المخزون
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition"
          >
            <Plus size={16} />
            <span>إضافة عطر جديد للكتالوج</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم أو الماركة..."
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["الكل", "شتاء ❄️", "أصلي", "تستر", "بدائل", "متوفر فقط"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  playSound("click");
                  setFilterType(f);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  filterType === f
                    ? "bg-amber-500 text-black shadow-md"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Perfumes Table / Cards */}
        {loading ? (
          <div className="py-20 text-center text-amber-400">
            <RefreshCw size={28} className="animate-spin mx-auto mb-2" />
            <span className="text-xs">جاري تحميل قائمة العطور...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-xs bg-zinc-900/30 rounded-2xl border border-zinc-800">
            لا توجد عطور مطابقة للبحث
          </div>
        ) : (
          <div className="bg-[#0c0914] border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold">
                  <tr>
                    <th className="py-3 px-4">العطر</th>
                    <th className="py-3 px-4">الماركة والنوع</th>
                    <th className="py-3 px-4">الحجم والتركيز</th>
                    <th className="py-3 px-4">السعر</th>
                    <th className="py-3 px-4">المخزون</th>
                    <th className="py-3 px-4">الحالة في المتجر</th>
                    <th className="py-3 px-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-zinc-900/40 transition-colors group"
                    >
                      {/* Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.nameAr}
                            className="w-12 h-12 rounded-xl object-cover border border-zinc-800 shrink-0 bg-zinc-900"
                          />
                          <div>
                            <div className="font-bold text-zinc-200 text-xs">
                              {product.nameAr}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-serif">
                              {product.nameEn}
                            </div>
                            {product.isWinter && (
                              <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 font-bold">
                                ❄️ تشكيلة الشتاء
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Brand & Type */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-amber-400/90">{product.brandAr}</div>
                        <span
                          className={`inline-block mt-1 text-[9.5px] px-2 py-0.5 rounded-md font-bold ${
                            product.type === "ORIGINAL"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : product.type === "TESTER"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {product.type === "ORIGINAL"
                            ? "أصلي 100%"
                            : product.type === "TESTER"
                            ? "تستر أصلي"
                            : product.type === "HIGH_COPY"
                            ? "ماستر كوبي"
                            : "بديل مستوحى"}
                        </span>
                      </td>

                      {/* Volume & Concentration */}
                      <td className="py-3 px-4 text-zinc-300">
                        <div>{product.volume}</div>
                        <div className="text-[10px] text-zinc-500">{product.concentration}</div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="font-serif font-black text-sm text-gold-gradient">
                          {product.price} ج.م
                        </div>
                        {product.originalPrice && (
                          <div className="text-[10px] text-zinc-500 line-through">
                            {product.originalPrice} ج.م
                          </div>
                        )}
                      </td>

                      {/* Stock Quantity */}
                      <td className="py-3 px-4 font-mono font-bold text-zinc-300">
                        {product.stockQuantity} زجاجة
                      </td>

                      {/* In-Stock Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStock(product)}
                          className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition ${
                            product.inStock
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                          }`}
                        >
                          {product.inStock ? "متوفر للطلب" : "نفذ من المخزن"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition"
                            title="تعديل العطر"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-900/50 text-red-400 transition"
                            title="حذف العطر"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Perfume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#120e1c] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                <Layers size={18} />
                <span>{editingProduct ? "تعديل بيانات العطر" : "إضافة عطر فاخر جديد للكتالوج"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">اسم العطر بالعربية:</label>
                  <input
                    type="text"
                    required
                    value={formNameAr}
                    onChange={(e) => setFormNameAr(e.target.value)}
                    placeholder="مثال: لويس فيتون أومبري نوماد 100 مل"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">اسم العطر بالإنجليزية:</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="Ombre Nomade Louis Vuitton"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">الماركة (عربي):</label>
                  <input
                    type="text"
                    value={formBrandAr}
                    onChange={(e) => setFormBrandAr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">السعر (ج.م):</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">السعر الأصلي قبل الخصم:</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">كمية المخزون:</label>
                  <input
                    type="number"
                    value={formStockQty}
                    onChange={(e) => setFormStockQty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">نوع الإصدار:</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200"
                  >
                    <option value="ORIGINAL">أصلي 100% (Original)</option>
                    <option value="TESTER">تيستر أصلي (Original Tester)</option>
                    <option value="HIGH_COPY">ماستر كوبي (Master Mirror)</option>
                    <option value="INSPIRED">بديل مستوحى ملكي (Inspired Niche)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">الحجم:</label>
                  <select
                    value={formVolume}
                    onChange={(e) => setFormVolume(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200"
                  >
                    <option value="100 ml">100 ml</option>
                    <option value="50 ml">50 ml</option>
                    <option value="200 ml">200 ml</option>
                    <option value="30 ml">30 ml (عينة)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">التركيز:</label>
                  <select
                    value={formConcentration}
                    onChange={(e) => setFormConcentration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200"
                  >
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Extrait de Parfum">Extrait de Parfum</option>
                    <option value="Eau de Toilette">Eau de Toilette</option>
                    <option value="Pure Oil Blend">Pure Oil Blend (زيت نقي)</option>
                  </select>
                </div>
              </div>

              {/* Olfactory Pyramid (الهرم العطري) */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 space-y-3">
                <span className="text-amber-400 font-serif font-bold text-xs flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>الهرم العطري (Olfactory Pyramid):</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10.5px] text-zinc-400 mb-0.5">القمة (Top Notes):</label>
                    <input
                      type="text"
                      value={formTopNotesAr}
                      onChange={(e) => setFormTopNotesAr(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] text-zinc-400 mb-0.5">القلب (Heart Notes):</label>
                    <input
                      type="text"
                      value={formHeartNotesAr}
                      onChange={(e) => setFormHeartNotesAr(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] text-zinc-400 mb-0.5">القاعدة (Base Notes):</label>
                    <input
                      type="text"
                      value={formBaseNotesAr}
                      onChange={(e) => setFormBaseNotesAr(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1">رابط صورة العطر:</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono text-xs"
                />
                <div className="flex gap-2 mt-2">
                  {[
                    "/perfumes/ombre-nomade.webp",
                    "/perfumes/baccarat-rouge.webp",
                    "/perfumes/sauvage-elixir.webp",
                    "/perfumes/tobacco-vanille.webp",
                    "/perfumes/winter-amber.webp",
                  ].map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setFormImage(img)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-400 border border-zinc-700"
                    >
                      {img.split("/").pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsWinter}
                    onChange={(e) => setFormIsWinter(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-zinc-200 font-medium">عطر ضمن تشكيلة الشتاء ❄️</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-zinc-200 font-medium">عطر مميز (Featured) 🌟</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  {saving ? "جاري الحفظ..." : editingProduct ? "تحديث العطر" : "إضافة العطر للكتالوج"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-medium"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ErpLayout>
  );
}
