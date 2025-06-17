import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category_id?: string;
  subcategory?: string;
  image_url?: string;
  rating?: number;
  in_stock?: boolean;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  product_count: number;
  created_at?: string;
  updated_at?: string;
}

export const getProducts = async (options?: {
  categoryId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: Product[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('products')
      .select('*');

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const getProduct = async (id: string): Promise<{ data: Product | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const getCategories = async (): Promise<{ data: Category[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const getCategory = async (id: string): Promise<{ data: Category | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const searchProducts = async (query: string, options?: {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  limit?: number;
}): Promise<{ data: Product[] | null; error: string | null }> => {
  try {
    let supabaseQuery = supabase
      .from('products')
      .select('*');

    // Text search
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    // Category filter
    if (options?.categoryId) {
      supabaseQuery = supabaseQuery.eq('category_id', options.categoryId);
    }

    // Price range filter
    if (options?.minPrice !== undefined) {
      supabaseQuery = supabaseQuery.gte('price', options.minPrice);
    }
    if (options?.maxPrice !== undefined) {
      supabaseQuery = supabaseQuery.lte('price', options.maxPrice);
    }

    // Stock filter
    if (options?.inStockOnly) {
      supabaseQuery = supabaseQuery.eq('in_stock', true);
    }

    // Limit
    if (options?.limit) {
      supabaseQuery = supabaseQuery.limit(options.limit);
    }

    const { data, error } = await supabaseQuery.order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};