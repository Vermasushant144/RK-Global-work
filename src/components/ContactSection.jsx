'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { products } from '../data/products';

export default function ContactSection({ onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: 'INF-MX500 Concrete Mixer',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.message.trim()) errs.message = 'Please enter your project requirements';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        if (onToast) onToast('Inquiry sent! Our R K Global Engineering sales team will contact you shortly.');
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          product: 'INF-MX500 Concrete Mixer',
          message: ''
        });
        setTimeout(() => setIsSuccess(false), 4000);
      }, 1200);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="contact-grid">
          
          {/* Left Info Column */}
          <div>
            <div className="eyebrow">GET IN TOUCH</div>
            <h2 className="heading-md" style={{ marginBottom: '20px' }}>
              Let's Build Something Strong.
            </h2>
            
            <p className="text-body" style={{ marginBottom: '36px' }}>
              Have an upcoming civil project, road contract, or equipment tender? Contact R K Global Engineering for immediate specification consultation and ex-factory quotes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-sm)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Direct Phone Support</div>
                  <a href="tel:+919876543210" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>+91 98765 43210</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-sm)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Sales & Tenders</div>
                  <a href="mailto:info@rkglobalengineering.com" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>info@rkglobalengineering.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-sm)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Manufacturing Works & H.O.</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>Plot No. 42, Industrial Area, Phase II, New Delhi - 110020</div>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary" 
              style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
            >
              <MessageSquare size={18} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          {/* Right Interactive Form Column */}
          <div className="contact-form-box">
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle size={56} style={{ color: '#10B981', margin: '0 auto 16px' }} />
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Enquiry Received!</h3>
                <p className="text-body" style={{ fontSize: '0.9rem' }}>Our engineering team at R K Global Engineering is processing your machinery requirements. We will be in touch within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="heading-sm" style={{ marginBottom: '20px' }}>Send Direct Machinery Enquiry</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Company / Firm"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    {errors.company && <span className="form-error">{errors.company}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+91 Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Product / Machinery Category *</label>
                  <select 
                    className="form-select"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        [{p.code}] {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Requirements & Timeline *</label>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    placeholder="Specify project site, quantity, delivery schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
