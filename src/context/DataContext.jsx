'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';
import { categories as defaultCategories } from '../data/categories';
import { insights as defaultBlogs } from '../data/insights';
import { supabase } from '../lib/supabaseClient';

const defaultSlides = [
  { 
    id: '1', 
    title: 'Heavy Duty Rebar Cutting & Bending Machines', 
    subtitle: 'High precision hydraulic benders for infrastructure contractors.', 
    badge: 'OFFICIAL MANUFACTURER', 
    image: '/images/img/Untitled design - 2026-02-02T154951.040.webp',
    eyebrow: 'OFFICIAL MANUFACTURER',
    headingLine1: 'Heavy Duty Rebar Cutting',
    headingLine2: '& Bending Machines',
    description: 'High precision hydraulic benders for infrastructure contractors.',
    features: [
      { icon: 'ShieldCheck', label: 'ISO 9001 Certified' },
      { icon: 'Award', label: 'Factory Direct Price' },
      { icon: 'Wrench', label: '1-Year Warranty' },
      { icon: 'CheckCircle2', label: 'Pan-India Delivery' }
    ]
  },
  { 
    id: '2', 
    title: 'Industrial Grade Concrete Mixers & Batching', 
    subtitle: 'Ex-factory prices across India with site warranty.', 
    badge: 'BESTSELLER 2026', 
    image: '/images/img/CONCRETE MIXER MACHINE WITH LIFT.webp',
    eyebrow: 'BESTSELLER 2026',
    headingLine1: 'Industrial Grade Concrete Mixers',
    headingLine2: '& Batching Machinery',
    description: 'Ex-factory prices across India with site warranty.',
    features: [
      { icon: 'ShieldCheck', label: 'High Batch Capacity' },
      { icon: 'Award', label: 'Heavy Steel Drum' },
      { icon: 'Wrench', label: 'Site Support' },
      { icon: 'CheckCircle2', label: 'Ex-Factory Price' }
    ]
  },
  { 
    id: '3', 
    title: 'High Rise Suspended Platform Hoists', 
    subtitle: 'ZLP800 800kg load rating with safety lock mechanism.', 
    badge: 'PAN INDIA DELIVERY', 
    image: '/images/img/SUSPENDED PLATFORM.webp',
    eyebrow: 'PAN INDIA DELIVERY',
    headingLine1: 'High Rise Suspended',
    headingLine2: 'Platform Hoists (ZLP800)',
    description: 'ZLP800 800kg load rating with safety lock mechanism.',
    features: [
      { icon: 'ShieldCheck', label: 'ZLP800 Standard' },
      { icon: 'Award', label: '800kg Load Rating' },
      { icon: 'Wrench', label: 'Safety Lock Mechanism' },
      { icon: 'CheckCircle2', label: 'Pan India Onsite Service' }
    ]
  }
];

const defaultAboutData = {
  eyebrow: 'OFFICIAL R.K. GLOBAL ENGINEERING',
  title: 'Two Decades of Engineering Excellence in Construction Machinery',
  subtitle: 'We combine heavy manufacturing precision with ISO 9001 quality controls to deliver rugged machinery contractors trust implicitly across India.',
  experienceBadgeText: '20+ YEARS',
  experienceBadgeSub: 'Manufacturing Excellence',
  image: '/images/img/Untitled design - 2026-02-02T154951.040.webp',
  feature1Title: 'Factory Direct Pricing & Transparent Warranty',
  feature1Desc: 'Eliminate middleman margins with ex-factory pricing and 1-year comprehensive warranty.',
  feature2Title: 'Pan-India On-Site Technical Service Support',
  feature2Desc: 'Dedicated field engineering team for fast installation, operator training, and spare parts delivery.'
};

const DataContext = createContext({
  products: [],
  categories: [],
  slides: [],
  blogs: [],
  aboutData: defaultAboutData,
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addSlide: () => {},
  updateSlide: () => {},
  deleteSlide: () => {},
  addBlog: () => {},
  updateBlog: () => {},
  deleteBlog: () => {},
  updateAbout: () => {}
});

