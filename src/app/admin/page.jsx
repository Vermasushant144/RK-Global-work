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

  // 1. ENQUIRIES STATE
  const [enquiries, setEnquiries] = useState([
    { id: '1', name: 'Rajesh Kumar', phone: '+91 98123 45678', email: 'rajesh@infrabuild.com', state: 'Delhi NCR', category: 'Rebar Cutting & Bending Machines', source: 'Popup Modal', status: 'New', date: '2026-08-08 16:30' },
    { id: '2', name: 'Sanjay Verma', phone: '+91 97654 32109', email: 'sanjay@vermaconstruction.com', state: 'Maharashtra', category: 'Concrete Mixers', source: 'Bulk Quote Form', status: 'In Contact', date: '2026-08-08 14:15' },
    { id: '3', name: 'Vikram Singh', phone: '+91 98888 77766', email: 'vikram@larsen-infra.com', state: 'Gujarat', category: 'Road Rollers', source: 'Contact Form', status: 'Closed', date: '2026-08-07 11:20' }
  ]);

  // Modal states for CRUD operations
  const [slideModal, setSlideModal] = useState({ open: false, isEdit: false, data: { id: '', title: '', subtitle: '', badge: 'NEW ARRIVAL', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp' } });

  const [productModal, setProductModal] = useState({
    open: false,
    isEdit: false,
    data: { id: '', code: '', name: '', priceFormatted: '₹ 1,50,000', categoryName: 'Rebar Processing', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp', description: '' }
  });

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
    if (slideModal.isEdit) {
      updateSlide(slideModal.data);
      showNotify('Hero slide updated & saved live to website!');
    } else {
      addSlide(slideModal.data);
      showNotify('New slide added live to website slider!');
    }
    setSlideModal({ open: false, isEdit: false, data: { id: '', title: '', subtitle: '', badge: 'NEW ARRIVAL', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp' } });
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
    if (productModal.isEdit) {
      updateProduct(productModal.data);
      showNotify('Product updated & saved live to website!');
    } else {
      addProduct(productModal.data);
      showNotify('New product saved live to catalog!');
    }
    setProductModal({ open: false, isEdit: false, data: { id: '', code: '', name: '', priceFormatted: '₹ 1,50,000', categoryName: 'Rebar Processing', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp', description: '' } });
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
                onClick={() => setSlideModal({ open: true, isEdit: false, data: { id: '', title: '', subtitle: '', badge: 'NEW ARRIVAL', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp' } })}
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
                  <img src={slide.image} alt={slide.title} style={{ width: '110px', height: '75px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F47B20', textTransform: 'uppercase' }}>Slide #{idx + 1} • {slide.badge}</div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '4px 0' }}>{slide.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{slide.subtitle}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => setSlideModal({ open: true, isEdit: true, data: slide })} style={{ backgroundColor: '#F1F5F9', color: '#1E293B', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                onClick={() => setProductModal({ open: true, isEdit: false, data: { id: '', code: 'RK-NEW', name: '', priceFormatted: '₹ 2,50,000', categoryName: 'Rebar Processing', image: '/images/img/Untitled design - 2026-02-02T154951.040.webp', description: 'Heavy duty construction machine.' } })}
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
                    <button type="button" onClick={() => setProductModal({ open: true, isEdit: true, data: prod })} style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#1E293B', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
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
            <div className="modal-content-box" style={{ maxWidth: '520px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>{slideModal.isEdit ? 'Edit Hero Slide' : 'Add New Hero Slide'}</h3>
                <button type="button" onClick={() => setSlideModal({ ...slideModal, open: false })} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveSlide} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Slide Title *</label>
                  <input type="text" className="form-input" required value={slideModal.data.title} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, title: e.target.value } })} />
                </div>
                <div>
                  <label className="form-label">Subtitle</label>
                  <input type="text" className="form-input" value={slideModal.data.subtitle} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, subtitle: e.target.value } })} />
                </div>
                <div>
                  <label className="form-label">Eyebrow Badge</label>
                  <input type="text" className="form-input" value={slideModal.data.badge} onChange={e => setSlideModal({ ...slideModal, data: { ...slideModal.data, badge: e.target.value } })} />
                </div>
                
                {/* Choose File Picker */}
                <div>
                  <label className="form-label">Choose Slide Image File</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setSlideModal({ ...slideModal, data: { ...slideModal.data, image: url } }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC' }}
                    />
                    {slideModal.data.image && (
                      <img src={slideModal.data.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{slideModal.isEdit ? 'Update Slide' : 'Add Slide'}</button>
                  <button type="button" className="btn btn-white" style={{ flex: 1 }} onClick={() => setSlideModal({ ...slideModal, open: false })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------- MODAL: PRODUCT (ADD / EDIT) ------------------- */}
        {productModal.open && (
          <div className="modal-backdrop">
            <div className="modal-content-box" style={{ maxWidth: '560px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>{productModal.isEdit ? 'Edit Product Details' : 'Add New Product'}</h3>
                <button type="button" onClick={() => setProductModal({ ...productModal, open: false })} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label">Product Code *</label>
                    <input type="text" className="form-input" required value={productModal.data.code} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, code: e.target.value } })} />
                  </div>
                  <div>
                    <label className="form-label">Category Name</label>
                    <input type="text" className="form-input" value={productModal.data.categoryName} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, categoryName: e.target.value } })} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Product Name *</label>
                  <input type="text" className="form-input" required value={productModal.data.name} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, name: e.target.value } })} />
                </div>
                <div>
                  <label className="form-label">Display Price *</label>
                  <input type="text" className="form-input" required value={productModal.data.priceFormatted} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, priceFormatted: e.target.value } })} />
                </div>
                
                {/* Choose File Picker */}
                <div>
                  <label className="form-label">Choose Product Image File</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChoose(e.target.files[0], (url) => setProductModal({ ...productModal, data: { ...productModal.data, image: url } }))}
                      style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC' }}
                    />
                    {productModal.data.image && (
                      <img src={productModal.data.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '2px', backgroundColor: '#FFFFFF' }} />
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" rows={3} value={productModal.data.description || ''} onChange={e => setProductModal({ ...productModal, data: { ...productModal.data, description: e.target.value } })} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{productModal.isEdit ? 'Update Product' : 'Save Product'}</button>
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
