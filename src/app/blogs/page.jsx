'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight, RotateCcw } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function BlogsPage() {
  const { blogs } = useData();
  const insights = blogs || [];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter logic
  const filteredBlogs = selectedCategory
    ? insights.filter(b => b.category === selectedCategory)
    : insights;

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const categoriesList = Array.from(new Set(insights.map(i => i.category)));

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '100px' }}>
      
      {/* Top Banner matching website theme (Industrial Orange #F47B20) */}
      <div 
        style={{
          backgroundColor: '#F47B20',
          color: '#FFFFFF',
          padding: '48px 0',
          boxShadow: '0 4px 20px rgba(244, 123, 32, 0.2)'
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Blog
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#FFEDD5' }}>
            <Link href="/" style={{ color: '#FFEDD5', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Blog</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '36px' }}>
        
        {/* Filter By & Reset Bar */}
        <div 
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '14px 24px',
            marginBottom: '36px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
          className="blog-filter-bar"
        >
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B' }}>
            Filter By:
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#1E293B',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">Select Category</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 3-Column Grid of Blog Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
            marginBottom: '48px'
          }}
          className="blogs-page-grid"
        >
          {currentBlogs.map((blog) => (
            <div 
              key={blog.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease'
              }}
              className="blog-card-item"
            >
              {/* Blog Image */}
              <div style={{ height: '210px', overflow: 'hidden', backgroundColor: '#F1F5F9', position: 'relative' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                {/* Category Pill */}
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F47B20', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  {blog.category}
                </div>

                <h3 
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#1E293B',
                    lineHeight: 1.4,
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '48px'
                  }}
                >
                  {blog.title}
                </h3>

                {/* Meta info: Author & Date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} style={{ color: '#F47B20' }} />
                    <span style={{ fontWeight: 600 }}>{blog.author}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} style={{ color: '#94A3B8' }} />
                    <span>{blog.date}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/blogs/${blog.id}`}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    color: '#F47B20',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    textDecoration: 'none'
                  }}
                  className="blog-read-more-link"
                >
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
                color: currentPage === 1 ? '#94A3B8' : '#1E293B',
                fontWeight: 700,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
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

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
                color: currentPage === totalPages ? '#94A3B8' : '#1E293B',
                fontWeight: 700,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              ›
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        .blog-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(244, 123, 32, 0.12) !important;
          border-color: #F47B20 !important;
        }
        .blog-read-more-link:hover {
          color: #E0670F !important;
        }
        @media (max-width: 1024px) {
          .blogs-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .blogs-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
