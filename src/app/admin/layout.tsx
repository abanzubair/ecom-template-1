'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/services/weave365';
import { AdminTenantProvider, useAdminTenant } from './AdminTenantContext';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiSettings, 
  FiLogOut, 
  FiExternalLink,
  FiMenu,
  FiX,
  FiArrowRight,
  FiChevronDown
} from 'react-icons/fi';

function AdminShell({ children, user }: { children: React.ReactNode; user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tenant, tenantsList, loading: tenantLoading, switchTenant, claimTenant } = useAdminTenant();
  const [claimSlug, setClaimSlug] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const navItems = [
    { label: 'Overview', href: '/admin', icon: FiHome },
    { label: 'Saree Catalog', href: '/admin/products', icon: FiPackage },
    { label: 'Customer Orders', href: '/admin/orders', icon: FiShoppingBag },
    { label: 'Store Settings', href: '/admin/settings', icon: FiSettings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_active_tenant_slug');
    }
    router.replace('/admin/login');
  };

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSlug.trim()) return;
    setClaiming(true);
    setClaimError(null);

    const res = await claimTenant(claimSlug.trim());
    if (!res.success) {
      setClaimError(res.error || 'Failed to claim boutique');
    }
    setClaiming(false);
  };

  if (tenantLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading boutique workspace...
      </div>
    );
  }

  // If no tenant is available
  if (!tenant) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-amber-900/40">
            <FiShoppingBag size={26} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Connect Your Boutique</h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Enter the boutique identifier or slug you registered on Weave365 (e.g. <code>storefront</code> or <code>50k</code>)
          </p>

          {claimError && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs text-left">
              {claimError}
            </div>
          )}

          <form onSubmit={handleClaim} className="space-y-4">
            <input
              type="text"
              required
              value={claimSlug}
              onChange={(e) => setClaimSlug(e.target.value)}
              placeholder="e.g. storefront"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm text-center font-mono focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={claiming}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center space-x-2"
            >
              <span>{claiming ? 'Connecting...' : 'Access My Boutique Admin'}</span>
              <FiArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white text-sm">
            {tenant.store_name?.[0] || 'B'}
          </div>
          <span className="font-semibold text-white text-sm truncate max-w-[160px]">{tenant.store_name}</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Boutique Brand & Switcher */}
          <div className="p-5 border-b border-slate-800/80">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-900/30 text-base">
                {tenant.store_name?.[0] || 'B'}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-bold text-white text-sm leading-tight truncate">{tenant.store_name}</h1>
                <p className="text-xs text-amber-400 font-mono truncate">/{tenant.slug}</p>
              </div>
            </div>

            {/* Switch Boutique Dropdown (if multiple boutiques exist) */}
            {tenantsList.length > 1 && (
              <div className="relative mt-2">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                  Active Boutique:
                </label>
                <div className="relative">
                  <select
                    value={tenant.slug}
                    onChange={(e) => switchTenant(e.target.value)}
                    className="w-full appearance-none bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {tenantsList.map((t) => (
                      <option key={t.id} value={t.slug}>
                        {t.store_name} (/{t.slug})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <FiChevronDown size={13} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'}
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href={`/${tenant.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <FiExternalLink size={15} />
              <span>View Live Boutique</span>
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <FiLogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Verifying boutique session...
      </div>
    );
  }

  return (
    <AdminTenantProvider user={user}>
      <AdminShell user={user}>{children}</AdminShell>
    </AdminTenantProvider>
  );
}
