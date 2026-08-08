'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Flag, LayoutGrid, Target, List, Menu } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    await login(email, password);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      
      <div 
        style={{
          width: '100%',
          maxWidth: '1080px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}
        className="login-container-grid"
      >
        
        {/* Left Form Side */}
        <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
          
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            🔐 Admin Login
          </h1>

          <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '32px' }}>
            Admin credentials se login karo to access Admin Panel.
          </p>

          {authError && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.875rem', color: '#DC2626', fontWeight: 600 }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Email *
              </label>
              <input 
                type="email" 
                required
                className="form-input" 
                placeholder="jdoe.mobbin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.925rem',
                  color: '#1E293B',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Password *
              </label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.925rem',
                  color: '#1E293B',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#27272A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '13px 20px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                marginBottom: '16px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              className="btn-email-submit"
            >
              Continue with Email
            </button>

            {/* Google Button */}
            <button
              type="button"
              onClick={() => login('user@gmail.com', 'user123')}
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px 20px',
                fontWeight: 700,
                fontSize: '0.925rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '10px',
                marginBottom: '28px',
                transition: 'all 0.2s ease'
              }}
              className="btn-google-auth"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"/>
                <path fill="#FBBC05" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.1-1.22.3-1.78L.97 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.97 4.04l2.91-2.26z"/>
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.45 2.02.97 4.96l2.91 2.26C4.6 5.15 6.62 3.58 9 3.58z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Bottom Navigation */}
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#F47B20', fontWeight: 700, textDecoration: 'none' }}>
                Sign up
              </Link>
            </div>

          </form>

        </div>

        {/* Right Graphical Composition */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            backgroundColor: '#FAFAFA',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            overflow: 'hidden',
            border: '1px solid #F1F5F9'
          }}
          className="login-graphics-wrapper"
        >
          <div style={{ position: 'relative', width: '380px', height: '320px' }}>
            <div 
              style={{
                position: 'absolute',
                top: '40px',
                left: '20px',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#8B5CF6',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                animation: 'floatSlow 4s ease-in-out infinite'
              }}
            >
              <Flag size={28} />
            </div>

            <div 
              style={{
                position: 'absolute',
                top: '110px',
                left: '110px',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FB923C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 8px 20px rgba(251, 146, 60, 0.3)',
                animation: 'floatSlow 4.5s ease-in-out infinite 0.5s'
              }}
            >
              <LayoutGrid size={24} />
            </div>

            <div 
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '110px',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#2DD4BF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 8px 20px rgba(45, 212, 191, 0.3)',
                animation: 'floatSlow 5s ease-in-out infinite 1s'
              }}
            >
              <Target size={24} />
            </div>

            <div 
              style={{
                position: 'absolute',
                bottom: '70px',
                right: '90px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#FBBF24',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 8px 18px rgba(251, 191, 36, 0.3)',
                animation: 'floatSlow 3.8s ease-in-out infinite 0.2s'
              }}
            >
              <List size={22} />
            </div>

            <div 
              style={{
                position: 'absolute',
                top: '20px',
                right: '40px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#60A5FA',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 8px 18px rgba(96, 165, 250, 0.3)',
                animation: 'floatSlow 4.2s ease-in-out infinite 0.8s'
              }}
            >
              <Menu size={22} />
            </div>

            <div 
              style={{
                position: 'absolute',
                top: '120px',
                right: '10px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }}
            >
              <img src="/images/about-banner.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ position: 'absolute', top: '25px', left: '170px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
            <div style={{ position: 'absolute', top: '100px', left: '70px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FBBF24' }} />
            <div style={{ position: 'absolute', top: '170px', left: '260px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#000000' }} />
            <div style={{ position: 'absolute', bottom: '90px', right: '20px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FB923C' }} />

          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-email-submit:hover {
          background-color: #18181B !important;
          transform: translateY(-1px);
        }
        .btn-google-auth:hover {
          background-color: #F8FAFC !important;
          border-color: #CBD5E1 !important;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          .login-container-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .login-graphics-wrapper {
            display: none !important;
          }
        }
      ` }} />
    </div>
  );
}
