'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Phone, MessageSquare, Search, Menu, X, ArrowRight, ShieldCheck, LogOut, User } from 'lucide-react';
import Logo from './Logo';

export default function Header({ onOpenQuote, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  // Only show Admin Panel link if logged in as Admin!
  if (isAdmin) {
    baseNavLinks.push({ name: 'Admin Panel', href: '/admin' });
  }

  // If not logged in, include Login link
  if (!isLoggedIn) {
    baseNavLinks.push({ name: 'Login', href: '/login' });
  }

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
        <div className="container nav-container">
          {/* Logo Component */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo width={220} height={60} lightMode={true} />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {baseNavLinks.map((link) => {
              const isActive = pathname === link.href;
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

            {isLoggedIn && (
              <button
                type="button"
                onClick={logout}
                title="Logout"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center',
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
              {baseNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
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
                  Logout Session
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        @media (max-width: 1024px) {
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
