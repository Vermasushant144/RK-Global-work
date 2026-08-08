'use client';

import { useState } from 'react';
import { categories } from '../data/categories';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function BulkQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Rebar Processing Machinery',
    companyName: '',
    contactPerson: '',
    email: '',
    mobile: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enquiry = {
      id: Date.now().toString(),
      name: formData.contactPerson,
      company: formData.companyName,
      email: formData.email,
      phone: formData.mobile,
      category: formData.category,
      product: formData.category,
      message: '',
      source: 'Bulk Quote Form',
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
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.mobile,
        product: formData.category,
        message: `Company: ${formData.companyName}`,
      });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section style={{ padding: '60px 0', backgroundColor: '#F8FAFC' }}>
      <div className="container">
        
        {/* Deep Navy Box Container with Industrial Orange accent button */}
        <div 
          style={{
            backgroundColor: '#0B1F33',
            borderRadius: '12px',
            padding: '48px 40px',
            boxShadow: '0 12px 30px rgba(11, 31, 51, 0.2)',
            maxWidth: '1100px',
            margin: '0 auto',
            border: '1px solid rgba(244, 123, 32, 0.3)'
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <div style={{ color: '#F47B20', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              FAST B2B QUOTATION
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Request a Bulk Quote
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', fontWeight: 500 }}>
              Fill in your requirements and our B2B team will get back within 4 business hours.
            </p>
          </div>

          {submitted ? (
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#FFFFFF' }}>
              <CheckCircle size={40} style={{ color: '#F47B20', margin: '0 auto 10px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Quote Request Submitted!</h3>
              <p style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Thank you, {formData.contactPerson || 'Customer'}. Our team will call you shortly on {formData.mobile}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }} className="bulk-form-row">
                
                {/* Select Category */}
                <div>
                  <select 
                    className="bulk-form-input" 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.slice(0, 10).map((c) => (
                      <option key={c.id} value={c.name} style={{ color: '#1E293B' }}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Company Name */}
                <div>
                  <input 
                    type="text" 
                    className="bulk-form-input" 
                    placeholder="Company Name" 
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <input 
                    type="text" 
                    className="bulk-form-input" 
                    placeholder="Contact Person" 
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="bulk-form-row">
                {/* Business Email */}
                <div>
                  <input 
                    type="email" 
                    className="bulk-form-input" 
                    placeholder="Business Email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <input 
                    type="tel" 
                    className="bulk-form-input" 
                    placeholder="Mobile Number" 
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button 
                    type="submit" 
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '48px',
                      backgroundColor: '#F47B20',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(244, 123, 32, 0.4)',
                      transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                    className="bulk-submit-btn"
                  >
                    SUBMIT ENQUIRY
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bulk-form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }
        .bulk-form-input::placeholder {
          color: #CBD5E1;
          opacity: 0.8;
        }
        .bulk-form-input:focus {
          background-color: rgba(255, 255, 255, 0.16);
          border-color: #F47B20;
        }
        .bulk-submit-btn:hover {
          background-color: #E0670F !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .bulk-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
