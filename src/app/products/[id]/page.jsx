'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products as staticProducts } from '../../../data/products';
import { useData } from '../../../context/DataContext';
import './product.css';
import { 
  ChevronRight, 
  Check, 
  PhoneCall, 
  MessageSquare, 
  ShoppingCart, 
  Info, 
  Facebook, 
  Twitter, 
  Linkedin,
  CheckCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  const { products } = useData();
  const allProducts = products && products.length > 0 ? products : staticProducts;
  const product = allProducts.find(p => p.id === productId || p.code === productId) || allProducts[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'description'

  // Requirement form state
  const [reqQuantity, setReqQuantity] = useState('1');
  const [reqUnit, setReqUnit] = useState('Piece/Pieces');
  const [reqNotes, setReqNotes] = useState('');
  const [reqMobile, setReqMobile] = useState('');
  const [reqSubmitted, setReqSubmitted] = useState(false);

  // Related products in same category
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const handleOrderNow = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openQuoteModal', { detail: product }));
    }
  };

  const handleReqSubmit = (e) => {
    e.preventDefault();
    if (!reqMobile.trim()) return;
    setReqSubmitted(true);
    setTimeout(() => setReqSubmitted(false), 4000);
  };

  const handleShare = (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
    if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '100px' }}>
      
      {/* Breadcrumb Bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Products</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{product.categoryName}</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Top Section Box */}
      <div className="container" style={{ paddingTop: '36px' }}>
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '48px' }} className="product-top-grid">
            {/* Left Image & Thumbnails Column */}
            <div>
              {/* Main Product Image Container */}
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '20px',
                  marginBottom: '16px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  minHeight: '340px'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#F47B20',
                    backgroundColor: '#FFF7ED',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}
                >
                  {product.code || 'RK-GLOBAL'}
                </div>

                <img 
                  src={activeImage || product.image} 
                  alt={product.name} 
                  style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain' }}
                />
              </div>

              {/* Thumbnails Row */}
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {(product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0 ? product.gallery : [product.image]).map((img, idx) => {
                  const isSel = (activeImage || product.image) === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '6px',
                        border: isSel ? '2px solid #F47B20' : '1px solid #E2E8F0',
                        padding: '4px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Details & Specifications Table */}
            <div>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#DEF7EC',
                  color: '#03543F',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '12px'
                }}
              >
                <Check size={14} />
                <span>In Stock</span>
              </div>

              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', lineHeight: 1.2 }}>
                {product.name}
              </h1>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 600 }}>Price:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#16A34A' }}>
                  {product.priceFormatted}
                </span>
                <Info size={16} style={{ color: '#F47B20', cursor: 'pointer' }} title="Ex-factory price excluding GST & freight" />
              </div>

              {/* 3 Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                <button 
                  type="button"
                  onClick={handleOrderNow}
                  style={{
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  <ShoppingCart size={18} />
                  <span>Order Now</span>
                </button>

                <a 
                  href="tel:+919876543210"
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
                  }}
                >
                  <PhoneCall size={18} />
                  <span>Call Now</span>
                </a>

                <a 
                  href="https://wa.me/919876543210?text=Hello%20R.K.%20Global%20Engineering,%20I%20am%20interested%20in%20" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Social Share Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
                <span>Share:</span>
                <button type="button" onClick={() => handleShare('facebook')} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', cursor: 'pointer' }}>
                  <Facebook size={16} />
                </button>
                <button type="button" onClick={() => handleShare('twitter')} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9', cursor: 'pointer' }}>
                  <Twitter size={16} />
                </button>
                <button type="button" onClick={() => handleShare('linkedin')} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7', cursor: 'pointer' }}>
                  <Linkedin size={16} />
                </button>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                  Technical Specifications
                </h3>

                <table className="spec-table-custom">
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Specification</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.technicalSpecs || {
                      'Category': product.categoryName || 'Construction Equipment',
                      'Price': product.priceFormatted || 'Ex-Factory Price',
                      'Warranty': product.warranty || '24 Months OEM Warranty',
                      'Manufacturer': 'R.K. Global Engineering'
                    }).map(([key, val]) => (
                      <tr key={key}>
                        <td style={{ fontWeight: 600, color: '#475569' }}>{key}</td>
                        <td style={{ fontWeight: 700, color: '#1E293B' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>

        {/* Product Details & Trade Information Card with Tabs */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '40px'
          }}
        >
          {/* Top Tab Switcher */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              style={{
                padding: '14px 28px',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                background: activeTab === 'details' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'details' ? '#1E293B' : '#64748B',
                borderBottom: activeTab === 'details' ? '3px solid #F47B20' : 'none',
                cursor: 'pointer'
              }}
            >
              Product Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              style={{
                padding: '14px 28px',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                background: activeTab === 'description' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'description' ? '#1E293B' : '#64748B',
                borderBottom: activeTab === 'description' ? '3px solid #F47B20' : 'none',
                cursor: 'pointer'
              }}
            >
              Product Description
            </button>
          </div>

          <div style={{ padding: '36px' }}>
            {activeTab === 'details' ? (
              <div>
                {/* 1. Price And Quantity */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
                  {product.name} Price And Quantity
                </h3>
                <table className="spec-table-custom" style={{ marginBottom: '28px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Price</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#16A34A' }}>{product.priceFormatted} / Piece</td>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Minimum Order Quantity</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#1E293B' }}>{product.minOrderQty || '1 Piece / Pieces'}</td>
                    </tr>
                  </tbody>
                </table>

                {/* 2. Product Specifications */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
                  {product.name} Product Specifications
                </h3>
                <table className="spec-table-custom" style={{ marginBottom: '28px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Usage & Applications</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#1E293B' }}>{product.usageApplications || 'Industrial'}</td>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Product Type</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#1E293B' }}>{product.name}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#64748B', fontWeight: 600 }}>Operating Type</td>
                      <td style={{ fontWeight: 700, color: '#1E293B' }}>{product.operatingType || 'Semi Automatic / Automatic'}</td>
                      <td style={{ color: '#64748B', fontWeight: 600 }}>Warranty</td>
                      <td style={{ fontWeight: 700, color: '#16A34A' }}>{product.warranty || '24 Months OEM Warranty'}</td>
                    </tr>
                    {Object.entries(product.technicalSpecs || {}).map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ color: '#64748B', fontWeight: 600 }}>{k}</td>
                        <td colSpan={3} style={{ fontWeight: 700, color: '#1E293B' }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 3. Trade Information */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
                  {product.name} Trade Information
                </h3>
                <table className="spec-table-custom">
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Supply Ability</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#1E293B' }}>{product.supplyAbility || '5 Piece Per Day'}</td>
                      <td style={{ width: '25%', color: '#64748B', fontWeight: 600 }}>Delivery Time</td>
                      <td style={{ width: '25%', fontWeight: 700, color: '#1E293B' }}>{product.deliveryTime || '1 - 3 Days'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ width: '4px', height: '24px', backgroundColor: '#F47B20', borderRadius: '2px' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>Product Description</h3>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Description & Applications Full-Width Cards */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#F47B20', borderRadius: '2px' }} />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B' }}>
              Product Description
            </h2>
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569', marginBottom: '32px' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#F47B20', borderRadius: '2px' }} />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B' }}>
              Applications
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {product.applicationsList ? (
              product.applicationsList.map((app, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F47B20', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0, marginTop: '2px' }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>{app.title}</h4>
                    <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#475569' }}>{app.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F47B20', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
                  <p style={{ fontSize: '0.925rem', color: '#475569' }}>High-rise residential and commercial building construction sites.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F47B20', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
                  <p style={{ fontSize: '0.925rem', color: '#475569' }}>Bridge piers, highway overpasses, and heavy civil engineering projects.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "Tell us about your requirement" Card */}
        <div 
          style={{
            maxWidth: '680px',
            margin: '0 auto 60px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
              Tell us about your requirement
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
              Fill details below to get instant manufacturer pricing and spec sheet.
            </p>
          </div>

          {reqSubmitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle size={54} style={{ color: '#16A34A', margin: '0 auto 14px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Requirement Submitted!</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>An R.K. Global Engineering representative will call you shortly on {reqMobile}.</p>
            </div>
          ) : (
            <form onSubmit={handleReqSubmit}>
              {/* Product Highlight Banner */}
              <div 
                style={{
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '20px'
                }}
              >
                <img src={product.image} alt={product.name} style={{ width: '46px', height: '46px', objectFit: 'contain' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1E293B' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#F47B20', fontWeight: 700 }}>Price: {product.priceFormatted}</div>
                </div>
              </div>

              {/* Quantity & Unit Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Quantity</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={reqQuantity} 
                    onChange={(e) => setReqQuantity(e.target.value)} 
                    min="1"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Select Unit</label>
                  <select 
                    className="form-select" 
                    value={reqUnit} 
                    onChange={(e) => setReqUnit(e.target.value)}
                  >
                    <option value="Piece/Pieces">Piece / Pieces</option>
                    <option value="Set/Sets">Set / Sets</option>
                    <option value="Units">Units</option>
                  </select>
                </div>
              </div>

              {/* Chips row */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
                {['50', '100', '200', '220', '300', '1000+'].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setReqQuantity(qty.replace('+', ''))}
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '4px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: reqQuantity === qty ? '#F47B20' : '#F8FAFC',
                      color: reqQuantity === qty ? '#FFFFFF' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {qty}
                  </button>
                ))}
              </div>

              {/* Additional Detail Box */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Additional detail</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Mention project site city or custom specs..."
                  value={reqNotes}
                  onChange={(e) => setReqNotes(e.target.value)}
                />
              </div>

              {/* Phone Number Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Mobile number *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ padding: '0.8rem 12px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🇮🇳 +91</span>
                  </div>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required
                    placeholder="Enter 10 digit mobile number"
                    value={reqMobile}
                    onChange={(e) => setReqMobile(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  backgroundColor: '#0B1F33',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(11, 31, 51, 0.2)'
                }}
              >
                Submit Now
              </button>
            </form>
          )}
        </div>

        {/* Related Products Section */}
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '32px' }}>
            Other Products in '{product.categoryName}' category
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {relatedProducts.map((rel) => (
              <div 
                key={rel.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ height: '200px', width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={rel.image} alt={rel.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', textAlign: 'center' }}>
                  {rel.name}
                </h3>

                <div style={{ fontSize: '0.825rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  <div><strong style={{ color: '#16A34A' }}>Price :</strong> {rel.priceFormatted}</div>
                  <div><strong>Minimum Order Quantity :</strong> 1</div>
                  <div><strong>Product Type :</strong> {rel.name}</div>
                  <div><strong>Usage & Applications :</strong> Industrial</div>
                  <div><strong>Operating Type :</strong> Semi Automatic</div>
                </div>

                <Link 
                  href={`/products/${rel.id}`}
                  style={{
                    marginTop: 'auto',
                    border: '1px solid #F47B20',
                    color: '#F47B20',
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                    padding: '10px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Send Inquiry
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
