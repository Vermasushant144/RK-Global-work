'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Phone, 
  Mail, 
  Sliders, 
  Save, 
  ArrowLeft,
  X,
  Building2,
  Upload,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { insights as initialBlogs } from '../../data/insights';

import { useData } from '../../context/DataContext';

export default function AdminDashboardPage() {
  const { logout, isAdmin } = useAuth();
  const { 
    products, 
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
  } = useData();

  const [activeTab, setActiveTab] = useState('enquiries');

  // Notification Banner State
  const [notification, setNotification] = useState('');
  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Helper for File Picker (Choose File) image conversion & preview
  const handleFileChoose = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 1. ENQUIRIES STATE — Load from localStorage + Supabase
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const loadEnquiries = async () => {
      // Load from localStorage first (instant)
      try {
        const local = JSON.parse(localStorage.getItem('rk_enquiries') || '[]');
        if (local.length > 0) setEnquiries(local);
      } catch (e) {}

      // Then fetch from Supabase (fresh data)
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('createdAt', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(d => ({
            id: String(d.id),
            name: d.name || '',
            email: d.email || '',
            phone: d.phone || '',
            product: d.product || '',
            message: d.message || '',
            source: 'Form',
            status: 'New',
            date: d.createdAt ? new Date(d.createdAt).toLocaleString('en-IN') : ''
          }));
          setEnquiries(mapped);
          // Sync to localStorage
          localStorage.setItem('rk_enquiries', JSON.stringify(mapped));
        }
      } catch (e) {}
    };

    loadEnquiries();
  }, []);

  // Modal states for CRUD operations
  const emptySlideData = {
    id: '',
    title: '',
    subtitle: '',
    badge: 'OFFICIAL MANUFACTURER',
    image: '/images/img/Untitled design - 2026-02-02T154951.040.webp',
    feat1: 'ISO 9001 Certified',
    feat2: 'Factory Direct Price',
    feat3: '1-Year Warranty',
    feat4: 'Pan-India Delivery',
    btnPrimaryText: 'Request Quote Now',
    btnSecondaryText: 'View 2026 Catalog'
  };

  const [slideModal, setSlideModal] = useState({ open: false, isEdit: false, data: emptySlideData });

  const openSlideModal = (slide = null) => {
    if (!slide) {
      setSlideModal({ open: true, isEdit: false, data: emptySlideData });
    } else {
      const feats = slide.features || [];
      setSlideModal({
        open: true,
        isEdit: true,
        data: {
          ...emptySlideData,
          ...slide,
          title: slide.title || (slide.headingLine1 ? `${slide.headingLine1} ${slide.headingLine2 || ''}` : ''),
          subtitle: slide.subtitle || slide.description || '',
          badge: slide.badge || slide.eyebrow || 'OFFICIAL MANUFACTURER',
          feat1: feats[0]?.label || feats[0]?.text || 'ISO 9001 Certified',
          feat2: feats[1]?.label || feats[1]?.text || 'Factory Direct Price',
          feat3: feats[2]?.label || feats[2]?.text || '1-Year Warranty',
          feat4: feats[3]?.label || feats[3]?.text || 'Pan-India Delivery',
          btnPrimaryText: slide.btnPrimaryText || 'Request Quote Now',
          btnSecondaryText: slide.btnSecondaryText || 'View 2026 Catalog'
        }
      });
    }
  };

  const emptyProductData = {
    id: '',
    code: '',
    name: '',
    categoryName: 'Rebar Processing',
    category: 'cutting',
    priceFormatted: '₹ 1,50,000',
    priceNum: 150000,
    shortDescription: '',
    description: '',
    image: '/images/img/Untitled design - 2026-02-02T154951.040.webp',
    gallery: ['/images/img/Untitled design - 2026-02-02T154951.040.webp'],
    specsText: 'Single wire bending: 5-13mm\nDouble wire bending: 5-10mm\nVoltage: 380V-50Hz-3P\nMachine Net Weight: 2300kg',
    featuresText: 'High-speed CNC servo system\nIntegrated automatic wire feeding & straightening\nPrecision length tolerance ±1mm',
    minOrderQty: '1 Piece / Pieces',
    supplyAbility: '5 Piece Per Day',
    deliveryTime: '1 - 3 Days'
  };

  const [productModal, setProductModal] = useState({ open: false, isEdit: false, data: emptyProductData });

  const openProductModal = (prod = null) => {
    if (!prod) {
      setProductModal({ open: true, isEdit: false, data: emptyProductData });
    } else {
      let specsStr = '';
      if (prod.technicalSpecs && typeof prod.technicalSpecs === 'object') {
        specsStr = Object.entries(prod.technicalSpecs).map(([k, v]) => `${k}: ${v}`).join('\n');
      } else if (prod.keySpecs && Array.isArray(prod.keySpecs)) {
        specsStr = prod.keySpecs.map(s => `${s.label}: ${s.value}`).join('\n');
      }

      let featuresStr = '';
      if (prod.features && Array.isArray(prod.features)) {
        featuresStr = prod.features.map(f => typeof f === 'string' ? f : f.label || f.text || '').join('\n');
      }

      setProductModal({
        open: true,
        isEdit: true,
        data: {
          ...emptyProductData,
          ...prod,
          categoryName: prod.categoryName || prod.category || 'Rebar Processing',
          shortDescription: prod.shortDescription || prod.description || '',
          description: prod.description || prod.shortDescription || '',
          specsText: specsStr || 'Single wire bending: 5-13mm\nVoltage: 380V-50Hz-3P',
          featuresText: featuresStr || 'Heavy duty construction machine\n1-Year Comprehensive Warranty',
          minOrderQty: prod.minOrderQty || '1 Piece / Pieces',
          supplyAbility: prod.supplyAbility || '5 Piece Per Day',
          deliveryTime: prod.deliveryTime || '1 - 3 Days'
        }
      });
    }
  };

  const [blogModal, setBlogModal] = useState({
    open: false,
    isEdit: false,
    data: { id: '', title: '', category: 'Rebar Processing', author: 'R.K. Global Engineering', date: 'Aug 08, 2026', readTime: '5 min read', image: '/images/about-banner.png', content: '<p>Enter article content here...</p>' }
  });

  const [aboutFormState, setAboutFormState] = useState(aboutData || {
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
  });

  // 6. THEME & SITE SETTINGS STATE
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#F47B20',
    darkColor: '#0B1F33',
    companyName: 'R K GLOBAL ENGINEERING',
    contactPhone: '+91 98765 43210',
    contactEmail: 'info@rkglobalengineering.com'
  });

  // Load from Supabase if configured
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: supaEnquiries } = await supabase.from('enquiries').select('*');
        if (supaEnquiries && supaEnquiries.length > 0) setEnquiries(supaEnquiries);

        const { data: supaSlides } = await supabase.from('hero_slides').select('*');
        if (supaSlides && supaSlides.length > 0) setSlides(supaSlides);

        const { data: supaProducts } = await supabase.from('products').select('*');
        if (supaProducts && supaProducts.length > 0) setProducts(supaProducts);

        const { data: supaBlogs } = await supabase.from('blogs').select('*');
        if (supaBlogs && supaBlogs.length > 0) setBlogs(supaBlogs);
      } catch (err) {
        console.log('Supabase sync ready on connection.');
      }
    };
    fetchSupabaseData();
  }, []);

  // --- HANDLERS ---
  const handleStatusChange = async (id, newStatus) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    try {
      await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
    } catch (e) {}
    showNotify('Lead status updated & saved to database.');
  };

  // Slider Handlers
  const handleSaveSlide = async (e) => {
    e.preventDefault();
    const slideToSave = {
      ...slideModal.data,
      headingLine1: slideModal.data.title,
      headingLine2: '',
      eyebrow: slideModal.data.badge,
      description: slideModal.data.subtitle,
      features: [
        { icon: 'ShieldCheck', label: slideModal.data.feat1 || 'ISO 9001 Certified' },
        { icon: 'Award', label: slideModal.data.feat2 || 'Factory Direct Price' },
        { icon: 'Wrench', label: slideModal.data.feat3 || '1-Year Warranty' },
        { icon: 'CheckCircle2', label: slideModal.data.feat4 || 'Pan-India Delivery' }
      ]
    };

    if (slideModal.isEdit) {
      updateSlide(slideToSave);
      showNotify('Hero slide updated & saved live to website!');
    } else {
      addSlide(slideToSave);
      showNotify('New slide added live to website slider!');
    }
    setSlideModal({ open: false, isEdit: false, data: emptySlideData });
  };
  const handleDeleteSlide = async (id) => {
    if (confirm('Delete this slide from homepage carousel?')) {
      deleteSlide(id);
      showNotify('Slide deleted from website.');
    }
  };

  // Product Handlers
  const handleSaveProduct = async (e) => {
    e.preventDefault();

    // Parse technicalSpecs object & keySpecs array from specsText
    const technicalSpecs = {};
    const keySpecs = [];
    if (productModal.data.specsText) {
      const lines = productModal.data.specsText.split('\n');
      lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join(':').trim();
          if (key && val) {
            technicalSpecs[key] = val;
            keySpecs.push({ label: key, value: val });
          }
        }
      });
    }

    // Parse features list from featuresText
    const featuresList = (productModal.data.featuresText || '')
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    // Numeric price extraction
    const rawPrice = String(productModal.data.priceFormatted || '').replace(/[^0-9]/g, '');
    const priceNum = rawPrice ? parseInt(rawPrice, 10) : 150000;

    const prodId = productModal.data.id || (productModal.data.code ? productModal.data.code.toLowerCase().replace(/[^a-z0-9]+/g, '-') : Date.now().toString());

    const productToSave = {
      ...productModal.data,
      id: prodId,
      code: productModal.data.code || 'RK-NEW',
      category: (productModal.data.categoryName || 'Rebar Processing').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryName: productModal.data.categoryName || 'Rebar Processing',
      priceNum: priceNum,
      gallery: [productModal.data.image],
      technicalSpecs: Object.keys(technicalSpecs).length > 0 ? technicalSpecs : { "Standard": "Heavy Duty Construction" },
      keySpecs: keySpecs.length > 0 ? keySpecs : [{ label: "Warranty", value: "1 Year Manufacturer Warranty" }],
      features: featuresList.length > 0 ? featuresList : ["Heavy Duty Steel Frame", "ISO 9001 Quality Control"],
    };

    if (productModal.isEdit) {
      updateProduct(productToSave);
      showNotify('Product updated & saved live to website!');
    } else {
      addProduct(productToSave);
      showNotify('New product saved live to catalog!');
    }
    setProductModal({ open: false, isEdit: false, data: emptyProductData });
  };
  const handleDeleteProduct = async (id) => {
    if (confirm('Delete this product from catalog?')) {
      deleteProduct(id);
      showNotify('Product deleted from website.');
    }
  };

  // Blog Handlers
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (blogModal.isEdit) {
      updateBlog(blogModal.data);
      showNotify('Blog article updated & saved live!');
    } else {
      addBlog(blogModal.data);
      showNotify('New blog post published live!');
    }
    setBlogModal({ open: false, isEdit: false, data: { id: '', title: '', category: 'Rebar Processing', author: 'R.K. Global Engineering', date: 'Aug 08, 2026', readTime: '5 min read', image: '/images/about-banner.png', content: '<p>Enter article content here...</p>' } });
  };
  const handleDeleteBlog = async (id) => {
    if (confirm('Delete this blog article?')) {
      deleteBlog(id);
      showNotify('Blog article deleted from website.');
    }
  };

  // Save About Handler
  const handleSaveAbout = async (e) => {
    e.preventDefault();
    updateAbout(aboutData);
    showNotify('About Us section updated & saved live to website!');
  };

  // Save Theme Handler
  const handleSaveTheme = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('site_settings').upsert({ key: 'theme_settings', value: themeSettings });
    } catch (err) {}
    showNotify('Theme & site contact settings saved to Supabase!');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Toast Notification Banner */}
      {notification && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#F47B20', color: '#FFFFFF', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(244,123,32,0.4)', zIndex: 9999, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header style={{ backgroundColor: '#0B1F33', color: '#FFFFFF', padding: '16px 0', borderBottom: '4px solid #F47B20' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 600 }}>
              <ArrowLeft size={16} />
              <span>Back to Website</span>
            </Link>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.04em' }}>
              R.K. GLOBAL ADMIN CMS
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.78rem', backgroundColor: '#F47B20', color: '#FFFFFF', fontWeight: 800, padding: '4px 10px', borderRadius: '4px' }}>
              ADMINISTRATOR
            </span>

            <button 
              type="button" 
              onClick={logout}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      <div className="container" style={{ paddingTop: '32px' }}>
        
        {/* Main Admin Tab Buttons */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '4px' }}>
          {[
            { id: 'enquiries', label: 'Dashboard & Enquiries', icon: LayoutDashboard, count: enquiries.length },
            { id: 'slider', label: 'Hero Slider', icon: Sliders, count: slides.length },
            { id: 'products', label: 'Products Catalog', icon: Package, count: products.length },
            { id: 'blogs', label: 'Blogs CMS', icon: FileText, count: blogs.length },
            { id: 'about', label: 'About Us Section', icon: Building2 },
            { id: 'theme', label: 'Theme & Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #F47B20' : '1px solid #E2E8F0',
                  backgroundColor: isActive ? '#F47B20' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#1E293B',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 12px rgba(244, 123, 32, 0.3)' : '0 2px 6px rgba(0,0,0,0.02)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{ 
                    backgroundColor: isActive ? '#FFFFFF' : '#F1F5F9', 
                    color: isActive ? '#F47B20' : '#475569',
                    fontSize: '0.75rem',
                    padding: '2px 7px',
                    borderRadius: '12px',
                    fontWeight: 900
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ------------------- TAB 1: ENQUIRIES ------------------- */}
        {activeTab === 'enquiries' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Enquiries</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0B1F33' }}>{enquiries.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>New Unread Leads</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F47B20' }}>{enquiries.filter(e => e.status === 'New').length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Follow Up</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#16A34A' }}>{enquiries.filter(e => e.status === 'In Contact').length}</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>
                All Lead Enquiries & Quotation Submissions
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
                      <th style={{ padding: '12px' }}>Name & Contact</th>
                      <th style={{ padding: '12px' }}>State / Region</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Source</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(enq => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ fontWeight: 800, color: '#1E293B' }}>{enq.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{enq.phone} • {enq.email}</div>
                        </td>
                        <td style={{ padding: '14px 12px', fontWeight: 700, color: '#334155' }}>{enq.state}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 700, color: '#F47B20' }}>{enq.category}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: '0.75rem', fontWeight: 800, padding: '4px 8px', borderRadius: '4px' }}>
                            {enq.source}
                          </span>
                        </td>
                        <td style={{ padding: '14px 12px', color: '#64748B' }}>{enq.date}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <select 
                            value={enq.status} 
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              backgroundColor: enq.status === 'New' ? '#FFF7ED' : enq.status === 'In Contact' ? '#FEF3C7' : '#DCFCE7',
                              color: enq.status === 'New' ? '#F47B20' : enq.status === 'In Contact' ? '#D97706' : '#16A34A',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="In Contact">In Contact</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------- TAB 2: HERO SLIDER ------------------- */}
        {activeTab === 'slider' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B' }}>
                Manage Homepage Hero Carousel Slides ({slides.length})
              </h2>
              <button 
                type="button" 
                onClick={() => openSlideModal()}
                style={{
                  backgroundColor: '#F47B20',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Add New Slide</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slides.map((slide, idx) => (
                <div key={slide.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={slide.image} alt={slide.title || 'Slide'} style={{ width: '110px', height: '75px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F47B20', textTransform: 'uppercase' }}>Slide #{idx + 1} • {slide.badge || slide.eyebrow}</div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '4px 0' }}>{slide.title || slide.headingLine1}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{slide.subtitle || slide.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => openSlideModal(slide)} style={{ backgroundColor: '#F1F5F9', color: '#1E293B', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteSlide(slide.id)} style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------- TAB 3: PRODUCTS ------------------- */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B' }}>
                Machinery Products Catalog ({products.length} Products)
              </h2>
              <button 
                type="button" 
                onClick={() => openProductModal()}
                style={{
                  backgroundColor: '#F47B20',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {products.map((prod) => (
                <div key={prod.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: '8px', marginBottom: '14px', padding: '10px' }}>
                    <img src={prod.image} alt={prod.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F47B20' }}>{prod.code}</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '6px', minHeight: '40px' }}>{prod.name}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#16A34A', fontWeight: 800, marginBottom: '16px' }}>{prod.priceFormatted}</div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button type="button" onClick={() => openProductModal(prod)} style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#1E293B', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteProduct(prod.id)} style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------- TAB 4: BLOGS CMS ------------------- */}
        {activeTab === 'blogs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B' }}>
                Blog Articles ({blogs.length} Posts)
              </h2>
              <button 
                type="button" 
                onClick={() => setBlogModal({ open: true, isEdit: false, data: { id: '', title: '', category: 'Technical Guide', author: 'R.K. Global Engineering', date: 'Aug 08, 2026', readTime: '5 min read', image: '/images/about-banner.png', content: '<p>Article details go here...</p>' } })}
                style={{
                  backgroundColor: '#F47B20',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Create Blog Post</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {blogs.map((blog) => (
                <div key={blog.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={blog.image} alt={blog.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F47B20', textTransform: 'uppercase' }}>{blog.category}</span>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', margin: '2px 0' }}>{blog.title}</h3>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>By {blog.author} • {blog.date}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => setBlogModal({ open: true, isEdit: true, data: blog })} style={{ backgroundColor: '#F1F5F9', color: '#1E293B', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteBlog(blog.id)} style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------- TAB 5: ABOUT US EDITOR ------------------- */}
        {activeTab === 'about' && (
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B', marginBottom: '24px' }}>
                Edit Homepage "About Us" Section Content
              </h2>

              <form onSubmit={handleSaveAbout} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label className="form-label">Section Eyebrow Badge</label>
                  <input type="text" className="form-input" value={aboutFormState.eyebrow} onChange={e => setAboutFormState({ ...aboutFormState, eyebrow: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Main Section Heading Title *</label>
                  <input type="text" className="form-input" required value={aboutFormState.title} onChange={e => setAboutFormState({ ...aboutFormState, title: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Main Description Text *</label>
                  <textarea className="form-textarea" rows={4} value={aboutFormState.subtitle} onChange={e => setAboutFormState({ ...aboutFormState, subtitle: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Experience Badge Number</label>
                    <input type="text" className="form-input" value={aboutFormState.experienceBadgeText} onChange={e => setAboutFormState({ ...aboutFormState, experienceBadgeText: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Experience Badge Subtitle</label>
                    <input type="text" className="form-input" value={aboutFormState.experienceBadgeSub} onChange={e => setAboutFormState({ ...aboutFormState, experienceBadgeSub: e.target.value })} />
                  </div>
                </div>

                {/* Choose Image File Picker */}
                <div>
                  <label className="form-label">Choose About Section Image File</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setAboutFormState({ ...aboutFormState, image: url }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC' }}
                    />
                    {aboutFormState.image && (
                      <img src={aboutFormState.image} alt="About Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Feature Point #1 Title</label>
                  <input type="text" className="form-input" value={aboutFormState.feature1Title} onChange={e => setAboutFormState({ ...aboutFormState, feature1Title: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Feature Point #1 Description</label>
                  <input type="text" className="form-input" value={aboutFormState.feature1Desc} onChange={e => setAboutFormState({ ...aboutFormState, feature1Desc: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Feature Point #2 Title</label>
                  <input type="text" className="form-input" value={aboutFormState.feature2Title} onChange={e => setAboutFormState({ ...aboutFormState, feature2Title: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Feature Point #2 Description</label>
                  <input type="text" className="form-input" value={aboutFormState.feature2Desc} onChange={e => setAboutFormState({ ...aboutFormState, feature2Desc: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                  <Save size={16} />
                  <span>Update About Us Section</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- TAB 6: THEME & SETTINGS ------------------- */}
        {activeTab === 'theme' && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>
                Website Theme & Contact Settings
              </h2>

              <form onSubmit={handleSaveTheme} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label className="form-label">Primary Brand Accent Color</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      style={{ width: '44px', height: '44px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      className="form-input" 
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Company Brand Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={themeSettings.companyName}
                    onChange={(e) => setThemeSettings({ ...themeSettings, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Sales Hotline Phone</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={themeSettings.contactPhone}
                    onChange={(e) => setThemeSettings({ ...themeSettings, contactPhone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Sales Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={themeSettings.contactEmail}
                    onChange={(e) => setThemeSettings({ ...themeSettings, contactEmail: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                  <Save size={16} />
                  <span>Save Theme Settings</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- MODAL: HERO SLIDE (ADD / EDIT) ------------------- */}
        {slideModal.open && (
          <div className="modal-backdrop">
            <div className="modal-content-box" style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>{slideModal.isEdit ? 'Edit Hero Slide Content' : 'Add New Hero Slide'}</h3>
                <button type="button" onClick={() => setSlideModal({ ...slideModal, open: false })} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveSlide} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Eyebrow Badge (Orange Tag) *</label>
                  <input type="text" className="form-input" placeholder="e.g. OFFICIAL MANUFACTURER" required value={slideModal.data.badge} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, badge: e.target.value } })} />
                </div>

                <div>
                  <label className="form-label">Main Headline / Slide Title *</label>
                  <input type="text" className="form-input" placeholder="e.g. Heavy Duty Rebar Cutting & Bending Machines" required value={slideModal.data.title} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, title: e.target.value } })} />
                </div>

                <div>
                  <label className="form-label">Description / Subtitle *</label>
                  <textarea className="form-textarea" rows={2} placeholder="e.g. High precision hydraulic benders for infrastructure contractors." value={slideModal.data.subtitle} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, subtitle: e.target.value } })} />
                </div>

                {/* 4 Feature Bullet Points */}
                <div style={{ backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: '#F47B20', marginBottom: '8px', display: 'block' }}>
                    4 Feature Bullet Points (Visible on Slide)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Feature 1</label>
                      <input type="text" className="form-input" value={slideModal.data.feat1} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, feat1: e.target.value } })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Feature 2</label>
                      <input type="text" className="form-input" value={slideModal.data.feat2} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, feat2: e.target.value } })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Feature 3</label>
                      <input type="text" className="form-input" value={slideModal.data.feat3} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, feat3: e.target.value } })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Feature 4</label>
                      <input type="text" className="form-input" value={slideModal.data.feat4} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, feat4: e.target.value } })} />
                    </div>
                  </div>
                </div>

                {/* Button Texts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Primary Button Text</label>
                    <input type="text" className="form-input" value={slideModal.data.btnPrimaryText} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, btnPrimaryText: e.target.value } })} />
                  </div>
                  <div>
                    <label className="form-label">Secondary Button Text</label>
                    <input type="text" className="form-input" value={slideModal.data.btnSecondaryText} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, btnSecondaryText: e.target.value } })} />
                  </div>
                </div>

                {/* Image Picker */}
                <div>
                  <label className="form-label">Choose Slide Background Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setSlideModal({ ...slideModal, data: { ...slideModal.data, image: url } }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC', width: '100%' }}
                    />
                    {slideModal.data.image && (
                      <img src={slideModal.data.image} alt="Preview" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0', flexShrink: 0 }} />
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{slideModal.isEdit ? 'Update Slide Live' : 'Add Slide Live'}</button>
                  <button type="button" className="btn btn-white" style={{ flex: 1 }} onClick={() => setSlideModal({ ...slideModal, open: false })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- MODAL: PRODUCT (ADD / EDIT) ------------------- */}
        {productModal.open && (
          <div className="modal-backdrop">
            <div className="modal-content-box" style={{ maxWidth: '660px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>{productModal.isEdit ? 'Edit Product Details' : 'Add New Product to Catalog'}</h3>
                <button type="button" onClick={() => setProductModal({ ...productModal, open: false })} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Code & Category Select Dropdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Product Code *</label>
                    <input type="text" className="form-input" placeholder="e.g. D4, GX6-25, ZLP800" required value={productModal.data.code} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, code: e.target.value } })} />
                  </div>
                  <div>
                    <label className="form-label">Category (Select Dropdown) *</label>
                    <select 
                      className="form-select" 
                      required 
                      value={productModal.data.categoryName} 
                      onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, categoryName: e.target.value } })}
                    >
                      {[
                        'Rebar Processing',
                        'Material Handling',
                        'Scarifier PI250',
                        'Rebar Bending Machine',
                        'Walk Behind Rollers',
                        'Bar Decoiling Machine',
                        'Suspended Platform',
                        'TMT Ring Making Machine',
                        'Concrete Mixers',
                        'Rebar Spiral Bending Machine',
                        'Rebar Threading Machine',
                        'Iron Worker',
                        'Concrete Grinding Machine',
                        'Mini Excavators',
                        'Power Trowel',
                        'Flattening Machine',
                        'Ride on Rollers'
                      ].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Product Name & Display Price */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Product Name *</label>
                    <input type="text" className="form-input" placeholder="e.g. Automatic Rebar Stirrup Bender Machine - D4" required value={productModal.data.name} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, name: e.target.value } })} />
                  </div>
                  <div>
                    <label className="form-label">Price (Formatted) *</label>
                    <input type="text" className="form-input" placeholder="e.g. ₹ 36,80,000" required value={productModal.data.priceFormatted} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, priceFormatted: e.target.value } })} />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="form-label">Short Description (Catalog Summary)</label>
                  <textarea className="form-textarea" rows={2} placeholder="Brief summary of the machine..." value={productModal.data.shortDescription} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, shortDescription: e.target.value } })} />
                </div>

                {/* Full Description */}
                <div>
                  <label className="form-label">Full Product Description (Detail View)</label>
                  <textarea className="form-textarea" rows={3} placeholder="Detailed specs description, applications, and engineering build..." value={productModal.data.description} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, description: e.target.value } })} />
                </div>

                {/* Technical Specs Textarea */}
                <div>
                  <label className="form-label">Technical Specifications (Format: Spec Name: Value)</label>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>Enter 1 spec per line e.g. "Voltage: 380V-50Hz-3P" or "Machine Net Weight: 2300kg"</div>
                  <textarea className="form-textarea" rows={4} placeholder="Single wire bending: 5-13mm&#10;Double wire bending: 5-10mm&#10;Voltage: 380V-50Hz-3P&#10;Machine Net Weight: 2300kg" value={productModal.data.specsText} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, specsText: e.target.value } })} />
                </div>

                {/* Key Features List Textarea */}
                <div>
                  <label className="form-label">Key Features & Highlights (1 Feature Per Line)</label>
                  <textarea className="form-textarea" rows={3} placeholder="High-speed CNC servo system&#10;Integrated automatic wire feeding&#10;Precision length tolerance ±1mm" value={productModal.data.featuresText} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, featuresText: e.target.value } })} />
                </div>

                {/* Trade Information Grid */}
                <div style={{ backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: '#F47B20', marginBottom: '8px', display: 'block' }}>
                    Trade & Delivery Information
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Min Order Qty</label>
                      <input type="text" className="form-input" placeholder="1 Piece / Pieces" value={productModal.data.minOrderQty} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, minOrderQty: e.target.value } })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Supply Ability</label>
                      <input type="text" className="form-input" placeholder="5 Piece Per Day" value={productModal.data.supplyAbility} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, supplyAbility: e.target.value } })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Delivery Time</label>
                      <input type="text" className="form-input" placeholder="1 - 3 Days" value={productModal.data.deliveryTime} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, deliveryTime: e.target.value } })} />
                    </div>
                  </div>
                </div>

                {/* Choose Product Image File Picker & Live Preview */}
                <div>
                  <label className="form-label">Choose Product Image File</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setProductModal({ ...productModal, data: { ...productModal.data, image: url } }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC', width: '100%' }}
                    />
                    {productModal.data.image && (
                      <img src={productModal.data.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '2px', backgroundColor: '#FFFFFF', flexShrink: 0 }} />
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{productModal.isEdit ? 'Update Product Live' : 'Save Product Live'}</button>
                  <button type="button" className="btn btn-white" style={{ flex: 1 }} onClick={() => setProductModal({ ...productModal, open: false })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- MODAL: BLOG (ADD / EDIT) ------------------- */}
        {blogModal.open && (
          <div className="modal-backdrop">
            <div className="modal-content-box" style={{ maxWidth: '580px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>{blogModal.isEdit ? 'Edit Blog Article' : 'Publish New Blog Article'}</h3>
                <button type="button" onClick={() => setBlogModal({ ...blogModal, open: false })} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Blog Title *</label>
                  <input type="text" className="form-input" required value={blogModal.data.title} onChange={e => setBlogModal({ ...blogModal, data: { ...blogModal.data, title: e.target.value } })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Category</label>
                    <input type="text" className="form-input" value={blogModal.data.category} onChange={e => setBlogModal({ ...blogModal, data: { ...blogModal.data, category: e.target.value } })} />
                  </div>
                  <div>
                    <label className="form-label">Author Name</label>
                    <input type="text" className="form-input" value={blogModal.data.author} onChange={e => setBlogModal({ ...blogModal, data: { ...blogModal.data, author: e.target.value } })} />
                  </div>
                </div>
                
                {/* Choose File Picker */}
                <div>
                  <label className="form-label">Choose Blog Image File</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setBlogModal({ ...blogModal, data: { ...blogModal.data, image: url } }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC' }}
                    />
                    {blogModal.data.image && (
                      <img src={blogModal.data.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Article HTML / Paragraph Content</label>
                  <textarea className="form-textarea" rows={4} value={blogModal.data.content} onChange={e => setBlogModal({ ...blogModal, data: { ...blogModal.data, content: e.target.value } })} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{blogModal.isEdit ? 'Update Article' : 'Publish Article'}</button>
                  <button type="button" className="btn btn-white" style={{ flex: 1 }} onClick={() => setBlogModal({ ...blogModal, open: false })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
