'use client';

import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 1000,
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        padding: '16px 24px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        borderLeft: '5px solid var(--accent)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '450px',
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <CheckCircle size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
      <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4 }}>{message}</span>
      <button 
        type="button" 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          marginLeft: 'auto'
        }}
      >
        <X size={18} />
      </button>

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