export function DataProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [slides, setSlides] = useState(defaultSlides);
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [aboutData, setAboutData] = useState(defaultAboutData);

  const normalizeSlide = (s) => ({
    id: s.id || Date.now().toString(),
    title: s.title || 'Heavy Duty Construction Machinery',
    subtitle: s.subtitle || 'High precision B2B machinery manufactured in India.',
    badge: s.badge || 'OFFICIAL MANUFACTURER',
    image: s.image || '/images/img/Untitled design - 2026-02-02T154951.040.webp',
    eyebrow: s.badge || s.eyebrow || 'OFFICIAL MANUFACTURER',
    headingLine1: s.title || 'Heavy Duty Construction Machinery',
    headingLine2: '',
    description: s.subtitle || 'High precision B2B machinery manufactured in India.',
    features: s.features && Array.isArray(s.features) ? s.features : [
      { icon: 'ShieldCheck', label: 'ISO 9001 Certified' },
      { icon: 'Award', label: 'Factory Direct Price' },
      { icon: 'Wrench', label: '1-Year Warranty' },
      { icon: 'CheckCircle2', label: 'Pan-India Delivery' }
    ]
  });

  // Synchronize on initial mount from localStorage / Supabase
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProds = localStorage.getItem('rk_cms_products');
      const storedSlides = localStorage.getItem('rk_cms_slides');
      const storedBlogs = localStorage.getItem('rk_cms_blogs');
      const storedAbout = localStorage.getItem('rk_cms_about');

      if (storedProds) {
        try { setProducts(JSON.parse(storedProds)); } catch (e) {}
      }
      if (storedSlides) {
        try {
          const parsed = JSON.parse(storedSlides);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(parsed.map(normalizeSlide));
          }
        } catch (e) {}
      }
      if (storedBlogs) {
        try { setBlogs(JSON.parse(storedBlogs)); } catch (e) {}
      }
      if (storedAbout) {
        try { setAboutData(JSON.parse(storedAbout)); } catch (e) {}
      }
    }

    // Try fetching from Supabase database
    const syncFromSupabase = async () => {
      try {
        const { data: supaProds } = await supabase.from('products').select('*');
        if (supaProds && supaProds.length > 0) setProducts(supaProds);

        const { data: supaSlides } = await supabase.from('hero_slides').select('*');
        if (supaSlides && supaSlides.length > 0) {
          const normSupa = supaSlides.map(normalizeSlide);
          setSlides(normSupa);
          saveStorage('rk_cms_slides', normSupa);
        }

        const { data: supaBlogs } = await supabase.from('blogs').select('*');
        if (supaBlogs && supaBlogs.length > 0) setBlogs(supaBlogs);
      } catch (err) {}
    };

    syncFromSupabase();
  }, []);

  // Save to Storage helper
  const saveStorage = (key, data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // --- PRODUCT CRUD ---
  const addProduct = (prodData) => {
    const newP = { ...prodData, id: prodData.id || Date.now().toString() };
    const updated = [newP, ...products];
    setProducts(updated);
    saveStorage('rk_cms_products', updated);
    supabase.from('products').insert(newP).then(() => {}).catch(() => {});
  };

  const updateProduct = (updatedProd) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    setProducts(updated);
    saveStorage('rk_cms_products', updated);
    supabase.from('products').upsert(updatedProd).then(() => {}).catch(() => {});
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveStorage('rk_cms_products', updated);
    supabase.from('products').delete().eq('id', id).then(() => {}).catch(() => {});
  };

  // --- SLIDE CRUD ---
  const addSlide = (slideData) => {
    const normalized = normalizeSlide({ ...slideData, id: Date.now().toString() });
    const updated = [...slides, normalized];
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);
    supabase.from('hero_slides').insert(normalized).then(() => {}).catch(() => {});
  };

  const updateSlide = (updatedSlide) => {
    const normalized = normalizeSlide(updatedSlide);
    const updated = slides.map(s => s.id === normalized.id ? normalized : s);
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);
    supabase.from('hero_slides').upsert(normalized).then(() => {}).catch(() => {});
  };

  const deleteSlide = (id) => {
    const updated = slides.filter(s => s.id !== id);
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);
    supabase.from('hero_slides').delete().eq('id', id).then(() => {}).catch(() => {});
  };

  // --- BLOG CRUD ---
  const addBlog = (blogData) => {
    const newB = { ...blogData, id: Date.now().toString(), slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    const updated = [newB, ...blogs];
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);
    supabase.from('blogs').insert(newB).then(() => {}).catch(() => {});
  };

  const updateBlog = (updatedBlog) => {
    const updated = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b);
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);
    supabase.from('blogs').upsert(updatedBlog).then(() => {}).catch(() => {});
  };

  const deleteBlog = (id) => {
    const updated = blogs.filter(b => b.id !== id);
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);
    supabase.from('blogs').delete().eq('id', id).then(() => {}).catch(() => {});
  };

  // --- ABOUT US CRUD ---
  const updateAbout = (newAboutData) => {
    setAboutData(newAboutData);
    saveStorage('rk_cms_about', newAboutData);
    supabase.from('site_settings').upsert({ key: 'about_section', value: newAboutData }).then(() => {}).catch(() => {});
  };

  return (
    <DataContext.Provider value={{
      products,
      categories,
      slides,
      blogs,
      aboutData,
      addProduct,
      updateProduct,
      deleteProduct,
      addSlide,
      updateSlide,
      deleteSlide,
      addBlog,
      updateBlog,
      deleteBlog,
      updateAbout
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
