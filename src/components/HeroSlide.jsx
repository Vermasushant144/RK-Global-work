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
  const [imgSrc, setImgSrc] = useState(slide.image);

  const handleError = () => {
    if (slide.fallbackImage && imgSrc !== slide.fallbackImage) {
      setImgSrc(slide.fallbackImage);
    }
  };

  return (
    <div className={`hero-slide-item ${isActive ? 'active' : ''}`}>
      {/* Background Machinery Image */}
      <div className="slide-bg-wrapper">
        <img 
          src={imgSrc} 
          alt={slide.category}
          onError={handleError}
          style={{ objectPosition: slide.objectPosition || 'center center' }}
          loading={isActive ? 'eager' : 'lazy'}
        />
      </div>

      {/* Dark Navy Gradient Overlay from left to right */}
      <div className="slide-gradient-overlay" />

      {/* Slide Content Container */}
      <div className="container slide-content-container">
        <div className="slide-text-box">
          
          {/* Eyebrow with Orange Accent Line */}
          <div className="hero-eyebrow-line">
            <span className="eyebrow-badge">{slide.eyebrow}</span>
            <div className="orange-accent-line" />
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            <span>{slide.headingLine1}</span> <br />
            <span className="text-orange">{slide.headingLine2}</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            {slide.description}
          </p>

          {/* 4 Feature Items with Icons */}
          <div className="hero-features-grid">
            {slide.features.map((feat, idx) => {
              const IconComp = iconMap[feat.icon] || ShieldCheck;
              return (
                <div key={idx} className="hero-feature-item">
                  <div className="feature-icon-circle">
                    <IconComp size={18} />
                  </div>
                  <span className="feature-text">{feat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hero-buttons-row">
            <Link href={slide.primaryCta.href || '/products'} className="btn btn-primary btn-hero">
              <span>{slide.primaryCta.text}</span>
              <ArrowRight size={18} />
            </Link>

            {slide.secondaryCta.action === 'quote' ? (
              <button type="button" className="btn btn-outline-white btn-hero" onClick={onOpenQuote}>
                <span>{slide.secondaryCta.text}</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <Link href={slide.secondaryCta.href || '/contact'} className="btn btn-outline-white btn-hero">
                <span>{slide.secondaryCta.text}</span>
                <ArrowRight size={18} />
              </Link>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        .hero-slide-item {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 700ms ease-in-out, transform 700ms ease-in-out;
          transform: scale(1.03);
          z-index: 1;
        }

        .hero-slide-item.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          z-index: 2;
        }

        .slide-bg-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .slide-bg-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .slide-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(11, 31, 51, 0.95) 0%, 
            rgba(11, 31, 51, 0.88) 38%, 
            rgba(11, 31, 51, 0.4) 65%, 
            rgba(11, 31, 51, 0.15) 100%
          );
        }

        .slide-content-container {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .slide-text-box {
          max-width: 620px;
          color: #FFFFFF;
        }

        .hero-eyebrow-line {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .eyebrow-badge {
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent);
        }

        .orange-accent-line {
          width: 48px;
          height: 3px;
          background-color: var(--accent);
          border-radius: 2px;
        }

        .hero-title {
          font-size: clamp(2.2rem, 4.8vw, 4.2rem);
          font-weight: 900;
          line-height: 1.05;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin-bottom: 18px;
        }

        .text-orange {
          color: var(--accent) !important;
        }

        .hero-description {
          font-size: clamp(0.95rem, 1.5vw, 1.125rem);
          line-height: 1.6;
          color: #E2E8F0;
          margin-bottom: 28px;
          max-width: 540px;
        }

        .hero-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 34px;
        }

        .hero-feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(6px);
          padding: 10px 8px;
          border-radius: var(--radius-sm);
        }

        .feature-icon-circle {
          color: var(--accent);
        }

        .feature-text {
          font-size: 0.725rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .hero-buttons-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-hero {
          padding: 0.95rem 2.2rem;
          font-size: 0.95rem;
        }

        @media (max-width: 992px) {
          .slide-gradient-overlay {
            background: linear-gradient(
              180deg, 
              rgba(11, 31, 51, 0.85) 0%, 
              rgba(11, 31, 51, 0.94) 70%,
              rgba(11, 31, 51, 0.98) 100%
            );
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-buttons-row {
            flex-direction: column;
          }
          .btn-hero {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
