'use client';

export default function SliderIndicators({ total, current, onSelect }) {
  const formatIndex = (idx) => String(idx + 1).padStart(2, '0');

  return (
    <div className="slider-indicators-box">
      <div className="dots-row">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              type="button"
              className={`indicator-dot ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
              title={`Slide ${i + 1}`}
            />
          );
        })}
      </div>

      <div className="slide-counter">
        <span className="count-curr">{formatIndex(current)}</span>
        <span className="count-sep">/</span>
        <span className="count-total">{formatIndex(total)}</span>
      </div>

      <style jsx>{`
        .slider-indicators-box {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(11, 31, 51, 0.45);
          backdrop-filter: blur(8px);
          padding: 8px 18px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .dots-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator-dot.active {
          background-color: var(--accent);
          width: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(244, 123, 32, 0.6);
        }

        .slide-counter {
          font-size: 0.8rem;
          font-weight: 800;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.05em;
        }

        .count-curr {
          color: var(--accent);
        }

        .count-sep, .count-total {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}
