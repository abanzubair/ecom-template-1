'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/weave365';

interface AdminTenantContextType {
  tenant: any | null;
  loading: boolean;
  refreshTenant: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);

  const fetchUserTenant = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // 1. Fetch tenant owned by this user
      const { data, error } = await supabase
        .from('boutique_tenants')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      if (data) {
        setTenant(data);
      } else {
        // Fallback: If user has not claimed their store yet, check if single unassigned tenant exists
        const { data: unassigned } = await supabase
          .from('boutique_tenants')
          .select('*')
          .is('owner_id', null)
          .limit(1);

        if (unassigned && unassigned.length === 1) {
          // Auto-assign the sole tenant to this admin
          await supabase
            .from('boutique_tenants')
            .update({ owner_id: user.id })
            .eq('id', unassigned[0].id);
          setTenant({ ...unassigned[0], owner_id: user.id });
        } else {
          setTenant(null);
        }
      }
    } catch (err) {
      console.error('Error fetching admin tenant:', err);
    } finally {
      setLoading(false);
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
        return { success: true };
      }

      if (existing.owner_id && existing.owner_id !== user.id) {
        return { success: false, error: 'This boutique is already managed by another account.' };
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
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to claim boutique' };
    }
  };

  useEffect(() => {
    fetchUserTenant();
  }, [user?.id]);

  return (
    <AdminTenantContext.Provider value={{ tenant, loading, refreshTenant: fetchUserTenant, claimTenant }}>
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
