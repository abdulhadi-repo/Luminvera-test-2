import { supabase } from './supabase';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    in_stock?: boolean;
  };
}

export const getWishlistItems = async (userId: string): Promise<{ data: WishlistItem[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(id, name, price, image_url, in_stock)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const addToWishlist = async (userId: string, productId: string): Promise<{ data: WishlistItem | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    return { error: error?.message || null };
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }
};

export const isInWishlist = async (userId: string, productId: string): Promise<{ data: boolean; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') {
      return { data: false, error: error.message };
    }

    return { data: !!data, error: null };
  } catch (err) {
    return { data: false, error: 'An unexpected error occurred' };
  }
};