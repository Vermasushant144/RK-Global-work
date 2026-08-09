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
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
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
      const storedCats = localStorage.getItem('rk_cms_categories');
      const storedSlides = localStorage.getItem('rk_cms_slides');
      const storedBlogs = localStorage.getItem('rk_cms_blogs');
      const storedAbout = localStorage.getItem('rk_cms_about');

      if (storedProds) {
        try { setProducts(JSON.parse(storedProds)); } catch (e) {}
      }
      if (storedCats) {
        try { setCategories(JSON.parse(storedCats)); } catch (e) {}
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

        const { data: supaCats } = await supabase.from('categories').select('*');
        if (supaCats && supaCats.length > 0) setCategories(supaCats);

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

  // Strip base64 from image field - replace with placeholder for Supabase (base64 too large for HTTP)
  const safeImage = (img, fallback) => {
    if (!img) return fallback || '/images/img/Untitled design - 2026-02-02T154951.040.webp';
    if (String(img).startsWith('data:')) return fallback || '/images/img/Untitled design - 2026-02-02T154951.040.webp';
    return img;
  };

  // --- PAYLOAD SANITIZERS FOR SUPABASE ---
  const cleanProduct = (p) => ({
    id: String(p.id || Date.now()),
    code: p.code || 'RK-PRODUCT',
    name: p.name || 'Machinery',
    categoryName: p.categoryName || p.category || 'Rebar Processing',
    category: p.category || 'rebar-processing',
    priceFormatted: p.priceFormatted || '₹ 1,50,000',
    priceNum: Number(p.priceNum) || 150000,
    shortDescription: p.shortDescription || p.description || '',
    description: p.description || p.shortDescription || '',
    image: safeImage(p.image),
    gallery: Array.isArray(p.gallery) ? p.gallery.map(g => safeImage(g)) : [safeImage(p.image)],
    technicalSpecs: typeof p.technicalSpecs === 'object' && p.technicalSpecs ? p.technicalSpecs : {},
    keySpecs: Array.isArray(p.keySpecs) ? p.keySpecs : [],
    features: Array.isArray(p.features) ? p.features : [],
    minOrderQty: p.minOrderQty || '1 Piece / Pieces',
    supplyAbility: p.supplyAbility || '5 Piece Per Day',
    deliveryTime: p.deliveryTime || '1 - 3 Days'
  });

  const cleanBlog = (b) => ({
    id: String(b.id || Date.now()),
    slug: b.slug || (b.title ? b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `blog-${Date.now()}`),
    title: b.title || 'Untitled Blog',
    category: b.category || 'Technical Guide',
    author: b.author || 'R.K. Global Engineering',
    date: b.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    readTime: b.readTime || '5 min read',
    image: safeImage(b.image, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'),
    excerpt: b.excerpt || b.title || '',
    content: b.content || '<p>Article content...</p>'
  });

  const cleanCategory = (c) => ({
    id: String(c.id || c.slug || Date.now()),
    name: c.name || 'Category',
    slug: c.slug || (c.name ? c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `cat-${Date.now()}`),
    description: c.description || '',
    image: safeImage(c.image),
    itemCount: Number(c.itemCount) || 0
  });

  const cleanSlide = (s) => ({
    id: String(s.id || Date.now()),
    title: s.title || 'Heavy Duty Construction Machinery',
    subtitle: s.subtitle || '',
    badge: s.badge || 'OFFICIAL MANUFACTURER',
    image: safeImage(s.image),
    eyebrow: s.eyebrow || s.badge || 'OFFICIAL MANUFACTURER',
    headingLine1: s.headingLine1 || s.title || '',
    headingLine2: s.headingLine2 || '',
    description: s.description || s.subtitle || '',
    features: Array.isArray(s.features) ? s.features : [],
    btnPrimaryText: s.btnPrimaryText || 'Request Quote Now',
    btnSecondaryText: s.btnSecondaryText || 'View 2026 Catalog'
  });

  // --- PRODUCT CRUD ---
  const addProduct = async (prodData) => {
    const cleaned = cleanProduct(prodData);
    const updated = [cleaned, ...products];
    setProducts(updated);
    saveStorage('rk_cms_products', updated);

    try {
      console.log('Sending to Supabase products:', cleaned);
      const { data, error } = await supabase.from('products').upsert([cleaned]);
      if (error) {
        console.error('Supabase addProduct Error:', error);
        if (typeof window !== 'undefined') {
          alert('Supabase Product Error:\n' + (error.message || error.hint || JSON.stringify(error)));
        }
      } else {
        console.log('Supabase addProduct SUCCESS:', data);
      }
    } catch (err) {
      console.error('Supabase addProduct Exception:', err);
      if (typeof window !== 'undefined') alert('Product save exception: ' + err.message);
    }
  };

  const updateProduct = async (updatedProd) => {
    const cleaned = cleanProduct(updatedProd);
    const updated = products.map(p => String(p.id) === String(cleaned.id) ? cleaned : p);
    setProducts(updated);
    saveStorage('rk_cms_products', updated);

    try {
      const { data, error } = await supabase.from('products').upsert([cleaned]);
      if (error) console.error('Supabase updateProduct Error:', error);
      else console.log('Supabase updateProduct Success:', data);
    } catch (err) {
      console.error('Supabase updateProduct Exception:', err);
    }
  };

  const deleteProduct = async (id) => {
    const targetId = String(id);
    const updated = products.filter(p => String(p.id) !== targetId);
    setProducts(updated);
    saveStorage('rk_cms_products', updated);

    try {
      const { error } = await supabase.from('products').delete().eq('id', targetId);
      if (error) console.error('Supabase deleteProduct Error:', error);
    } catch (err) {}
  };

  // --- SLIDE CRUD ---
  const addSlide = async (slideData) => {
    const cleaned = cleanSlide(slideData);
    const updated = [...slides, cleaned];
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);

    try {
      const { error } = await supabase.from('hero_slides').upsert([cleaned]);
      if (error) console.error('Supabase addSlide Error:', error);
    } catch (err) {}
  };

  const updateSlide = async (updatedSlide) => {
    const cleaned = cleanSlide(updatedSlide);
    const updated = slides.map(s => String(s.id) === String(cleaned.id) ? cleaned : s);
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);

    try {
      const { error } = await supabase.from('hero_slides').upsert([cleaned]);
      if (error) console.error('Supabase updateSlide Error:', error);
    } catch (err) {}
  };

  const deleteSlide = async (id) => {
    const targetId = String(id);
    const updated = slides.filter(s => String(s.id) !== targetId);
    setSlides(updated);
    saveStorage('rk_cms_slides', updated);

    try {
      const { error } = await supabase.from('hero_slides').delete().eq('id', targetId);
      if (error) console.error('Supabase deleteSlide Error:', error);
    } catch (err) {}
  };

  // --- BLOG CRUD ---
  const addBlog = async (blogData) => {
    const cleaned = cleanBlog(blogData);
    const updated = [cleaned, ...blogs];
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);

    try {
      console.log('Sending to Supabase blogs:', cleaned);
      const { data, error } = await supabase.from('blogs').upsert([cleaned]);
      if (error) {
        console.error('Supabase addBlog Error:', error);
        if (typeof window !== 'undefined') {
          alert('Supabase Blog Error:\n' + (error.message || error.hint || JSON.stringify(error)));
        }
      } else {
        console.log('Supabase addBlog SUCCESS:', data);
      }
    } catch (err) {
      console.error('Supabase addBlog Exception:', err);
      if (typeof window !== 'undefined') alert('Blog save exception: ' + err.message);
    }
  };

  const updateBlog = async (updatedBlog) => {
    const cleaned = cleanBlog(updatedBlog);
    const updated = blogs.map(b => String(b.id) === String(cleaned.id) ? cleaned : b);
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);

    try {
      const { data, error } = await supabase.from('blogs').upsert([cleaned]);
      if (error) console.error('Supabase updateBlog Error:', error);
      else console.log('Supabase updateBlog Success:', data);
    } catch (err) {
      console.error('Supabase updateBlog Exception:', err);
    }
  };

  const deleteBlog = async (id) => {
    const targetId = String(id);
    const updated = blogs.filter(b => String(b.id) !== targetId);
    setBlogs(updated);
    saveStorage('rk_cms_blogs', updated);

    try {
      const { error } = await supabase.from('blogs').delete().eq('id', targetId);
      if (error) console.error('Supabase deleteBlog Error:', error);
    } catch (err) {}
  };

  // --- CATEGORY CRUD ---
  const addCategory = async (catData) => {
    const cleaned = cleanCategory(catData);
    const updated = [cleaned, ...categories];
    setCategories(updated);
    saveStorage('rk_cms_categories', updated);

    try {
      const { error } = await supabase.from('categories').upsert([cleaned]);
      if (error) console.error('Supabase addCategory Error:', error);
    } catch (err) {
      console.error('Supabase addCategory Exception:', err);
    }
  };

  const updateCategory = async (updatedCat) => {
    const cleaned = cleanCategory(updatedCat);
    const updated = categories.map(c => String(c.id) === String(cleaned.id) ? cleaned : c);
    setCategories(updated);
    saveStorage('rk_cms_categories', updated);

    try {
      const { error } = await supabase.from('categories').upsert([cleaned]);
      if (error) console.error('Supabase updateCategory Error:', error);
    } catch (err) {
      console.error('Supabase updateCategory Exception:', err);
    }
  };

  const deleteCategory = async (id) => {
    const targetId = String(id);
    const updated = categories.filter(c => String(c.id) !== targetId);
    setCategories(updated);
    saveStorage('rk_cms_categories', updated);

    try {
      const { error } = await supabase.from('categories').delete().eq('id', targetId);
      if (error) console.error('Supabase deleteCategory Error:', error);
    } catch (err) {}
  };

  // --- ABOUT US CRUD ---
  const updateAbout = async (newAboutData) => {
    setAboutData(newAboutData);
    saveStorage('rk_cms_about', newAboutData);

    try {
      const { error } = await supabase.from('site_settings').upsert([{ key: 'about_section', value: newAboutData }]);
      if (error) console.error('Supabase updateAbout Error:', error);
    } catch (err) {}
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
      addCategory,
      updateCategory,
      deleteCategory,
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
