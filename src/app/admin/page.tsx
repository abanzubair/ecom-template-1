'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/services/weave365';
import { 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign, 
  FiArrowUpRight,
  FiExternalLink,
  FiCheckCircle,
  FiClock,
  FiMessageSquare
} from 'react-icons/fi';

export default function AdminDashboardPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // 1. Get current tenant
        const { data: tenants } = await supabase
          .from('boutique_tenants')
          .select('*')
          .limit(1);

        const currentTenant = tenants?.[0] || null;
        setTenant(currentTenant);

        if (currentTenant) {
          // 2. Count products
          const { count } = await supabase
            .from('boutique_products')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', currentTenant.id);
          setProductsCount(count || 0);

          // 3. Load recent orders
          const { data: recentOrders } = await supabase
            .from('boutique_orders')
            .select('*')
            .eq('tenant_id', currentTenant.id)
            .order('created_at', { ascending: false })
            .limit(5);
          setOrders(recentOrders || []);
        }
      } catch (err) {
        console.error('Error loading admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Boutique</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {tenant?.store_name || 'My Boutique Store'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Handle: <strong className="text-slate-200">{tenant?.slug || 'setup-pending'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-950/50"
            >
              Manage Products
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
            >
              <span>Preview Store</span>
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-6 bg-slate-900/90 border border-slate-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Sarees</span>
            <div className="text-3xl font-extrabold text-white mt-2">{productsCount}</div>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Direct from Weave365</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <FiPackage size={22} />
          </div>
        </div>

        <div className="p-6 bg-slate-900/90 border border-slate-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Inquiries</span>
            <div className="text-3xl font-extrabold text-white mt-2">{orders.length}</div>
            <span className="text-xs text-amber-400 font-medium mt-1 inline-block">WhatsApp & Cart Leads</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FiShoppingBag size={22} />
          </div>
        </div>

        <div className="p-6 bg-slate-900/90 border border-slate-800/80 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pipeline Value</span>
            <div className="text-3xl font-extrabold text-white mt-2">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <span className="text-xs text-slate-400 font-medium mt-1 inline-block">Across all orders</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FiDollarSign size={22} />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-400 mt-0.5">Orders submitted via your live boutique website</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <FiArrowUpRight size={15} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No customer inquiries yet. Share your boutique store link to receive orders!
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Phone</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      {order.customer_name || 'Guest Customer'}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      {order.customer_phone || 'N/A'}
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      ₹{Number(order.total_amount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {order.status || 'new'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {order.customer_phone && (
                        <a
                          href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${order.customer_name}, thank you for contacting ${tenant?.store_name} regarding your saree order.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          <FiMessageSquare size={13} />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
