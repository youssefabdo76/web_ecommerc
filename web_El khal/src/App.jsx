import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export const App = () => {
  const [products] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // Audience: Women, Men, Kids, ALL
  const [selectedType, setSelectedType] = useState('ALL');         // Type: Crocs, Bags, ALL
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persisted cart state in localStorage
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crocbag_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('crocbag_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Notification Trigger
  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Add Item to Cart Handler
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const variantKey = productToAdd.selected_variant || 'default';
      const existingIndex = prevCart.findIndex(
        (item) => item.id === productToAdd.id && (item.selected_variant || 'default') === variantKey
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });

    showNotification(`Added "${productToAdd.title}" to cart!`);
  };

  // Quantity Update Handler
  const handleUpdateQuantity = (productId, variant, newQty) => {
    const variantKey = variant || 'default';
    if (newQty <= 0) {
      handleRemoveItem(productId, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && (item.selected_variant || 'default') === variantKey
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove Item Handler
  const handleRemoveItem = (productId, variant) => {
    const variantKey = variant || 'default';
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && (item.selected_variant || 'default') === variantKey)
      )
    );
  };

  // Clear Cart Handler
  const handleClearCart = () => {
    setCart([]);
  };

  // Multi-Filter Logic (Audience, Type, Search)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Audience Filter (Men, Women, Kids, ALL)
      const matchesAudience =
        selectedCategory === 'ALL' ||
        (p.target_audience && p.target_audience.includes(selectedCategory));

      // 2. Product Type Filter (Crocs, Bags, ALL)
      const matchesType = selectedType === 'ALL' || p.type === selectedType;

      // 3. Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.categories.some((c) => c.toLowerCase().includes(query)) ||
        p.target_audience.some((a) => a.toLowerCase().includes(query));

      return matchesAudience && matchesType && matchesSearch;
    });
  }, [products, selectedCategory, selectedType, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setSearchQuery('');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-pink-500 selection:text-white">
      
      {/* Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Hero Visual Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50/50 to-indigo-50 border-b border-slate-200/60 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-xs font-bold text-pink-700 tracking-wide">
                New Summer Arrivals 2026
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
              Comfort Meets Style with <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">Crocs & Bags</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore vibrant pastel clogs, platform slides, handcrafted tote bags & mini crossbodies. Order directly to your WhatsApp with instant confirmation.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <button
                onClick={() => { setSelectedType('Crocs'); setSelectedCategory('ALL'); }}
                className="px-4 py-2 bg-white hover:bg-pink-50 text-slate-800 text-xs font-bold rounded-2xl shadow-sm border border-slate-200 transition-all flex items-center space-x-1.5"
              >
                <span>👟 Shop Crocs</span>
              </button>
              <button
                onClick={() => { setSelectedType('Bags'); setSelectedCategory('ALL'); }}
                className="px-4 py-2 bg-white hover:bg-indigo-50 text-slate-800 text-xs font-bold rounded-2xl shadow-sm border border-slate-200 transition-all flex items-center space-x-1.5"
              >
                <span>👜 Shop Bags</span>
              </button>
              <button
                onClick={() => { setSelectedCategory('Kids'); }}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-2xl transition-all"
              >
                <span>👧 Kids Special</span>
              </button>
            </div>
          </div>

          {/* Hero Feature Banner Visual */}
          <div className="w-full md:w-96 aspect-video md:aspect-square bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-300/30 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
                Featured Deal
              </span>
              <span className="text-xs font-bold text-slate-400">⚡ Limited Stock</span>
            </div>

            <div className="relative z-10 my-4 text-center">
              <img
                src="/public/assets/crocs_classic_clog.png"
                alt="Classic Pastel Charm Clog"
                className="h-44 sm:h-52 mx-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">Pastel Charm Clog</h4>
                <p className="text-xs text-pink-600 font-extrabold">$49.99 <span className="line-through text-slate-400 font-normal">$59.99</span></p>
              </div>
              <button
                onClick={() => handleAddToCart(products[0])}
                className="px-3.5 py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Category & Audience Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          totalResults={filteredProducts.length}
          onResetFilters={handleResetFilters}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Cart Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 animate-bounce border border-slate-700">
          <span className="text-pink-400">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onSelectType={setSelectedType}
      />

    </div>
  );
};
