import React, { useState } from 'react';

export const Header = ({ 
  cartCount = 0, 
  onOpenCart, 
  searchQuery = '', 
  onSearchChange,
  selectedCategory = 'ALL',
  onSelectCategory,
  selectedType = 'ALL',
  onSelectType
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAudienceClick = (cat) => {
    onSelectCategory(cat);
    setIsMobileMenuOpen(false);
  };

  const handleTypeClick = (type) => {
    onSelectType(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav shadow-sm transition-all duration-300">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center space-x-2">
        <span>✨ Summer Special Sale! Free Delivery & Fast WhatsApp Ordering!</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Direct Checkout</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <button 
              onClick={() => { handleAudienceClick('ALL'); handleTypeClick('ALL'); }}
              className="flex items-center space-x-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-pink-600 font-bold text-xl">
                  👟
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-gray-900 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  CROCBAG
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-pink-600 uppercase -mt-1">
                  Crocs & Bag Store
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Crocs, Tote Bags, Crossbody, Clogs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all duration-200 shadow-inner"
              />
              <svg 
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Social Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Desktop Social Quick Links */}
            <div className="hidden lg:flex items-center space-x-2 border-r border-slate-200 pr-4 mr-1 text-slate-500">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/50252506084" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                title="WhatsApp Direct Contact"
              >
                <svg className="w-4 h-4 fill-current text-emerald-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.003 3.674 3.746-.983z"/>
                </svg>
              </a>
            </div>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-md hover:from-pink-600 hover:to-rose-700 active:scale-95 transition-all duration-200 group"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-medium text-xs sm:text-sm hidden sm:inline-block">Cart</span>
              
              {/* Badge Counter */}
              {cartCount > 0 ? (
                <span className="bg-white text-pink-600 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-white/20 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Crocs, Bags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
            <svg 
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 drawer-backdrop transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />

          {/* Drawer Container */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl pt-5 pb-4">
            <div className="px-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">👟</span>
                <span className="font-heading font-extrabold text-lg bg-gradient-to-r from-gray-900 to-pink-600 bg-clip-text text-transparent">
                  CROCBAG
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex-1 px-4 overflow-y-auto space-y-6">
              
              {/* Product Types Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Product Types
                </h3>
                <div className="space-y-1">
                  {[
                    { id: 'ALL', label: '🛍️ All Products' },
                    { id: 'Crocs', label: '👟 Crocs Collection' },
                    { id: 'Bags', label: '👜 Bags & Totes' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTypeClick(t.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedType === t.id 
                          ? 'bg-pink-50 text-pink-600 font-semibold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience Categories */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Shop by Audience
                </h3>
                <div className="space-y-1">
                  {[
                    { id: 'ALL', label: '✨ All Audiences' },
                    { id: 'Women', label: '👩 Women Collection' },
                    { id: 'Men', label: '👨 Men Collection' },
                    { id: 'Kids', label: '👧 Kids Special' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleAudienceClick(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedCategory === cat.id 
                          ? 'bg-pink-50 text-pink-600 font-semibold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Contact & Socials */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Direct Contact & Socials
                </h3>
                <a
                  href="https://wa.me/50252506084"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 w-full p-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-medium text-sm hover:bg-emerald-100 transition-colors mb-2"
                >
                  <span className="w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    WA
                  </span>
                  <span>WhatsApp: +502 52506084</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
