'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/weave365';

interface AdminTenantContextType {
  tenant: any | null;
  tenantsList: any[];
  loading: boolean;
  refreshTenant: () => Promise<void>;
  switchTenant: (slug: string) => void;
  claimTenant: (slug: string) => Promise<{ success: boolean; error?: string }>;
}

const AdminTenantContext = createContext<AdminTenantContextType | undefined>(undefined);

export function AdminTenantProvider({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: any;
}) {
  const [tenant, setTenant] = useState<any | null>(null);
  const [tenantsList, setTenantsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTenant = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // 1. Fetch all tenants
      const { data: allTenants, error } = await supabase
        .from('boutique_tenants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const list = allTenants || [];
      setTenantsList(list);

      // 2. Check saved preference or owner_id
      const savedSlug = typeof window !== 'undefined' ? localStorage.getItem('admin_active_tenant_slug') : null;
      let active = list.find(t => t.slug === savedSlug);

      if (!active) {
        // Priority 1: Match tenant where owner_id = user.id
        active = list.find(t => t.owner_id === user.id);
      }

      if (!active && list.length > 0) {
        // Priority 2: Fallback to first available
        active = list[0];
      }

      setTenant(active || null);
      if (active && typeof window !== 'undefined') {
        localStorage.setItem('admin_active_tenant_slug', active.slug);
      }
    } catch (err) {
      console.error('Error fetching admin tenant:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchTenant = (slug: string) => {
    const target = tenantsList.find(t => t.slug === slug);
    if (target) {
      setTenant(target);
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_active_tenant_slug', target.slug);
      }
    }
  };

  const claimTenant = async (slug: string) => {
    if (!user?.id) return { success: false, error: 'User not logged in' };
    const cleanSlug = slug.toLowerCase().trim();

    try {
      const { data: existing, error: fetchErr } = await supabase
        .from('boutique_tenants')
        .select('*')
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (fetchErr) throw fetchErr;

      if (!existing) {
        // Create new tenant with this owner
        const { data: newTenant, error: createErr } = await supabase
          .from('boutique_tenants')
          .insert({
            slug: cleanSlug,
            store_name: cleanSlug.toUpperCase(),
            owner_id: user.id,
            is_active: true
          })
          .select()
          .single();

        if (createErr) throw createErr;
        setTenant(newTenant);
        setTenantsList(prev => [newTenant, ...prev]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_active_tenant_slug', newTenant.slug);
        }
        return { success: true };
      }

      // Claim tenant
      const { data: updated, error: updateErr } = await supabase
        .from('boutique_tenants')
        .update({ owner_id: user.id })
        .eq('id', existing.id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      setTenant(updated);
      setTenantsList(prev => prev.map(t => t.id === updated.id ? updated : t));
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_active_tenant_slug', updated.slug);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to claim boutique' };
    }
  };

  useEffect(() => {
    fetchUserTenant();
  }, [user?.id]);

  return (
    <AdminTenantContext.Provider value={{ 
      tenant, 
      tenantsList, 
      loading, 
      refreshTenant: fetchUserTenant, 
      switchTenant,
      claimTenant 
    }}>
      {children}
    </AdminTenantContext.Provider>
  );
}

export function useAdminTenant() {
  const context = useContext(AdminTenantContext);
  if (!context) {
    throw new Error('useAdminTenant must be used within an AdminTenantProvider');
  }
  return context;
}
