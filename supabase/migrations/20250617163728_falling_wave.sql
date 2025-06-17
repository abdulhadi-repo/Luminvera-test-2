/*
  # Add sample data for categories and products

  1. Sample Categories
    - Insert sample categories with proper slugs and images
    
  2. Sample Products
    - Insert sample products with proper relationships to categories
    - Include realistic pricing, descriptions, and stock information
*/

-- Insert sample categories
INSERT INTO categories (id, name, slug, image_url, product_count) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Home & Kitchen', 'home-kitchen', 'https://images.pexels.com/photos/6707631/pexels-photo-6707631.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440002', 'Tech & Gadgets', 'tech-gadgets', 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440003', 'Fashion & Travel', 'fashion-travel', 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440004', 'Health & Beauty', 'health-beauty', 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440005', 'Baby & Family', 'baby-family', 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440006', 'Pets & Outdoors', 'pets-outdoors', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440007', 'Auto & DIY', 'auto-diy', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800', 0),
  ('550e8400-e29b-41d4-a716-446655440008', 'Office & Stationery', 'office-stationery', 'https://images.pexels.com/photos/159832/pencils-color-colorful-bright-159832.jpeg?auto=compress&cs=tinysrgb&w=800', 0)
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, slug, description, price, category_id, image_url, rating, in_stock, stock_quantity) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Wireless Bluetooth Headphones', 'wireless-bluetooth-headphones', 'Premium wireless headphones with noise cancellation and 30-hour battery life.', 99.99, '550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 4.5, true, 50),
  ('650e8400-e29b-41d4-a716-446655440002', 'Smart Fitness Watch', 'smart-fitness-watch', 'Advanced fitness tracking with heart rate monitoring and GPS.', 199.99, '550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, true, 30),
  ('650e8400-e29b-41d4-a716-446655440003', 'Premium Coffee Maker', 'premium-coffee-maker', 'Programmable coffee maker with built-in grinder and thermal carafe.', 159.99, '550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800', 4.3, true, 25),
  ('650e8400-e29b-41d4-a716-446655440004', 'Luxury Leather Handbag', 'luxury-leather-handbag', 'Handcrafted genuine leather handbag with multiple compartments.', 289.99, '550e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, true, 15),
  ('650e8400-e29b-41d4-a716-446655440005', 'Organic Skincare Set', 'organic-skincare-set', 'Complete organic skincare routine with cleanser, toner, and moisturizer.', 79.99, '550e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, true, 40),
  ('650e8400-e29b-41d4-a716-446655440006', 'Baby Soft Plush Toy', 'baby-soft-plush-toy', 'Ultra-soft plush toy perfect for babies and toddlers.', 29.99, '550e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, true, 60),
  ('650e8400-e29b-41d4-a716-446655440007', 'Wireless Phone Charger', 'wireless-phone-charger', 'Fast wireless charging pad compatible with all Qi-enabled devices.', 39.99, '550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, true, 80),
  ('650e8400-e29b-41d4-a716-446655440008', 'Stainless Steel Water Bottle', 'stainless-steel-water-bottle', 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.', 24.99, '550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/3766230/pexels-photo-3766230.jpeg?auto=compress&cs=tinysrgb&w=800', 4.2, true, 100)
ON CONFLICT (id) DO NOTHING;