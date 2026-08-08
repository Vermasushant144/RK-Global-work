'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  CheckCircle2, 
  ChevronRight, 
  Wrench, 
  Layers, 
  HeartHandshake, 
  Award, 
  Zap, 
  Building2, 
  Sliders 
} from 'lucide-react';

export default function AboutPage() {
  const productRange = [
    "Rebar Cutting Machines",
    "Rebar Bending Machines",
    "Rebar Straightening Machines",
    "Concrete Mixers",
    "Plate Compactors",
    "Tamping Rammers",
    "Concrete Grinding & Polishing Machines",
    "Road Rollers",
    "Other Construction Machinery"
  ];

  const selectionCriteria = [
    { title: "Application", desc: "Specific task & site conditions" },
    { title: "Project Requirement", desc: "Target output & volume" },
    { title: "Machine Capacity", desc: "Motor power & drum/blade size" },
    { title: "Performance", desc: "Speed, accuracy & reliability" },
    { title: "Budget", desc: "Practical & competitive value" }
  ];

  const whyChooseUsPillars = [
    {
      title: "Quality Focus",
      desc: "We focus on providing dependable equipment suitable for demanding construction applications.",
      icon: ShieldCheck
    },
    {
      title: "Wide Product Portfolio",
      desc: "A growing range of construction, concrete, rebar processing, and compaction machinery under one roof.",
      icon: Layers
    },
    {
      title: "Competitive Solutions",
      desc: "We aim to offer practical equipment solutions that provide value for your investment.",
      icon: Zap
    },
    {
      title: "Professional Assistance",
      desc: "Our team provides product information and guidance to help customers make informed decisions.",
      icon: Wrench
    },
    {
      title: "Flexible Supply",
      desc: "We cater to retail customers, contractors, dealers, and bulk buyers according to their requirements.",
      icon: Building2
    },
    {
      title: "Long-Term Relationships",
      desc: "We believe in building lasting relationships rather than focusing only on individual transactions.",
      icon: HeartHandshake
    }
  ];

  const coreValues = [
    {
      title: "QUALITY",
      desc: "We believe quality is the foundation of lasting business."
    },
    {
      title: "RELIABILITY",
      desc: "We strive to provide dependable equipment and consistent service."
    },
    {
      title: "INTEGRITY",
      desc: "We believe in transparent and professional business practices."
    },
    {
      title: "CUSTOMER FOCUS",
      desc: "Our customers' requirements remain at the center of our approach."
    },
    {
      title: "CONTINUOUS GROWTH",
      desc: "We continuously work to improve our products, services, and capabilities."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', paddingBottom: '100px' }}>
      
      {/* Banner */}
      <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>About Us</span>
          </div>
          <h1 className="heading-lg text-white" style={{ marginBottom: '8px' }}>
            R.K. GLOBAL ENGINEERING
          </h1>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Engineering Equipment. Building Trust.
          </div>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '720px' }}>
            Quality Equipment | Reliable Solutions | Professional Service
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px' }}>
        
        {/* Company Overview */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '50px', marginBottom: '50px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="eyebrow">WHO WE ARE</div>
          <h2 className="heading-md" style={{ marginBottom: '20px' }}>About R.K. GLOBAL ENGINEERING</h2>
          
          <p className="text-body" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '20px', color: 'var(--primary)', fontWeight: 600 }}>
            R.K. GLOBAL ENGINEERING is a professionally managed company engaged in the manufacturing, supply, trading, retailing, and wholesaling of construction machinery and equipment.
          </p>
          
          <p className="text-body" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
            We provide practical and reliable equipment solutions for contractors, builders, infrastructure companies, civil engineering firms, dealers, and construction professionals across India.
          </p>

          <div style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent)', padding: '20px 24px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '4px' }}>OUR OBJECTIVE</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>
              "Our objective is simple — to provide the right equipment, at the right value, with dependable service."
            </div>
          </div>
        </div>

        {/* Mission & Vision Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '50px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '20px' }}>
              <Target size={26} />
            </div>
            <div className="eyebrow">OUR MISSION</div>
            <h3 className="heading-sm" style={{ marginBottom: '14px' }}>Powering Customer Productivity</h3>
            <p className="text-body" style={{ fontSize: '1rem', lineHeight: 1.65 }}>
              To provide reliable construction machinery and professional equipment solutions that help our customers improve productivity, efficiency, and performance across every project.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '20px' }}>
              <Eye size={26} />
            </div>
            <div className="eyebrow">OUR VISION</div>
            <h3 className="heading-sm" style={{ marginBottom: '14px' }}>Industry Recognition & Trust</h3>
            <p className="text-body" style={{ fontSize: '1rem', lineHeight: 1.65 }}>
              To become a trusted and recognized name in India's construction machinery industry, known for quality products, competitive solutions, professional service, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* What We Do / Product Range */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '50px', marginBottom: '50px' }}>
          <div className="eyebrow">WHAT WE DO</div>
          <h2 className="heading-md" style={{ marginBottom: '16px' }}>Comprehensive Machinery Solutions</h2>
          <p className="text-body" style={{ marginBottom: '32px' }}>
            We offer a diverse range of construction and rebar processing machinery designed to support different construction applications. We continuously work to expand our product portfolio and provide customers with practical machinery solutions for different project requirements.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {productRange.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '50px', marginBottom: '50px' }}>
          <div className="eyebrow eyebrow-dark">OUR APPROACH</div>
          <h2 className="heading-md text-white" style={{ marginBottom: '16px' }}>Built on Reliability & Transparency</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px', maxWidth: '780px' }}>
            At R.K. GLOBAL ENGINEERING, we believe that a successful business is built on quality, reliability, transparency, and long-term relationships. We take time to understand our customer's requirements and help them identify suitable machinery based on:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="approach-grid">
            {selectionCriteria.map((crit, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-sm)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '4px' }}>{crit.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{crit.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us - 6 Pillars */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>WHY CHOOSE US?</div>
            <h2 className="heading-md">Practical Machinery & Reliable Service</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="why-grid">
            {whyChooseUsPillars.map((p) => {
              const IconComp = p.icon;
              return (
                <div key={p.title} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '30px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '16px' }}>
                    <IconComp size={20} />
                  </div>
                  <h3 className="heading-sm" style={{ marginBottom: '10px' }}>{p.title}</h3>
                  <p className="text-body" style={{ fontSize: '0.875rem' }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '50px' }}>
          <div className="eyebrow">OUR CORE VALUES</div>
          <h2 className="heading-md" style={{ marginBottom: '32px' }}>The Principles That Drive Us</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="values-grid">
            {coreValues.map((v) => (
              <div key={v.title} style={{ borderTop: '3px solid var(--accent)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px' }}>{v.title}</h4>
                <p className="text-body" style={{ fontSize: '0.825rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .approach-grid, .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .approach-grid, .values-grid, .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
