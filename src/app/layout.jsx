'use client';

import { useState } from 'react';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuoteModal from '../components/QuoteModal';
import SearchModal from '../components/SearchModal';
import FloatingCTABar from '../components/FloatingCTABar';
import Toast from '../components/Toast';
import FirstTimePopupModal from '../components/FirstTimePopupModal';

export default function RootLayout({ children }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleOpenQuote = (product = null) => {
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  const handleShowToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 5000);
  };

  return (
    <html lang="en">
      <head>
        <title>R K Global Engineering | Premium B2B Construction Machinery & Equipment</title>
        <meta name="description" content="R K Global Engineering - Engineering Solutions. Building A Better Tomorrow. High-performance B2B construction equipment manufacturer in India. Concrete mixers, floor cutters, tandem rollers, plate compactors, hoists, and power trowels." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <AuthProvider>
          <DataProvider>
            <Header 
              onOpenQuote={() => handleOpenQuote()} 
              onOpenSearch={() => setIsSearchOpen(true)} 
            />

            <main style={{ flexGrow: 1 }}>
              {children}
            </main>

            <Footer onOpenQuote={() => handleOpenQuote()} />

            <FloatingCTABar onOpenQuote={() => handleOpenQuote()} />

            {/* First-Time Automatic Enquiry Popup Modal */}
            <FirstTimePopupModal onToast={handleShowToast} />

            <QuoteModal 
              isOpen={isQuoteOpen} 
              onClose={() => setIsQuoteOpen(false)} 
              selectedProduct={selectedProduct}
              onToast={handleShowToast}
            />

            <SearchModal 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
            />

            <Toast 
              message={toastMsg} 
              onClose={() => setToastMsg('')} 
            />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
