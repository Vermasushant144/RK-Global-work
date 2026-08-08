'use client';

import { Award, Package, MapPin, Users } from 'lucide-react';

export default function TrustBar() {
  const trustMetrics = [
    { num: '25+', label: 'Years Experience', icon: Award },
    { num: '500+', label: 'Products Delivered', icon: Package },
    { num: '50+', label: 'Cities Served', icon: MapPin },
    { num: '20+', label: 'Industries Supported', icon: Users },
  ];

  return (
    <div className="trust-bar-section">
      <div className="container">
        <div className="trust-bar-grid">
          {trustMetrics.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={item.label} className="trust-item">
                <div className="trust-icon-box">
                  <IconComp size={24} />
                </div>
                <div className="trust-text-box">
                  <div className="trust-num">{item.num}</div>
                  <div className="trust-label">{item.label}</div>
                </div>
                {idx < trustMetrics.length - 1 && <div className="trust-divider" />}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .trust-bar-section {
          background-color: var(--primary);
          border-top: 2px solid var(--accent);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 0;
          color: #FFFFFF;
        }

        .trust-bar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          gap: 20px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .trust-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background-color: rgba(244, 123, 32, 0.12);
          border: 1px solid rgba(244, 123, 32, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        .trust-num {
          font-size: 1.6rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1;
          margin-bottom: 4px;
        }

        .trust-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .trust-divider {
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          height: 36px;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 992px) {
          .trust-bar-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .trust-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
