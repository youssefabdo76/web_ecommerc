import React, { useState, useEffect, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useProducts } from './hooks/useProducts';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export function App() {
  // REQUIREMENT 4: Dark Mode Theme State & Persistence
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crocbag_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('crocbag_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('crocbag_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Fetch product data dynamically from Supabase
  const { products, loading, error, refetch } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // Audience: Women, Men, Kids, ALL
  const [selectedType, setSelectedType] = useState('ALL');         // Type: Crocs, Bags, ALL
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modal State for Size & Quantity Selection
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Open Modal Handler
  const handleOpenModal = (product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  // Add Item to Cart Handler
  const handleAddToCart = (productToAdd) => {
    const qtyToAdd = productToAdd.quantity || 1;
    const variantKey = productToAdd.selected_variant || 'default';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === productToAdd.id && (item.selected_variant || 'default') === variantKey
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [...prevCart, { ...productToAdd, quantity: qtyToAdd }];
      }
    });

    const sizeTag = productToAdd.selected_size ? ` (${productToAdd.selected_size})` : '';
    showNotification(`Added ${qtyToAdd}x "${productToAdd.title}"${sizeTag} to cart!`);
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
      const matchesAudience =
        selectedCategory === 'ALL' ||
        (p.target_audience && p.target_audience.includes(selectedCategory));

      const matchesType = selectedType === 'ALL' || p.type === selectedType;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        (p.categories && p.categories.some((c) => c.toLowerCase().includes(query))) ||
        (p.target_audience && p.target_audience.some((a) => a.toLowerCase().includes(query)));

      return matchesAudience && matchesType && matchesSearch;
    });
  }, [products, selectedCategory, selectedType, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setSearchQuery('');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const featuredProduct = products.find((p) => p.is_featured) || products[0];

  const featuredImageUrl = useMemo(() => {
    if (!featuredProduct) return '/assets/crocs_classic_clog.png';
    const img = featuredProduct.images?.[0] || featuredProduct.image_url;
    if (!img) return '/assets/crocs_classic_clog.png';
    return img.startsWith('/public/') ? img.replace('/public/', '/') : img;
  }, [featuredProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-pink-500 selection:text-white transition-colors duration-300">
      
      {/* Header Navigation with Dark Mode toggle prop */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Hero Visual Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50/50 to-indigo-50 dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-200 dark:border-pink-900/50 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-xs font-bold text-pink-700 dark:text-pink-400 tracking-wide">
                Live Supabase Database Connected
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
              Comfort Meets Style with <span className="bg-gradient-to-r from-pink-600 to-indigo-600 dark:from-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">Crocs & Bags</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore vibrant pastel clogs, platform slides, handcrafted tote bags & mini crossbodies directly powered by Supabase. Order directly to your WhatsApp with instant confirmation.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <button
                onClick={() => { setSelectedType('Crocs'); setSelectedCategory('ALL'); }}
                className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>👟 Shop Crocs</span>
              </button>
              <button
                onClick={() => { setSelectedType('Bags'); setSelectedCategory('ALL'); }}
                className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>👜 Shop Bags</span>
              </button>
              <button
                onClick={() => { setSelectedCategory('Kids'); }}
                className="px-4 py-2 bg-amber-100 dark:bg-amber-950/50 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 text-xs font-bold rounded-2xl transition-all cursor-pointer"
              >
                <span>👧 Kids Special</span>
              </button>
            </div>
          </div>

          {/* Hero Feature Banner Visual */}
          {featuredProduct && (
            <div className="w-full md:w-96 aspect-video md:aspect-square bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group transition-colors duration-300">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-2.5 py-1 rounded-full">
                  Featured Deal
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">⚡ Live Supabase Item</span>
              </div>

              <div className="relative z-10 my-4 text-center">
                <img
                  src={featuredImageUrl}
                  alt={featuredProduct.title}
                  onError={(e) => { e.target.src = '/assets/crocs_classic_clog.png'; }}
                  className="h-44 sm:h-52 mx-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{featuredProduct.title}</h4>
                  <p className="text-xs text-pink-600 dark:text-pink-400 font-extrabold">
                    ${featuredProduct.price.toFixed(2)}{' '}
                    {featuredProduct.original_price && featuredProduct.original_price > featuredProduct.price && (
                      <span className="line-through text-slate-400 dark:text-slate-500 font-normal">${featuredProduct.original_price.toFixed(2)}</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenModal(featuredProduct)}
                  className="px-3.5 py-2 bg-slate-900 dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  Select Size & Qty
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Error Alert Banner */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h4 className="font-bold text-sm">Supabase Query Warning</h4>
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
            <button
              onClick={refetch}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Category & Audience Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          totalResults={filteredProducts.length}
          onResetFilters={handleResetFilters}
        />

        {/* Loading Spinner Skeleton */}
        {loading ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Fetching live product data from Supabase...</p>
          </div>
        ) : (
          /* Product Grid */
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onOpenModal={handleOpenModal}
            onResetFilters={handleResetFilters}
          />
        )}

      </main>

      {/* Size & Quantity Selector Modal */}
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProductForModal}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 animate-bounce border border-slate-700 dark:border-slate-300">
          <span className="text-pink-400 dark:text-pink-600">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onSelectType={setSelectedType}
      />

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}

export default App;
