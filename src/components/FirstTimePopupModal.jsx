'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { categories } from '../data/categories';

export default function FirstTimePopupModal({ onToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'Delhi NCR',
    category: 'Rebar Cutting & Bending Machines'
  });

  const indianStates = [
    'Delhi NCR',
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
    'West Bengal',
    'Rajasthan',
    'Punjab',
    'Haryana',
    'Telangana',
    'Madhya Pradesh',
    'Bihar',
    'Odisha',
    'Kerala',
    'Other State'
  ];

  useEffect(() => {
    // Automatically popup after 1.5 seconds delay on first visit
    const hasSeenPopup = typeof window !== 'undefined' ? sessionStorage.getItem('hasSeenEnquiryPopup') : 'true';
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // 1.5 seconds fast trigger

      return () => clearTimeout(timer);
    }

    // Custom event listener to trigger modal anytime if requested
    const handleTriggerPopup = () => setIsOpen(true);
    window.addEventListener('openEnquiryPopupModal', handleTriggerPopup);
    return () => window.removeEventListener('openEnquiryPopupModal', handleTriggerPopup);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenEnquiryPopup', 'true');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hasSeenEnquiryPopup', 'true');
      }
      if (onToast) onToast('Thank you! Your enquiry has been received. Our sales engineer will contact you shortly.');
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-content-box" 
        style={{
          maxWidth: '480px',
          borderRadius: '20px',
          padding: '36px 32px',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button" 
          onClick={handleClose}
          aria-label="Close popup"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: '#475569',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(71, 85, 105, 0.25)'
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle size={54} style={{ color: '#16A34A', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>Enquiry Submitted!</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
              Thank you, {formData.name}. Our R.K. Global Engineering team will get back to you with specs & pricing.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#1B1F23', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                Enquire Now
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748B', fontWeight: 500 }}>
                Get Technical Specifications & Best Price
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="Enter Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <input 
                  type="tel" 
                  className="form-input" 
                  required 
                  placeholder="Enter Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter Email Id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <select 
                  className="form-select" 
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
                >
                  <option value="" disabled>Select State *</option>
                  {indianStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <select 
                  className="form-select" 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  backgroundColor: '#F47B20',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '8px',
                  marginTop: '10px',
                  boxShadow: '0 4px 16px rgba(244, 123, 32, 0.35)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>Submit Enquiry</span>
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
