-- ============================================================================
-- R K GLOBAL ENGINEERING - SUPABASE DATABASE SCHEMA MIGRATION SCRIPT
-- ============================================================================

-- 1. HERO SLIDER SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    badge_text TEXT DEFAULT 'R K GLOBAL ENGINEERING',
    image_url TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Request Quote',
    cta_link TEXT DEFAULT '/quote',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENQUIRIES & BULK QUOTES TRACKING TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    state TEXT,
    category TEXT,
    message TEXT,
    source TEXT DEFAULT 'Popup Modal', -- 'Popup Modal', 'Contact Form', 'Bulk Quote Form'
    status TEXT DEFAULT 'New', -- 'New', 'In Contact', 'Closed', 'Archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRODUCTS CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(12, 2) DEFAULT 0,
    price_formatted TEXT,
    image TEXT NOT NULL,
    description TEXT,
    is_top_selling BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MACHINERY CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 5. BLOG ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT DEFAULT 'R.K. Global Engineering',
    date_formatted TEXT,
    read_time TEXT DEFAULT '5 min read',
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. GLOBAL SITE & THEME SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Theme & Site Settings Seed Data
INSERT INTO public.site_settings (key, value)
VALUES 
    ('theme', '{"primary_color": "#F47B20", "dark_color": "#0B1F33", "brand_name": "R K GLOBAL ENGINEERING"}'),
    ('contact_info', '{"phone": "+91 98765 43210", "email": "info@rkglobalengineering.com", "whatsapp": "+91 98765 43210"}')
ON CONFLICT (key) DO NOTHING;
