"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import {
  ShieldAlert,
  ShieldCheck,
  Power,
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  Plus,
  RefreshCw,
  LogOut,
  Sliders,
  ExternalLink,
} from "lucide-react";

export default function DashboardPage() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const isAr = lang === "ar";

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "users" | "products">("overview");

  // State
  const [isLockdown, setIsLockdown] = useState(false);
  const [lockdownLoading, setLockdownLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New User Form Modal State
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newRole, setNewRole] = useState("manager");

  useEffect(() => {
    const savedUser = localStorage.getItem("rovy_user");
    if (!savedUser) {
      router.push("/login");
      return;
    }
    try {
      const u = JSON.parse(savedUser);
      setCurrentUser(u);
    } catch {
      router.push("/login");
    }

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Lockdown
      const resLock = await fetch("/api/auth/lockdown");
      const dataLock = await resLock.json();
      setIsLockdown(dataLock.isEmergencyLockdown || false);

      // 2. Fetch Orders
      const resOrders = await fetch("/api/orders");
      const dataOrders = await resOrders.json();
      setOrders(dataOrders.orders || []);

      // 3. Fetch Users
      const resUsers = await fetch("/api/auth/users");
      const dataUsers = await resUsers.json();
      setUsers(dataUsers.users || []);

      // 4. Fetch Products
      const resProds = await fetch("/api/products");
      const dataProds = await resProds.json();
      setProducts(dataProds.products || []);
    } catch (e) {
      console.error("Dashboard fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Master Emergency Lockdown (Owner only)
  const handleToggleLockdown = async () => {
    if (currentUser?.role !== "owner" && currentUser?.username !== "maestro") {
      alert(isAr ? "عذراً! صلاحية تفعيل وضع الطوارئ للمالك (المايسترو) فقط." : "Only Owner Maestro can toggle emergency lockdown.");
      return;
    }

    const confirmMsg = isLockdown
      ? isAr
        ? "هل أنت متأكد من إلغاء وضع الطوارئ وإعادة تفعيل دخول كافة الحسابات؟"
        : "Disable emergency lockdown and restore access for all accounts?"
      : isAr
        ? "تحذير أمني: هل أنت متأكد من تفعيل وضع الطوارئ؟ سيتم تعطيل ومنع تسجيل دخول كافة المديرين والموظفين فوراً!"
        : "SECURITY ALERT: Activate lockdown? All managers and staff accounts will be immediately blocked!";

    if (!window.confirm(confirmMsg)) return;

    setLockdownLoading(true);
    try {
      const res = await fetch("/api/auth/lockdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEmergencyLockdown: !isLockdown }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLockdown(data.isEmergencyLockdown);
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLockdownLoading(false);
    }
  };

  // Toggle user active status
  const handleToggleUser = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/auth/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, isActive: !currentStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: !currentStatus } : u)));
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm(isAr ? "هل أنت متأكد من حذف هذا الحساب نهائياً؟" : "Delete this account permanently?")) {
      return;
    }
    try {
      const res = await fetch(`/api/auth/users?id=${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add new user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          password: newPassword,
          pin: newPin,
          role: newRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowAddUser(false);
        setNewUsername("");
        setNewName("");
        setNewPassword("");
        setNewPin("");
        fetchDashboardData();
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rovy_user");
    router.push("/login");
  };

  // Metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrdersCount = orders.length;
  const isOwner = currentUser?.role === "owner" || currentUser?.username === "maestro";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              {currentUser?.name || "المايسترو (المالك)"}
            </span>
            <span className="text-xs text-zinc-500 font-mono">@{currentUser?.username}</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient mt-1">
            {t("dashboard_title")}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-amber-400 transition"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-xs text-zinc-300 hover:text-amber-400 transition flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            <span>{isAr ? "عرض المتجر" : "Storefront"}</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 hover:bg-red-900/60 transition flex items-center gap-1.5"
          >
            <LogOut size={14} />
            <span>{isAr ? "تسجيل خروج" : "Logout"}</span>
          </button>
        </div>
      </div>

      {/* MASTER EMERGENCY LOCKDOWN WIDGET (Owner Special Feature) */}
      <div
        className={`p-6 rounded-3xl border transition-all duration-300 shadow-xl ${
          isLockdown
            ? "bg-red-950/40 border-red-500/60 shadow-red-950/50"
            : "glass-luxury border-amber-500/30"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              {isLockdown ? (
                <ShieldAlert size={22} className="text-red-400 animate-pulse" />
              ) : (
                <ShieldCheck size={22} className="text-emerald-400" />
              )}
              <h3 className="font-serif font-black text-lg text-zinc-100">
                {t("dashboard_emergency_lockdown")}
              </h3>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  isLockdown
                    ? "bg-red-500 text-black border-red-400 animate-pulse"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                }`}
              >
                {isLockdown ? t("dashboard_lockdown_active") : t("dashboard_lockdown_inactive")}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {t("dashboard_emergency_desc")}
            </p>
          </div>

          <div className="shrink-0">
            {isOwner ? (
              <button
                onClick={handleToggleLockdown}
                disabled={lockdownLoading}
                className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition shadow-lg ${
                  isLockdown
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : "bg-red-600 hover:bg-red-500 text-white"
                }`}
              >
                <Power size={16} />
                <span>
                  {lockdownLoading
                    ? isAr
                      ? "جاري التحديث..."
                      : "Updating..."
                    : isLockdown
                    ? isAr
                      ? "إلغاء الطوارئ وتفعيل الحسابات"
                      : "Disable Lockdown (Enable Accounts)"
                    : isAr
                      ? "تفعيل الطوارئ (تعطيل كافة الحسابات)"
                      : "Enable Master Lockdown (Block All)"}
                </span>
              </button>
            ) : (
              <span className="text-xs text-zinc-500 italic">
                {isAr ? "صلاحية حصرية للمالك فقط" : "Owner only privilege"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-luxury p-5 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">{t("dashboard_total_sales")}</span>
            <DollarSign size={18} className="text-amber-400" />
          </div>
          <span className="font-serif font-black text-2xl text-gold-gradient">
            {totalSales.toLocaleString()} ج.م
          </span>
        </div>

        <div className="glass-luxury p-5 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">{t("dashboard_total_orders")}</span>
            <ShoppingBag size={18} className="text-amber-400" />
          </div>
          <span className="font-serif font-black text-2xl text-zinc-100">
            {totalOrdersCount}
          </span>
        </div>

        <div className="glass-luxury p-5 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">{t("dashboard_products_count")}</span>
            <Package size={18} className="text-amber-400" />
          </div>
          <span className="font-serif font-black text-2xl text-zinc-100">
            {products.length}
          </span>
        </div>

        <div className="glass-luxury p-5 rounded-2xl border border-amber-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">{t("dashboard_users_count")}</span>
            <Users size={18} className="text-amber-400" />
          </div>
          <span className="font-serif font-black text-2xl text-zinc-100">
            {users.length}
          </span>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === "overview"
              ? "btn-gold"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          {isAr ? "نظرة عامة والطلبات الحديثة" : "Recent Orders"}
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "users"
              ? "btn-gold"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Users size={14} />
          <span>{isAr ? "إدارة الحسابات والصلاحيات" : "Accounts & Security"}</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "products"
              ? "btn-gold"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Package size={14} />
          <span>{isAr ? "كتالوج العطور والأسعار" : "Perfumes Catalog"}</span>
        </button>
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeTab === "overview" && (
        <div className="glass-luxury rounded-3xl border border-amber-500/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-zinc-100">
              {isAr ? "قائمة أوردرات العطور" : "Orders Log"}
            </h3>
            <span className="text-xs text-zinc-400">
              {orders.length} {isAr ? "طلب مسجل" : "orders"}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              {isAr ? "لا توجد طلبات مسجلة حتى الآن." : "No orders yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3 text-start">{isAr ? "رقم الطلب" : "Order #"}</th>
                    <th className="p-3 text-start">{isAr ? "العميل" : "Client"}</th>
                    <th className="p-3 text-start">{isAr ? "الهاتف" : "Phone"}</th>
                    <th className="p-3 text-start">{isAr ? "العنوان" : "Address"}</th>
                    <th className="p-3 text-start">{isAr ? "المبلغ" : "Total"}</th>
                    <th className="p-3 text-start">{isAr ? "طريقة الدفع" : "Payment"}</th>
                    <th className="p-3 text-start">{isAr ? "الحالة" : "Status"}</th>
                    <th className="p-3 text-start">{isAr ? "إجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-900/40 transition">
                      <td className="p-3 font-mono font-bold text-amber-400">{o.orderNumber}</td>
                      <td className="p-3 font-bold text-zinc-200">{o.customerName}</td>
                      <td className="p-3 font-mono text-zinc-300">
                        <a href={`tel:${o.customerPhone}`} className="hover:underline text-amber-300">
                          {o.customerPhone}
                        </a>
                      </td>
                      <td className="p-3 text-zinc-400 max-w-xs truncate">
                        {o.customerCity} - {o.customerAddress}
                      </td>
                      <td className="p-3 font-bold text-gold-gradient">{o.totalAmount} ج.م</td>
                      <td className="p-3 text-zinc-300">{o.paymentMethod}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === "DELIVERED"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : o.status === "SHIPPED"
                              ? "bg-blue-500/20 text-blue-400"
                              : o.status === "CANCELLED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg p-1 text-[11px] outline-none"
                        >
                          <option value="PENDING">PENDING (قيد المراجعة)</option>
                          <option value="CONFIRMED">CONFIRMED (مؤكد)</option>
                          <option value="SHIPPED">SHIPPED (خرج للشحن)</option>
                          <option value="DELIVERED">DELIVERED (تم التسليم)</option>
                          <option value="CANCELLED">CANCELLED (ملغي)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: USERS (Account & Security Matrix) */}
      {activeTab === "users" && (
        <div className="glass-luxury rounded-3xl border border-amber-500/20 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">
                {isAr ? "منظومة الحسابات وكود الأمان (PIN Matrix)" : "Accounts & Security Roles"}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isAr
                  ? "إدارة حساب المالك، مديري التشغيل، الموظفين، وإمكانية إضافة أو تعطيل أي حساب."
                  : "Manage Owner, Operations Managers, Staff, with expandable account creation."}
              </p>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="py-2.5 px-4 rounded-xl btn-gold text-xs font-bold flex items-center gap-1.5 shadow-lg"
            >
              <Plus size={15} />
              <span>{isAr ? "إضافة حساب جديد" : "Add User"}</span>
            </button>
          </div>

          {/* Add User Modal */}
          {showAddUser && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/40 space-y-4">
              <h4 className="font-bold text-sm text-amber-300">
                {isAr ? "تسجيل حساب تشغيل جديد" : "Create New Account"}
              </h4>
              <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder={isAr ? "الاسم بالكامل" : "Full Name"}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder={isAr ? "اسم المستخدم (User)" : "Username"}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 outline-none"
                />
                <input
                  type="password"
                  required
                  placeholder={isAr ? "كلمة المرور" : "Password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 outline-none font-mono"
                />
                <input
                  type="password"
                  required
                  maxLength={8}
                  placeholder={isAr ? "كود الأمان PIN" : "Security PIN"}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 outline-none font-mono tracking-widest"
                />
                <div className="flex gap-2">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 outline-none"
                  >
                    <option value="manager">{isAr ? "مدير تشغيل" : "Manager"}</option>
                    <option value="staff">{isAr ? "كاشير / موظف" : "Staff"}</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg btn-gold font-bold text-xs"
                  >
                    {isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="px-3 py-2.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 text-start">{isAr ? "الاسم" : "Name"}</th>
                  <th className="p-3 text-start">{isAr ? "اسم الدخول" : "Username"}</th>
                  <th className="p-3 text-start">{isAr ? "الدور" : "Role"}</th>
                  <th className="p-3 text-start">{isAr ? "كود الأمان PIN" : "PIN Code"}</th>
                  <th className="p-3 text-start">{isAr ? "حالة الحساب" : "Account Status"}</th>
                  <th className="p-3 text-start">{isAr ? "تحكم الحساب" : "Controls"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {users.map((u) => {
                  const isMaestro = u.username === "maestro";
                  return (
                    <tr key={u.id} className="hover:bg-zinc-900/40 transition">
                      <td className="p-3 font-bold text-zinc-100 flex items-center gap-2">
                        {isMaestro && <span className="text-amber-400">👑</span>}
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3 font-mono text-amber-300 font-bold">{u.username}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            u.role === "owner"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 font-mono tracking-widest text-zinc-400">
                        {isOwner ? u.pin : "••••••"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {u.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "معطل" : "Disabled")}
                        </span>
                      </td>
                      <td className="p-3 flex items-center gap-2">
                        {!isMaestro && isOwner && (
                          <>
                            <button
                              onClick={() => handleToggleUser(u.id, u.isActive)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                                u.isActive
                                  ? "bg-red-950/40 border-red-500/30 text-red-400 hover:bg-red-900/60"
                                  : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60"
                              }`}
                            >
                              {u.isActive ? (isAr ? "تعطيل الحساب" : "Disable") : (isAr ? "تفعيل" : "Enable")}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                        {isMaestro && (
                          <span className="text-[10px] text-amber-400 font-bold">
                            {isAr ? "حساب المالك الرئيسي المحمي" : "Protected Owner"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === "products" && (
        <div className="glass-luxury rounded-3xl border border-amber-500/20 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h3 className="font-serif font-bold text-lg text-zinc-100">
              {isAr ? "قائمة العطور والأسعار" : "Fragrances Catalog"}
            </h3>
            <span className="text-xs text-zinc-400">
              {products.length} {isAr ? "عطر معروض" : "perfumes"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 text-start">{isAr ? "العطر" : "Fragrance"}</th>
                  <th className="p-3 text-start">{isAr ? "البراند" : "Brand"}</th>
                  <th className="p-3 text-start">{isAr ? "درجة الأصالة" : "Authenticity"}</th>
                  <th className="p-3 text-start">{isAr ? "الحجم والتركيز" : "Volume & Concentration"}</th>
                  <th className="p-3 text-start">{isAr ? "السعر الحالي" : "Price"}</th>
                  <th className="p-3 text-start">{isAr ? "المخزون" : "Stock"}</th>
                  <th className="p-3 text-start">{isAr ? "عرض" : "Link"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/40 transition">
                    <td className="p-3 font-bold text-zinc-200">
                      {isAr ? p.nameAr : p.nameEn}
                    </td>
                    <td className="p-3 text-amber-300 font-serif">
                      {isAr ? p.brandAr : p.brandEn}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300 font-semibold">
                        {p.type}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-400">
                      {p.volume} • {p.concentration}
                    </td>
                    <td className="p-3 font-bold text-gold-gradient">{p.price} ج.م</td>
                    <td className="p-3">
                      <span className="text-emerald-400 font-bold">
                        {p.stockQuantity} {isAr ? "زجاجة" : "pcs"}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <span>{isAr ? "معاينة" : "View"}</span>
                        <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
