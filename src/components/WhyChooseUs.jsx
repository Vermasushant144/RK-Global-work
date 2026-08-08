'use client';

import { ShieldCheck, Zap, Truck, CheckCircle2, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      num: '01',
      title: 'Built to Last',
      desc: 'Forged with heavy manganese alloy channels, sealed dust bearings, and reinforced chassis to withstand continuous 24/7 site operations.',
      icon: ShieldCheck,
      tag: 'Heavy Engineering'
    },
    {
      num: '02',
      title: 'Performance First',
      desc: 'Powered by genuine Kirloskar and Honda powerplants delivering high centrifugal force and optimal concrete mixing homogeneity.',
      icon: Zap,
      tag: 'High Output'
    },
    {
      num: '03',
      title: 'Nationwide Support',
      desc: 'Comprehensive Pan-India service network with guaranteed 48-hour technician dispatch and 100% original OEM spare parts availability.',
      icon: Truck,
      tag: 'Pan-India Service'
    },
    {
      num: '04',
      title: 'Quality Assured',
      desc: 'Every single unit undergoes rigorous 12-point pre-dispatch factory load testing, vibration analysis, and hydraulic pressure checks.',
      icon: CheckCircle2,
      tag: '100% Tested'
    }
  ];

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(244, 123, 32, 0.1)',
              border: '1px solid rgba(244, 123, 32, 0.3)',
              color: '#F47B20',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            <Award size={14} />
            <span>ENGINEERING ADVANTAGE</span>
          </div>

          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            Why Professionals Choose Us
          </h2>

          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6 }}>
            We combine two decades of manufacturing expertise with stringent quality controls to provide machinery contractors trust implicitly.
          </p>
        </div>

        {/* 4 Cards Grid with Clean White Aesthetic */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="why-grid">
          {features.map((f) => {
            const IconComp = f.icon;
            return (
              <div key={f.num} className="clean-white-card">
                
                {/* Top Accent Indicator */}
                <div className="top-indicator-orange" />

                {/* Header Row: Large Number + Icon Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F47B20', letterSpacing: '-0.04em' }}>
                    {f.num}
                  </div>

                  <div 
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(244, 123, 32, 0.1)',
                      border: '1px solid rgba(244, 123, 32, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      color: '#F47B20'
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                </div>

                {/* Category Tag */}
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#F47B20', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  {f.tag}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', lineHeight: 1.3 }}>
                  {f.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.65 }}>
                  {f.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>

      <style jsx>{`
        .clean-white-card {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          transition: all 0.35s ease;
        }
        .top-indicator-orange {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #F47B20, transparent);
          opacity: 0.3;
          transition: opacity 0.35s ease;
        }
        .clean-white-card:hover {
          transform: translateY(-6px);
          border-color: #F47B20;
          box-shadow: 0 12px 28px rgba(244, 123, 32, 0.1);
        }
        .clean-white-card:hover .top-indicator-orange {
          opacity: 1;
        }
        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
