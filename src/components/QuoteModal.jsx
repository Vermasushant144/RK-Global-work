'use client';

import { useState } from 'react';
import { X, CheckCircle, Send, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { supabase } from '../lib/supabaseClient';

export default function QuoteModal({ isOpen, onClose, selectedProduct, onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: selectedProduct ? selectedProduct.name : 'INF-MX500 Concrete Mixer',
    quantity: '1 Unit',
    location: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enquiry = {
      id: Date.now().toString(),
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      quantity: formData.quantity,
      location: formData.location,
      message: formData.notes,
      source: 'Quote Modal',
      status: 'New',
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('rk_enquiries') || '[]');
      existing.unshift(enquiry);
      localStorage.setItem('rk_enquiries', JSON.stringify(existing));
    } catch (err) {}

    // Save to Supabase
    try {
      await supabase.from('enquiries').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        message: `Company: ${formData.company} | Qty: ${formData.quantity} | Location: ${formData.location} | Notes: ${formData.notes}`,
      });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onToast) onToast('Your quote request has been sent successfully! Our technical team will contact you within 2 hours.');
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <CheckCircle size={64} style={{ color: '#10B981', margin: '0 auto 16px' }} />
              <h3 className="heading-md" style={{ marginBottom: '8px' }}>Quote Request Submitted!</h3>
              <p className="text-body">Thank you, {formData.name}. An engineering spec sheet & price quotation is being prepared for your project.</p>
            </div>
          ) : (
            <>
              <div className="eyebrow">FAST B2B QUOTATION</div>
              <h3 className="heading-md" style={{ marginBottom: '6px' }}>Request Industrial Equipment Quote</h3>
              <p className="text-body" style={{ fontSize: '0.875rem', marginBottom: '24px' }}>
                Fill out the details below to receive competitive ex-factory pricing and technical datasheets.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
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
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Selected Machinery / Product *</label>
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
                  <label className="form-label">Project Specifics / Special Requirements</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3}
                    placeholder="Provide site timeline, engine specs or custom hopper preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                  <span>Pan India Direct Manufacturer Warranty & Onsite Technical Support Included.</span>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem' }}>
                  <Send size={16} />
                  <span>Submit Instant Quote Request</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
