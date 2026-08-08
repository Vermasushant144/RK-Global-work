'use client';

export default function StatsSection() {
  const stats = [
    { num: '25+', label: 'Years Experience', sub: 'Established engineering excellence' },
    { num: '500+', label: 'Products Delivered', sub: 'Deployed across major sites' },
    { num: '50+', label: 'Cities Served', sub: 'Pan India support network' },
    { num: '20+', label: 'Industries Supported', sub: 'Metros, highways & civil' }
  ];

  return (
    <section style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '50px 0', borderTop: '3px solid var(--accent)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }} className="stats-grid">
          {stats.map((item, idx) => (
            <div 
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: idx < stats.length - 1 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                paddingRight: '20px'
              }}
              className="stat-col-item"
            >
              <div 
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 3.8rem)',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '8px'
                }}
              >
                {item.num}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
          }
          .stat-col-item {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
