'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { heroSlides } from '../data/heroSlides';
import HeroSlide from './HeroSlide';
import SliderControls from './SliderControls';
import SliderIndicators from './SliderIndicators';

export default function HeroSlider({ onOpenQuote }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay Timer (5000ms)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Construction Machinery Hero Carousel"
    >
      {/* Slides Container */}
      <div className="slider-track-container">
        {heroSlides.map((slide, index) => (
          <HeroSlide 
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            onOpenQuote={onOpenQuote}
          />
        ))}
      </div>

      {/* Slider Left & Right Nav Controls */}
      <SliderControls onPrev={prevSlide} onNext={nextSlide} />

      {/* Slider Bottom Pagination Dots & Counter */}
      <SliderIndicators 
        total={heroSlides.length} 
        current={currentIndex} 
        onSelect={goToSlide} 
      />

      <style jsx>{`
        .hero-slider-section {
          position: relative;
          width: 100%;
          height: clamp(600px, 80vh, 740px);
          overflow: hidden;
          background-color: var(--dark);
        }

        .slider-track-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .hero-slider-section {
            height: 620px;
          }
        }
      `}</style>
    </section>
  );
}
