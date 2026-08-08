'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/categories';

export default function CategorySection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        const el = document.getElementById('categories-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="categories-section" style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>MACHINERY CATEGORIES</div>
          <h2 className="heading-md" style={{ marginBottom: '12px' }}>
            Purpose-Built Equipment for Every Stage
          </h2>
          <p className="text-body">
            Explore our comprehensive range of high-performance construction and rebar processing machinery for all site requirements.
          </p>
        </div>

        {/* 4-Column Grid displaying 8 categories per page */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '48px'
          }}
          className="categories-grid"
        >
          {currentCategories.map((cat) => (
            <div 
              key={cat.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease'
              }}
              className="cat-card-item"
            >
              {/* Top Image Box */}
              <div 
                style={{
                  height: '180px',
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #F1F5F9',
                  padding: '16px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    color: '#F47B20',
                    letterSpacing: '0.05em'
                  }}
                >
                  RK GLOBAL
                </div>

                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
                <h3 
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#1E293B',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                    minHeight: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center'
                  }}
                >
                  {cat.name}
                </h3>

                <p 
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748B',
                    lineHeight: 1.4,
                    marginBottom: '20px',
                    minHeight: '36px'
                  }}
                >
                  {cat.description}
                </p>

                <Link 
                  href={`/products?category=${cat.id}`}
                  style={{
                    marginTop: 'auto',
                    backgroundColor: '#F47B20',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(244, 123, 32, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  className="cat-btn"
                >
                  View Products
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Controls Component */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === 1 ? '#94A3B8' : '#1E293B',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid #F47B20' : '1px solid #E2E8F0',
                  backgroundColor: isActive ? '#F47B20' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#1E293B',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === totalPages ? '#94A3B8' : '#1E293B',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

      <style jsx>{`
        .cat-card-item:hover {
          transform: translateY(-4px);
          border-color: #F47B20 !important;
          box-shadow: 0 8px 20px rgba(244, 123, 32, 0.12) !important;
        }
        .cat-btn:hover {
          background-color: #E0670F !important;
        }
        @media (max-width: 1100px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .categories-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
