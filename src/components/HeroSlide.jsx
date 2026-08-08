'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Crosshair, 
  ShieldCheck, 
  Settings, 
  Headphones, 
  Layers, 
  Zap, 
  Sliders, 
  CheckCircle2, 
  Wrench, 
  Award, 
  Cpu, 
  MapPin 
} from 'lucide-react';

const iconMap = {
  Crosshair,
  ShieldCheck,
  Settings,
  Headphones,
  Layers,
  Zap,
  Sliders,
  CheckCircle2,
  Wrench,
  Award,
  Cpu,
  MapPin
};

export default function HeroSlide({ slide, isActive, onOpenQuote }) {
  const [imgSrc, setImgSrc] = useState(slide.image || '/images/img/Untitled design - 2026-02-02T154951.040.webp');

  const handleError = () => {
    if (slide.fallbackImage && imgSrc !== slide.fallbackImage) {
      setImgSrc(slide.fallbackImage);
    } else {
      setImgSrc('/images/rebar-bending.svg');
    }
  };

  // Safe Fallbacks for admin slides vs static slides
  const title = slide.title || (slide.headingLine1 ? `${slide.headingLine1} ${slide.headingLine2 || ''}` : 'Heavy Duty Construction Machinery');
  const description = slide.subtitle || slide.description || 'High performance B2B construction equipment manufactured in India with ex-factory pricing and 1-year warranty.';
  const badgeText = slide.badge || slide.eyebrow || 'R K GLOBAL ENGINEERING';
  const featuresList = slide.features && Array.isArray(slide.features) ? slide.features : [
    { icon: 'ShieldCheck', label: 'ISO 9001 Certified' },
    { icon: 'Award', label: 'Factory Direct Price' },
    { icon: 'Wrench', label: '1-Year Warranty' },
    { icon: 'CheckCircle2', label: 'Pan-India Delivery' }
  ];

  return (
    <div className={`hero-slide-item ${isActive ? 'active' : ''}`} style={{ position: 'relative', minHeight: '620px', display: 'flex', alignItems: 'center' }}>
      {/* Background Machinery Image */}
      <div className="slide-bg-wrapper" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <img 
          src={slide.image || imgSrc} 
          alt={badgeText}
          onError={handleError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: slide.objectPosition || 'center center' }}
        />
      </div>

      {/* Dark Navy Gradient Overlay */}
      <div 
        className="slide-gradient-overlay" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(11, 31, 51, 0.95) 0%, rgba(11, 31, 51, 0.75) 50%, rgba(11, 31, 51, 0.35) 100%)',
          zIndex: 2
        }} 
      />

      {/* Slide Content Container */}
      <div className="container slide-content-container" style={{ position: 'relative', zIndex: 3, padding: '80px 24px', color: '#FFFFFF' }}>
        <div className="slide-text-box" style={{ maxWidth: '680px' }}>
          
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow-line" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span 
              className="eyebrow-badge"
              style={{
                backgroundColor: '#F47B20',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: '4px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              {badgeText}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px', color: '#FFFFFF' }}>
            {title}
          </h1>

          {/* Description */}
          <p className="hero-description" style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '28px' }}>
            {description}
          </p>

          {/* 4 Feature Items with Icons */}
          <div className="hero-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '36px' }}>
            {featuresList.map((feat, idx) => {
              const IconComp = iconMap[feat.icon] || ShieldCheck;
              return (
                <div key={idx} className="hero-feature-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="feature-icon-circle" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244, 123, 32, 0.2)', color: '#F47B20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={16} />
                  </div>
                  <span className="feature-text" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {feat.label || feat.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hero-buttons-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={onOpenQuote}
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              <span>{slide.btnPrimaryText || 'Request Quote Now'}</span>
              <ArrowRight size={18} />
            </button>

            <Link href="/products" className="btn btn-outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF', padding: '14px 28px', fontSize: '0.95rem' }}>
              <span>{slide.btnSecondaryText || 'View 2026 Catalog'}</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
