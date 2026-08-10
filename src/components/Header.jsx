'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  LogOut, 
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  Package,
  Layers
} from 'lucide-react';
import Logo from './Logo';

export default function Header({ onOpenQuote, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [hoveredCatName, setHoveredCatName] = useState(null);
  
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();
  const { products = [], categories = [] } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin Panel', href: '/admin' });
  }

  // Group products by Category dynamically
  const categoryMap = {};

  // 1. Always add "All Products" at the top so users can see all products
  categoryMap["All Products"] = {
    name: "All Products",
    slug: "all",
    products: products
  };

  // 2. Populate categories array
  (categories || []).forEach(cat => {
    if (cat && cat.name) {
      categoryMap[cat.name] = {
        name: cat.name,
        slug: cat.slug || cat.id,
        products: []
      };
    }
  });

  // 3. Map products by categoryName / category
  (products || []).forEach(p => {
    if (!p) return;
    const catName = p.categoryName || p.category || 'Machinery';
    if (!categoryMap[catName]) {
      categoryMap[catName] = {
        name: catName,
        slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        products: []
      };
    }
    if (!categoryMap[catName].products.some(item => item.id === p.id)) {
      categoryMap[catName].products.push(p);
    }
  });

  // 4. Match products by slug / name for categories with 0 products
  Object.keys(categoryMap).forEach(catName => {
    if (catName === "All Products") return;
    if (categoryMap[catName].products.length === 0) {
      const catSlug = (categoryMap[catName].slug || '').toLowerCase();
      const catLower = catName.toLowerCase();
      const matched = (products || []).filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const pCatName = (p.categoryName || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        
        return (
          pCat === catSlug ||
          pCatName === catLower ||
          pName.includes(catLower) ||
          catLower.split(' ').some(word => word.length > 3 && pName.includes(word))
        );
      });
      if (matched.length > 0) {
        categoryMap[catName].products = matched;
      }
    }
  });

  // 5. Include all categories in Mega Menu
  const categoryList = Object.values(categoryMap);
  const activeCatName = hoveredCatName || (categoryList[0] ? categoryList[0].name : 'All Products');
  const activeCatObj = categoryMap[activeCatName] || categoryList[0] || { name: 'All Products', products: products };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-text">
            <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
            <span>R K GLOBAL ENGINEERING | PAN INDIA DELIVERY | GET A QUICK QUOTE</span>
          </div>
          <div className="announcement-contact">
            <a href="tel:+919876543210">
              <Phone size={13} />
              <span>+91 98765 43210</span>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <MessageSquare size={13} style={{ color: '#25D366' }} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container" style={{ position: 'relative' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo width={220} height={60} lightMode={true} />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <li 
                    key={link.name} 
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                  >
                    <Link 
                      href={link.href} 
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {link.name}
                      <ChevronDown 
                        size={14} 
                        style={{ 
                          transition: 'transform 0.2s ease', 
                          transform: isProductsHovered ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: isProductsHovered ? '#F47B20' : 'inherit'
                        }} 
                      />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {isProductsHovered && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '-100px',
                          width: '820px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          boxShadow: '0 20px 40px rgba(11, 31, 51, 0.15)',
                          padding: '0',
                          zIndex: 1000,
                          overflow: 'hidden',
                          display: 'grid',
                          gridTemplateColumns: '270px 1fr',
                          animation: 'fadeIn 0.2s ease-in-out'
                        }}
                      >
                        {/* Left Pane: Categories List */}
                        <div style={{ backgroundColor: '#F8FAFC', borderRight: '1px solid #E2E8F0', padding: '16px 0' }}>
                          <div style={{ padding: '0 18px 12px', fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            All Categories
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '380px', overflowY: 'auto' }}>
                            {categoryList.map((cat) => {
                              const isSelected = cat.name === activeCatName;
                              return (
                                <button
                                  key={cat.name}
                                  type="button"
                                  onMouseEnter={() => setHoveredCatName(cat.name)}
                                  onClick={() => setHoveredCatName(cat.name)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 18px',
                                    fontSize: '0.875rem',
                                    fontWeight: isSelected ? 800 : 600,
                                    color: isSelected ? '#F47B20' : '#334155',
                                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                                    borderLeft: isSelected ? '4px solid #F47B20' : '4px solid transparent',
                                    borderTop: 'none',
                                    borderRight: 'none',
                                    borderBottom: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.15s ease'
                                  }}
                                >
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Layers size={15} style={{ color: isSelected ? '#F47B20' : '#64748B' }} />
                                    {cat.name}
                                  </span>
                                  <ChevronRight size={14} style={{ color: isSelected ? '#F47B20' : '#94A3B8' }} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right Pane: Products in Category */}
                        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B1F33', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Package size={16} style={{ color: '#F47B20' }} />
                              {activeCatName}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '12px' }}>
                              {activeCatObj.products.length} Products
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                            {activeCatObj.products.length > 0 ? (
                              activeCatObj.products.map((prod) => (
                                <Link
                                  key={prod.id}
                                  href={`/products/${prod.id}`}
                                  onClick={() => setIsProductsHovered(false)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #E2E8F0',
                                    textDecoration: 'none',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                                  }}
                                  className="mega-product-card"
                                >
                                  <div style={{ width: '48px', height: '48px', flexShrink: 0, backgroundColor: '#F8FAFC', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                      src={prod.image || '/images/img/Untitled design - 2026-02-02T154951.040.webp'} 
                                      alt={prod.name} 
                                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {prod.name}
                                    </div>
                                    <div style={{ fontSize: '0.725rem', color: '#F47B20', fontWeight: 800, marginTop: '2px' }}>
                                      {prod.priceFormatted || prod.code || 'View Specs'}
                                    </div>
                                  </div>
                                </Link>
                              ))
                            ) : (
                              <div style={{ gridColumn: 'span 2', padding: '20px', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
                                No products found in this category.
                              </div>
                            )}
                          </div>

                          {/* Footer View All Link */}
                          <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #F1F5F9', textAlign: 'right' }}>
                            <Link 
                              href="/products" 
                              onClick={() => setIsProductsHovered(false)}
                              style={{ 
                                fontSize: '0.825rem', 
                                fontWeight: 800, 
                                color: '#F47B20', 
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              Explore All Catalog <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <Link href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Header Actions */}
          <div className="nav-actions">
            <button
              type="button"
              className="search-trigger-btn"
              onClick={onOpenSearch}
              title="Search Products"
              aria-label="Search catalog"
            >
              <Search size={18} />
            </button>

            {/* Admin is logged in — show Logout */}
            {isAdmin && (
              <button
                type="button"
                onClick={logout}
                title="Logout Admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  color: '#F47B20',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            )}

            {/* Admin NOT logged in — show small Admin Login button */}
            {!isAdmin && (
              <Link
                href="/login"
                title="Admin Login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'transparent',
                  border: '1px solid #CBD5E1',
                  color: '#64748B',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <ShieldAlert size={13} />
                <span>Admin</span>
              </Link>
            )}

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onOpenQuote}
            >
              <span>Get a Quote</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--primary)',
                display: 'none',
                padding: '4px'
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderBottom: '2px solid var(--accent)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      display: 'block',
                      paddingBottom: '8px',
                      borderBottom: '1px solid var(--border-light)'
                    }}
                  >
                    {link.name}
                  </Link>

                  {/* If Mobile Products link, show category links under it */}
                  {link.hasDropdown && (
                    <div style={{ paddingLeft: '12px', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {categoryList.map(c => (
                        <div key={c.name} style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F47B20' }}>
                          • {c.name}
                          <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                            {c.products.map(p => (
                              <Link 
                                key={p.id} 
                                href={`/products/${p.id}`} 
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ fontSize: '0.8rem', color: '#475569', textDecoration: 'none' }}
                              >
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile: Admin Login or Logout */}
              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  style={{
                    padding: '8px 0',
                    textAlign: 'left',
                    color: '#DC2626',
                    fontWeight: 700,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Logout Admin
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#64748B',
                    textDecoration: 'none',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  🔐 Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
        .mega-product-card:hover {
          border-color: #F47B20 !important;
          box-shadow: 0 4px 12px rgba(244, 123, 32, 0.12) !important;
          transform: translateY(-1px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </>
  );
}
