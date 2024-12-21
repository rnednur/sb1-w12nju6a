import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Catalog } from '../types/catalog';

export function useCatalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogs = async () => {
    const { data, error } = await supabase
      .from('catalogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching catalogs:', error);
    } else {
      setCatalogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return { catalogs, loading, refetch: fetchCatalogs };
}