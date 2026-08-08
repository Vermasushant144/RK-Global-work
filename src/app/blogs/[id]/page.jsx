'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Calendar, User, Clock } from 'lucide-react';
import { insights } from '../../../data/insights';

export default function SingleBlogPage() {
  const params = useParams();
  const blogId = params?.id;

  const blog = insights.find(b => b.id === blogId || b.slug === blogId) || insights[0];

  const relatedArticles = insights.filter(b => b.id !== blog.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '100px' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#0B1F33', color: '#FFFFFF', padding: '48px 0', borderBottom: '4px solid #F47B20' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/blogs" style={{ color: '#94A3B8', textDecoration: 'none' }}>Blog</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{blog.category}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 900, lineHeight: 1.2, maxWidth: '900px' }}>
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          
          {/* Main Article Card */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              marginBottom: '48px'
            }}
          >
            {/* Main Featured Image */}
            <div style={{ width: '100%', height: '420px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
              <img 
                src={blog.image} 
                alt={blog.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '40px' }}>
              {/* Meta Info Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.85rem', color: '#64748B', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={16} style={{ color: '#F47B20' }} />
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{blog.author}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} style={{ color: '#F47B20' }} />
                  <span>{blog.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} style={{ color: '#F47B20' }} />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* HTML Content Body */}
              <div 
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}
              />
            </div>

          </div>

          {/* Related Articles Section */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '24px' }}>
              Related Articles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.id}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    padding: '16px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.3, marginBottom: '8px' }}>{rel.title}</h4>
                  <div style={{ fontSize: '0.75rem', color: '#F47B20', fontWeight: 700, marginTop: 'auto' }}>Read Article →</div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-article-body h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1E293B;
          margin-top: 28px;
          margin-bottom: 12px;
        }
        .blog-article-body h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1E293B;
          margin-top: 22px;
          margin-bottom: 10px;
        }
        .blog-article-body p {
          font-size: 0.975rem;
          line-height: 1.75;
          color: #475569;
          margin-bottom: 16px;
        }
        .blog-article-body ul, .blog-article-body ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .blog-article-body li {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #334155;
          margin-bottom: 8px;
        }
        .blog-article-body blockquote {
          border-left: 4px solid #F47B20;
          padding-left: 18px;
          font-style: italic;
          color: #1E293B;
          margin: 24px 0;
        }
      ` }} />
    </div>
  );
}
