'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SliderControls({ onPrev, onNext }) {
  return (
    <>
      <button
        type="button"
        className="slider-nav-btn slider-nav-prev"
        onClick={onPrev}
        aria-label="Previous slide"
        title="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        className="slider-nav-btn slider-nav-next"
        onClick={onNext}
        aria-label="Next slide"
        title="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <style jsx>{`
        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(11, 31, 51, 0.55);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slider-nav-prev {
          left: 24px;
        }

        .slider-nav-next {
          right: 24px;
        }

        .slider-nav-btn:hover {
          background-color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(244, 123, 32, 0.4);
          transform: translateY(-50%) scale(1.08);
        }

        @media (max-width: 768px) {
          .slider-nav-btn {
            width: 38px;
            height: 38px;
          }
          .slider-nav-prev {
            left: 12px;
          }
          .slider-nav-next {
            right: 12px;
          }
        }
      `}</style>
    </>
  );
}
