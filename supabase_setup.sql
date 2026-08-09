-- ============================================================================
-- RK GLOBAL - COMPLETE SUPABASE FIX SCRIPT
-- Run this ENTIRE script in Supabase SQL Editor → New Query → Run
-- ============================================================================

-- ===== FIX BLOGS TABLE =====
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS "readTime" TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

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
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- ===== FIX ENQUIRIES TABLE =====
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'Website Form';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.enquiries DISABLE ROW LEVEL SECURITY;

-- ===== FIX CATEGORIES TABLE =====
-- Create if not exists
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT,
  slug TEXT,
  description TEXT,
  image TEXT,
  "itemCount" INT DEFAULT 0
);
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.categories TO anon, authenticated, service_role;

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
ALTER TABLE public.hero_slides DISABLE ROW LEVEL SECURITY;

-- ===== FIX SITE_SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.site_settings TO anon, authenticated, service_role;

-- ===== GRANT ALL PERMISSIONS =====
GRANT ALL ON public.blogs TO anon, authenticated, service_role;
GRANT ALL ON public.products TO anon, authenticated, service_role;
GRANT ALL ON public.enquiries TO anon, authenticated, service_role;
GRANT ALL ON public.categories TO anon, authenticated, service_role;
GRANT ALL ON public.hero_slides TO anon, authenticated, service_role;
GRANT ALL ON public.site_settings TO anon, authenticated, service_role;
