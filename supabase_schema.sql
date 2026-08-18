-- ====================================================================
-- CROCS & BAGS E-COMMERCE - SUPABASE DATABASE SCHEMATIC & OPTIMIZATION
-- ====================================================================
-- Instructions: Copy and execute this complete script in your
-- Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. CLEANUP OBSOLETE / REDUNDANT FIELDS & TABLES
-- --------------------------------------------------------------------
-- Safely drop unused ratings, reviews, or obsolete columns from products
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'rating') THEN
        ALTER TABLE public.products DROP COLUMN rating;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'review_count') THEN
        ALTER TABLE public.products DROP COLUMN review_count;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'reviews') THEN
        ALTER TABLE public.products DROP COLUMN reviews;
    END IF;
END $$;

-- Remove obsolete legacy testing tables if they exist
DROP TABLE IF EXISTS public.todos CASCADE;

-- --------------------------------------------------------------------
-- 2. CREATE OR UPDATE PRODUCTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    original_price DECIMAL(10, 2) CHECK (original_price >= price OR original_price IS NULL),
    type VARCHAR(50) NOT NULL DEFAULT 'Crocs' CHECK (type IN ('Crocs', 'Bags')),
    target_audience TEXT[] NOT NULL DEFAULT '{"Women"}'::TEXT[],
    categories TEXT[] NOT NULL DEFAULT '{"General"}'::TEXT[],
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    
    -- Footwear & Accessories Sizing & Variant Attributes
    sizes TEXT[] NOT NULL DEFAULT '{"EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"}'::TEXT[],
    colors TEXT[] NOT NULL DEFAULT '{"Default"}'::TEXT[],
    product_variants JSONB DEFAULT '{"sizes": ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"], "colors": ["Default"]}'::JSONB,
    
    -- Stock Status & Catalog Visibility
    is_featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    stock_quantity INT NOT NULL DEFAULT 100 CHECK (stock_quantity >= 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for maximum query performance & filtering efficiency
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(type);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_target_audience ON public.products USING GIN (target_audience);
CREATE INDEX IF NOT EXISTS idx_products_categories ON public.products USING GIN (categories);

-- --------------------------------------------------------------------
-- 3. ORDERS & ORDER ITEMS WORKFLOW (E-Commerce Tracking)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    customer_address TEXT,
    customer_notes TEXT,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'pending_whatsapp' CHECK (status IN ('pending_whatsapp', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_title VARCHAR(255) NOT NULL,
    selected_size VARCHAR(50),
    selected_color VARCHAR(50),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- --------------------------------------------------------------------
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES & DATA API ACCESS
-- --------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Explicitly grant SELECT to anon and authenticated roles for Data API exposure
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT INSERT ON public.order_items TO anon, authenticated;

-- RLS Policy: Public read access for customers
DROP POLICY IF EXISTS "Public read access for products" ON public.products;
CREATE POLICY "Public read access for products" 
ON public.products 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- RLS Policies for Checkout Creation
DROP POLICY IF EXISTS "Public insert access for orders" ON public.orders;
CREATE POLICY "Public insert access for orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access for order items" ON public.order_items;
CREATE POLICY "Public insert access for order items" 
ON public.order_items 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- --------------------------------------------------------------------
-- 5. REALISTIC SAMPLE SEED DATA
-- --------------------------------------------------------------------
INSERT INTO public.products (
    title, slug, price, original_price, type, target_audience, categories, description, images, sizes, colors, is_featured, in_stock
)
VALUES 
(
    'Classic Pastel Charm Clog',
    'classic-pastel-charm-clog',
    49.99,
    59.99,
    'Crocs',
    ARRAY['Women', 'Kids'],
    ARRAY['Clogs', 'Casual', 'Summer'],
    'Ultra-lightweight, water-friendly classic clogs decorated with colorful charms. Features iconic comfort cushioning and pivotable heel straps.',
    ARRAY['/assets/crocs_classic_clog.png'],
    ARRAY['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    ARRAY['Pastel Pink', 'Lilac', 'Sky Blue'],
    true,
    true
),
(
    'Chunky Mint Platform Clog',
    'chunky-mint-platform-clog',
    64.99,
    74.99,
    'Crocs',
    ARRAY['Women'],
    ARRAY['Platform', 'Trending', 'Streetwear'],
    'Elevate your style with bold 2.4-inch platform soles. Features breathable ventilation ports and ergonomic slip-resistant footbeds.',
    ARRAY['/assets/crocs_platform_clog.png'],
    ARRAY['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    ARRAY['Mint Green', 'Teal', 'Cloud White'],
    true,
    true
),
(
    'Aesthetic Terracotta Canvas Tote',
    'aesthetic-terracotta-canvas-tote',
    38.50,
    45.00,
    'Bags',
    ARRAY['Women', 'Men'],
    ARRAY['Totes', 'Everyday', 'Work & Travel'],
    'Heavy-duty eco-friendly canvas tote bag with reinforced vegan leather handles, zip closure, and interior laptop divider.',
    ARRAY['/assets/tote_bag_modern.png'],
    ARRAY['Standard (15L)', 'Large (22L)'],
    ARRAY['Warm Beige', 'Terracotta', 'Charcoal'],
    true,
    true
),
(
    'Lavender Quilted Mini Crossbody',
    'lavender-quilted-mini-crossbody',
    42.00,
    52.00,
    'Bags',
    ARRAY['Women', 'Kids'],
    ARRAY['Crossbody', 'Evening', 'Mini Bags'],
    'Chic luxury quilted mini handbag with detachable woven gold-tone chain shoulder strap and magnetic snap lock.',
    ARRAY['/assets/crossbody_mini_bag.png'],
    ARRAY['One Size'],
    ARRAY['Pastel Lavender', 'Pearl White', 'Blush Pink'],
    true,
    true
),
(
    'All-Terrain Outdoor Explorer Clog',
    'all-terrain-outdoor-explorer-clog',
    59.99,
    69.99,
    'Crocs',
    ARRAY['Men', 'Women'],
    ARRAY['Outdoor', 'Clogs', 'Utility'],
    'Rugged lug outsoles for increased traction and support. Adjustable turbo straps lock in a snug, secure fit for outdoor adventure.',
    ARRAY['/assets/crocs_platform_clog.png'],
    ARRAY['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    ARRAY['Tactical Black', 'Khaki Olive', 'Slate Grey'],
    false,
    true
),
(
    'Ergonomic Urban Commuter Backpack',
    'ergonomic-urban-commuter-backpack',
    54.99,
    68.00,
    'Bags',
    ARRAY['Men', 'Women'],
    ARRAY['Backpacks', 'Travel', 'Work'],
    'Water-resistant commuter backpack with padded 15.6-inch laptop sleeve, hidden anti-theft back pocket, and ergonomic shoulder straps.',
    ARRAY['/assets/tote_bag_modern.png'],
    ARRAY['20L Capacity'],
    ARRAY['Midnight Black', 'Heather Grey', 'Navy Blue'],
    false,
    true
)
ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    type = EXCLUDED.type,
    target_audience = EXCLUDED.target_audience,
    categories = EXCLUDED.categories,
    description = EXCLUDED.description,
    images = EXCLUDED.images,
    sizes = EXCLUDED.sizes,
    colors = EXCLUDED.colors,
    is_featured = EXCLUDED.is_featured,
    in_stock = EXCLUDED.in_stock,
    updated_at = NOW();
