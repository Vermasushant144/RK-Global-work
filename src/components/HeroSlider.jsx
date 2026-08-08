'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useData } from '../context/DataContext';
import HeroSlide from './HeroSlide';
import SliderControls from './SliderControls';
import SliderIndicators from './SliderIndicators';

export default function HeroSlider({ onOpenQuote }) {
  const { slides } = useData();
  const heroSlides = slides && slides.length > 0 ? slides : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay Timer (5000ms)
  useEffect(() => {
    if (!isPaused && heroSlides.length > 0) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, heroSlides.length]);

  if (heroSlides.length === 0) return null;

  return (
    <section 
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Active Slide Display */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          style={{
            display: idx === currentIndex ? 'block' : 'none',
            transition: 'opacity 0.6s ease-in-out'
          }}
        >
          <HeroSlide slide={slide} onOpenQuote={onOpenQuote} />
        </div>
      ))}

      {/* Prev / Next Arrows */}
      <SliderControls onPrev={prevSlide} onNext={nextSlide} />

      {/* Pagination Dots & Numeric Counter */}
      <SliderIndicators 
        total={heroSlides.length} 
        current={currentIndex} 
        onSelect={goToSlide} 
      />
    </section>
  );
}
