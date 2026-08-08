'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import { ChevronRight, Send, CheckCircle, ShieldCheck } from 'lucide-react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: 'INF-MX500 Concrete Mixer',
    quantity: '1 Unit',
    location: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', paddingBottom: '100px' }}>
      <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Request B2B Quote</span>
          </div>
          <h1 className="heading-lg text-white" style={{ marginBottom: '12px' }}>
            Get a Fast Technical Quotation
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '640px' }}>
            Receive competitive ex-factory pricing, certified technical spec sheets, and delivery lead times for your site.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px', maxWidth: '780px' }}>
        <div className="contact-form-box">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <CheckCircle size={64} style={{ color: '#10B981', margin: '0 auto 16px' }} />
              <h2 className="heading-md" style={{ marginBottom: '8px' }}>Quote Request Submitted!</h2>
              <p className="text-body" style={{ marginBottom: '24px' }}>
                Thank you, {formData.name}. Our technical engineering sales team is preparing a customized quotation for your project in {formData.location || 'your area'}.
              </p>
              <Link href="/products" className="btn btn-primary">
                Explore More Equipment
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="eyebrow">DIRECT MANUFACTURER PROCUREMENT</div>
              <h2 className="heading-md" style={{ marginBottom: '24px' }}>Project Quotation Form</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required
                    placeholder="e.g. Rakesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Firm *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required
                    placeholder="e.g. ABC Infrastructure Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Equipment Model *</label>
                  <select 
                    className="form-select"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>
                        [{p.code}] {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <select 
                    className="form-select"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  >
                    <option value="1 Unit">1 Unit</option>
                    <option value="2-5 Units">2 - 5 Units</option>
                    <option value="5-10 Units">5 - 10 Units</option>
                    <option value="Bulk Order (10+)">Bulk Order (10+)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Site Location / City *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Mumbai Coastal Road Site, Maharashtra"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Specific Site Requirements & Engine Preference</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  placeholder="Mention any custom specifications, diesel motor preferences, or urgency..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                <span>Pan-India Direct Factory Warranty & Onsite Spare Support Included.</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem' }}>
                <Send size={16} />
                <span>Submit Quotation Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
