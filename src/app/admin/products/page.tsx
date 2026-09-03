'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/weave365';
import { 
  FiSearch, 
  FiEye, 
  FiEyeOff, 
  FiCheck, 
  FiEdit2, 
  FiTrash2,
  FiExternalLink
} from 'react-icons/fi';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
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
          .from('boutique_products')
          .select('*')
          .eq('tenant_id', currentTenant.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('boutique_products')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? { ...p, is_published: !currentStatus } : p));
    } catch (err) {
      alert('Failed to update product visibility');
    }
  };

  const handleSavePrice = async (id: string) => {
    try {
      setSavingId(id);
      const { error } = await supabase
        .from('boutique_products')
        .update({ retail_price: Number(editPrice) })
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? { ...p, retail_price: Number(editPrice) } : p));
      setEditingId(null);
    } catch (err) {
      alert('Failed to update price');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Remove this product from your boutique store?')) return;
    try {
      const { error } = await supabase
        .from('boutique_products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const filtered = products.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Saree Catalog & Markups</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Adjust your customer retail prices and control which designs are visible on your website
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <FiSearch size={15} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sarees, SKU..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Loading your boutique catalog...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              {products.length === 0 
                ? 'No sarees added to your boutique yet. Visit Weave365 and click "Add to My Website" on any product!' 
                : 'No products matching your search.'}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-4">Base Cost</th>
                  <th className="py-3.5 px-4">Retail Price</th>
                  <th className="py-3.5 px-4">Your Profit</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filtered.map((product) => {
                  const isEditing = editingId === product.id;
                  const base = Number(product.base_price || 0);
                  const retail = Number(product.retail_price || 0);
                  const profit = retail - base;
                  const profitPct = base > 0 ? Math.round((profit / base) * 100) : 0;
                  const img = Array.isArray(product.images) && product.images[0] ? product.images[0] : '/placeholder.jpg';

                  return (
                    <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Product thumbnail + details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3.5">
                          <img
                            src={img}
                            alt={product.title}
                            className="w-12 h-14 object-cover rounded-lg bg-slate-800 border border-slate-700/50"
                          />
                          <div>
                            <div className="font-semibold text-white text-sm line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>SKU: {product.sku || 'N/A'}</span>
                              <span>•</span>
                              <span>{product.fabric || 'Pure Silk'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Base cost */}
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">
                        ₹{base.toLocaleString('en-IN')}
                      </td>

                      {/* Retail price editor */}
                      <td className="py-4 px-4">
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 text-xs">₹</span>
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-24 px-2 py-1 bg-slate-950 border border-amber-500 rounded-lg text-white font-bold text-sm focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(product.id)}
                              disabled={savingId === product.id}
                              className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold"
                            >
                              <FiCheck size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">
                              ₹{retail.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => {
                                setEditingId(product.id);
                                setEditPrice(retail);
                              }}
                              className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                              title="Edit retail price"
                            >
                              <FiEdit2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Profit pill */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                          profit > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                        }`}>
                          +₹{profit.toLocaleString('en-IN')} ({profitPct}%)
                        </span>
                      </td>

                      {/* Live status */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          product.is_published 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {product.is_published ? 'Published' : 'Hidden'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => handleTogglePublish(product.id, product.is_published)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title={product.is_published ? 'Hide from live store' : 'Publish to live store'}
                          >
                            {product.is_published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete from boutique"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
