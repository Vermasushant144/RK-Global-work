-- ============================================================================
-- RK GLOBAL - COMPLETE SUPABASE SETUP (Production-ready with RLS)
-- Run this ENTIRE script in Supabase SQL Editor → New Query → Run
--
-- BEFORE GOING LIVE: Create admin user in Supabase Dashboard → Authentication
--   Email must contain "admin" (e.g. admin@rkglobalengineering.com)
--   Set a strong password and confirm the email.
-- ============================================================================

-- ===== FIX BLOGS TABLE =====
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS "readTime" TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS image TEXT;

-- ===== FIX PRODUCTS TABLE =====
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "categoryName" TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "priceFormatted" TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "priceNum" NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "shortDescription" TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "technicalSpecs" JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "keySpecs" JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "minOrderQty" TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "supplyAbility" TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "deliveryTime" TEXT;

-- ===== FIX ENQUIRIES TABLE =====
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'Website Form';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS date TEXT;

-- ===== CREATE ORDERS TABLE =====
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  "customerName" TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  "productName" TEXT,
  "productCode" TEXT,
  "productId" TEXT,
  "productImage" TEXT,
  "priceFormatted" TEXT,
  quantity TEXT,
  unit TEXT,
  "totalAmount" TEXT,
  notes TEXT,
  date TEXT,
  status TEXT DEFAULT 'New Order',
  "createdAt" BIGINT
);

-- ===== FIX CATEGORIES TABLE =====
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT,
  slug TEXT,
  description TEXT,
  image TEXT,
  "itemCount" INT DEFAULT 0
);

-- ===== FIX HERO_SLIDES TABLE =====
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS eyebrow TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS "headingLine1" TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS "headingLine2" TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS "btnPrimaryText" TEXT;
ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS "btnSecondaryText" TEXT;

-- ===== FIX SITE_SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ===== GRANT TABLE PERMISSIONS =====
GRANT ALL ON public.blogs TO anon, authenticated, service_role;
GRANT ALL ON public.products TO anon, authenticated, service_role;
GRANT ALL ON public.enquiries TO anon, authenticated, service_role;
GRANT ALL ON public.orders TO anon, authenticated, service_role;
GRANT ALL ON public.categories TO anon, authenticated, service_role;
GRANT ALL ON public.hero_slides TO anon, authenticated, service_role;
GRANT ALL ON public.site_settings TO anon, authenticated, service_role;

-- ============================================================================
-- ROW LEVEL SECURITY (Production)
-- Public  → read catalog content, submit enquiries/orders
-- Admin   → full access (must be logged in via Supabase Auth, email has "admin")
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.role() = 'authenticated'
    AND (
      (auth.jwt() ->> 'email') ILIKE '%admin%'
      OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'isAdmin')::boolean, false)
    );
$$;

-- Enable RLS on all tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop old policies (safe to re-run)
DROP POLICY IF EXISTS "Public read blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admin manage blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Admin manage products" ON public.products;
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;
DROP POLICY IF EXISTS "Public read hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin manage hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin manage site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin read enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin delete enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Admin read orders" ON public.orders;
DROP POLICY IF EXISTS "Admin update orders" ON public.orders;
DROP POLICY IF EXISTS "Admin delete orders" ON public.orders;

-- Catalog content: anyone can read, only admin can write
CREATE POLICY "Public read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Admin manage blogs" ON public.blogs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Admin manage hero_slides" ON public.hero_slides FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin manage site_settings" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Customer data: public can submit, only admin can view/manage
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read enquiries" ON public.enquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update enquiries" ON public.enquiries FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete enquiries" ON public.enquiries FOR DELETE USING (public.is_admin());

CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read orders" ON public.orders FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete orders" ON public.orders FOR DELETE USING (public.is_admin());
