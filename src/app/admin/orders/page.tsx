'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/weave365';
import { 
  FiShoppingBag, 
  FiMessageSquare, 
  FiClock, 
  FiCheckCircle, 
  FiUser, 
  FiPhone,
  FiMapPin,
  FiFilter
} from 'react-icons/fi';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const { data: tenants } = await supabase
        .from('boutique_tenants')
        .select('*')
        .limit(1);

      const currentTenant = tenants?.[0] || null;
      setTenant(currentTenant);

      if (currentTenant) {
        const { data, error } = await supabase
          .from('boutique_orders')
          .select('*')
          .eq('tenant_id', currentTenant.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('boutique_orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const filtered = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => (o.status || 'new') === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customer Inquiries & Orders</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Customer inquiries and purchases placed directly through your boutique website
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 border border-slate-800 rounded-xl">
          {['all', 'new', 'contacted', 'paid', 'shipped'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterStatus === st 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-sm bg-slate-900/90 border border-slate-800/80 rounded-2xl">
          Loading customer inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm bg-slate-900/90 border border-slate-800/80 rounded-2xl">
          {orders.length === 0 ? 'No customer inquiries yet.' : `No inquiries with status "${filterStatus}".`}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const rawPhone = (order.customer_phone || '').replace(/\D/g, '');
            const items = Array.isArray(order.items) ? order.items : [];
            const waMessage = `Hello ${order.customer_name || ''}! Thank you for your inquiry on ${tenant?.store_name || 'our boutique'}. We are ready to process your saree order worth ₹${Number(order.total_amount || 0).toLocaleString('en-IN')}.`;

            return (
              <div
                key={order.id}
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                      <FiUser size={18} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-base">
                          {order.customer_name || 'Anonymous Customer'}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <FiPhone size={13} />
                          {order.customer_phone}
                        </span>
                        {order.shipping_address?.city && (
                          <span className="flex items-center gap-1">
                            <FiMapPin size={13} />
                            {order.shipping_address.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <select
                      value={order.status || 'new'}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs font-semibold rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="paid">Status: Paid</option>
                      <option value="shipped">Status: Shipped</option>
                      <option value="cancelled">Status: Cancelled</option>
                    </select>

                    {rawPhone && (
                      <a
                        href={`https://wa.me/${rawPhone}?text=${encodeURIComponent(waMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-950/30"
                      >
                        <FiMessageSquare size={14} />
                        <span>Chat WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Items in this order */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Ordered Items:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs"
                        >
                          <span className="text-white font-medium">{item.title || item.name || 'Saree'}</span>
                          <span className="text-amber-400 font-bold">×{item.quantity || 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Amount</span>
                    <span className="text-xl font-extrabold text-white">
                      ₹{Number(order.total_amount || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
