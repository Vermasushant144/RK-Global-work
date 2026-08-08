'use client';

import HeroSlider from '../components/HeroSlider';
import TrustBar from '../components/TrustBar';
import AboutSection from '../components/AboutSection';
import TopSellingProducts from '../components/TopSellingProducts';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import BulkQuoteForm from '../components/BulkQuoteForm';
import WhyChooseUs from '../components/WhyChooseUs';
import B2BContactTeam from '../components/B2BContactTeam';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const handleOpenQuote = (product = null) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('openQuoteModal', { detail: product });
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      {/* Premium Hero Carousel */}
      <HeroSlider onOpenQuote={handleOpenQuote} />

      {/* Dark Navy Trust Bar */}
      <TrustBar />

      {/* Main Clean Homepage Sections */}
      <AboutSection />

      {/* Top Selling Products Section placed right above CategorySection */}
      <TopSellingProducts onOpenQuote={handleOpenQuote} />

      {/* Purpose-Built Equipment for Every Stage */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProducts onOpenQuote={handleOpenQuote} />

      {/* Request a Bulk Quote */}
      <BulkQuoteForm />

      {/* Why Professionals Choose Us */}
      <WhyChooseUs />

      {/* Talk to Our B2B Team placed RIGHT BELOW Why Professionals Choose Us */}
      <B2BContactTeam />

      {/* Construction Industry Insights */}
      <BlogSection />

      {/* Direct Contact Section */}
      <ContactSection />
    </>
  );
}
