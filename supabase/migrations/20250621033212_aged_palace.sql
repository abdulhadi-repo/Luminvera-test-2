/*
  # Enhanced E-commerce Database Schema

  1. New Tables
    - `orders` - Customer orders with status tracking
    - `order_items` - Individual items within orders
    - `product_reviews` - Customer product reviews
    - `product_images` - Multiple images per product
    - `shipping_addresses` - Customer shipping addresses
    - `payment_methods` - Customer payment methods
    - `coupons` - Discount coupons and promo codes
    - `order_coupons` - Applied coupons to orders

  2. Enhanced Tables
    - Add more fields to existing tables for better functionality
    - Add proper indexes for performance
    - Add constraints for data integrity

  3. Security
    - Enable RLS on all new tables
    - Add appropriate policies for each table
    - Ensure data privacy and security

  4. Functions & Triggers
    - Auto-update timestamps
    - Calculate order totals
    - Update product ratings based on reviews
*/

-- Create enum for order status
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for payment status
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number text UNIQUE NOT NULL DEFAULT 'ORD-' || EXTRACT(EPOCH FROM now())::text,
  status order_status DEFAULT 'pending' NOT NULL,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  subtotal numeric(10,2) DEFAULT 0 NOT NULL,
  tax_amount numeric(10,2) DEFAULT 0 NOT NULL,
  shipping_amount numeric(10,2) DEFAULT 0 NOT NULL,
  discount_amount numeric(10,2) DEFAULT 0 NOT NULL,
  total_amount numeric(10,2) DEFAULT 0 NOT NULL,
  currency text DEFAULT 'USD' NOT NULL,
  shipping_address jsonb,
  billing_address jsonb,
  payment_method jsonb,
  notes text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL CHECK (unit_price >= 0),
  total_price numeric(10,2) NOT NULL CHECK (total_price >= 0),
  product_snapshot jsonb, -- Store product details at time of order
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create product_reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(product_id, user_id)
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create shipping_addresses table
CREATE TABLE IF NOT EXISTS shipping_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address_line_1 text NOT NULL,
  address_line_2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text DEFAULT 'US' NOT NULL,
  phone text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- 'card', 'paypal', etc.
  provider text, -- 'stripe', 'paypal', etc.
  last_four text,
  brand text, -- 'visa', 'mastercard', etc.
  exp_month integer,
  exp_year integer,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed_amount')),
  value numeric(10,2) NOT NULL CHECK (value > 0),
  minimum_order_amount numeric(10,2) DEFAULT 0,
  maximum_discount_amount numeric(10,2),
  usage_limit integer,
  used_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  starts_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create order_coupons table (for tracking coupon usage)
CREATE TABLE IF NOT EXISTS order_coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  coupon_id uuid REFERENCES coupons(id) ON DELETE RESTRICT NOT NULL,
  discount_amount numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_sort_order ON product_images(product_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_shipping_addresses_user_id ON shipping_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active, expires_at);

-- Enable RLS on all new tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_coupons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items for their orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
    AND orders.status = 'pending'
  ));

-- RLS Policies for product_reviews
CREATE POLICY "Anyone can view product reviews"
  ON product_reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON product_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON product_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for product_images
CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  TO public
  USING (true);

-- RLS Policies for shipping_addresses
CREATE POLICY "Users can manage their own shipping addresses"
  ON shipping_addresses FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payment_methods
CREATE POLICY "Users can manage their own payment methods"
  ON payment_methods FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for coupons
CREATE POLICY "Anyone can view active coupons"
  ON coupons FOR SELECT
  TO public
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- RLS Policies for order_coupons
CREATE POLICY "Users can view coupons applied to their orders"
  ON order_coupons FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_coupons.order_id 
    AND orders.user_id = auth.uid()
  ));

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at 
  BEFORE UPDATE ON product_reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipping_addresses_updated_at 
  BEFORE UPDATE ON shipping_addresses 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at 
  BEFORE UPDATE ON payment_methods 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at 
  BEFORE UPDATE ON coupons 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate subtotal from order items
  NEW.subtotal = (
    SELECT COALESCE(SUM(total_price), 0)
    FROM order_items
    WHERE order_id = NEW.id
  );
  
  -- Calculate total (subtotal + tax + shipping - discount)
  NEW.total_amount = NEW.subtotal + NEW.tax_amount + NEW.shipping_amount - NEW.discount_amount;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-calculate order totals
CREATE TRIGGER calculate_order_total_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION calculate_order_total();

-- Function to update product rating when reviews change
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products 
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM product_reviews 
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers to update product rating
CREATE TRIGGER update_product_rating_on_insert
  AFTER INSERT ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_product_rating_on_update
  AFTER UPDATE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_product_rating_on_delete
  AFTER DELETE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to ensure only one default address per user
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE shipping_addresses 
    SET is_default = false 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for default shipping address
CREATE TRIGGER ensure_single_default_address_trigger
  BEFORE INSERT OR UPDATE ON shipping_addresses
  FOR EACH ROW EXECUTE FUNCTION ensure_single_default_address();

-- Function to ensure only one default payment method per user
CREATE OR REPLACE FUNCTION ensure_single_default_payment()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE payment_methods 
    SET is_default = false 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for default payment method
CREATE TRIGGER ensure_single_default_payment_trigger
  BEFORE INSERT OR UPDATE ON payment_methods
  FOR EACH ROW EXECUTE FUNCTION ensure_single_default_payment();

-- Insert sample coupons
INSERT INTO coupons (code, name, description, type, value, minimum_order_amount, usage_limit, expires_at) VALUES
  ('WELCOME10', 'Welcome Discount', 'Get 10% off your first order', 'percentage', 10, 50, 1000, now() + interval '30 days'),
  ('SAVE20', 'Save $20', 'Get $20 off orders over $100', 'fixed_amount', 20, 100, 500, now() + interval '60 days'),
  ('FREESHIP', 'Free Shipping', 'Free shipping on any order', 'fixed_amount', 9.99, 0, NULL, now() + interval '90 days')
ON CONFLICT (code) DO NOTHING;

-- Insert sample product images for existing products
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wireless Bluetooth Headphones - Main View', 1, true),
  ('650e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wireless Bluetooth Headphones - Side View', 2, false),
  ('650e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Smart Fitness Watch - Main View', 1, true),
  ('650e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium Coffee Maker - Main View', 1, true)
ON CONFLICT DO NOTHING;