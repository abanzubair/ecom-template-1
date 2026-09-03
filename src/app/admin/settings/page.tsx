'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/weave365';
import { useAdminTenant } from '../AdminTenantContext';
import { 
  FiCheckCircle, 
  FiGlobe, 
  FiPhone, 
  FiSliders, 
  FiImage, 
  FiSave,
  FiInfo
} from 'react-icons/fi';

export default function AdminSettingsPage() {
  const { tenant, refreshTenant } = useAdminTenant();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    store_name: '',
    tagline: '',
    whatsapp: '',
    logo_url: '',
    banner_url: '',
    theme_color: '#0f172a',
    accent_color: '#b58342',
    custom_domain: '',
    about_text: '',
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        store_name: tenant.store_name || '',
        tagline: tenant.tagline || '',
        whatsapp: tenant.whatsapp || '',
        logo_url: tenant.logo_url || '',
        banner_url: tenant.banner_url || '',
        theme_color: tenant.theme_color || '#0f172a',
        accent_color: tenant.accent_color || '#b58342',
        custom_domain: tenant.custom_domain || '',
        about_text: tenant.about_text || '',
      });
    }
  }, [tenant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant?.id) return;
    setSaving(true);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('boutique_tenants')
        .update({
          store_name: formData.store_name,
          tagline: formData.tagline,
          whatsapp: formData.whatsapp,
          logo_url: formData.logo_url || null,
          banner_url: formData.banner_url || null,
          theme_color: formData.theme_color,
          accent_color: formData.accent_color,
          custom_domain: formData.custom_domain || null,
          about_text: formData.about_text || null,
        })
        .eq('id', tenant.id);

      if (error) throw error;
      await refreshTenant();
      setSuccess('Boutique settings saved successfully!');
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      alert('Failed to save settings: ' + (err.message || 'Error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Boutique Branding & Settings</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Customizing <strong className="text-slate-200">{tenant?.store_name}</strong> (/{tenant?.slug})
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm flex items-center space-x-2">
          <FiCheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Information */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-sm mb-2">
            <FiSliders size={18} />
            <span>Identity & Communication</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Boutique Name *
              </label>
              <input
                type="text"
                required
                value={formData.store_name}
                onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                placeholder="Varanasi Silks"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                WhatsApp Order Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FiPhone size={15} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="919999999999"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tagline / Headline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Handcrafted Pure Silk Banarasi Sarees & Couture"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Visuals & Colors */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-sm mb-2">
            <FiImage size={18} />
            <span>Theme Colors & Media</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Logo Image URL
              </label>
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Hero Banner URL
              </label>
              <input
                type="url"
                value={formData.banner_url}
                onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Brand Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.theme_color}
                  onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                  className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-400">{formData.theme_color}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Accent Gold Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.accent_color}
                  onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                  className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-400">{formData.accent_color}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Domain */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-sm mb-2">
            <FiGlobe size={18} />
            <span>Custom Domain Setup</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Your Custom Domain (e.g. boutique.com)
            </label>
            <input
              type="text"
              value={formData.custom_domain}
              onChange={(e) => setFormData({ ...formData, custom_domain: e.target.value })}
              placeholder="sarees.myboutique.com"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start space-x-2.5 leading-relaxed">
            <FiInfo size={16} className="text-amber-400 mt-0.5 shrink-0" />
            <span>
              To point your domain here, add a <strong>CNAME</strong> record in your domain DNS manager pointing to <code>cname.vercel-dns.com</code>.
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-950/40 disabled:opacity-50"
          >
            <FiSave size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
