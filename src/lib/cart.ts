import { supabase } from './supabase';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    in_stock?: boolean;
  };
}

export const getCartItems = async (userId: string): Promise<{ data: CartItem[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
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

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<{ data: CartItem | null; error: string | null }> => {
  try {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      // Update quantity if item exists
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    }
  } catch (err) {
    return { data: null, error: 'An unexpected error occurred' };
  }
};

export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<{ data: CartItem | null; error: string | null }> => {
  try {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
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

export const removeFromCart = async (itemId: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    return { error: error?.message || null };
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }
};

export const clearCart = async (userId: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    return { error: error?.message || null };
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }
};