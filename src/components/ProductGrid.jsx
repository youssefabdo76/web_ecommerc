import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [], onAddToCart, onOpenModal, onResetFilters }) => {
  const [sortBy, setSortBy] = useState('featured');

  // Sorted product list calculation
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    return list; // featured default order
  }, [products, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Grid Toolbar & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100">
            Catalog Products
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {sortedProducts.length} items matching your filter
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-xs transition-colors"
          >
            <option value="featured">✨ Featured First</option>
            <option value="price-low">💵 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Cards Container - items-stretch ensuring uniform height */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto my-12 space-y-4 shadow-sm transition-colors duration-300">
          <div className="w-16 h-16 bg-pink-50 dark:bg-pink-950/40 rounded-full flex items-center justify-center text-3xl mx-auto text-pink-500">
            🔍
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100">
            No Products Found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We couldn't find any products matching your current filters or search term.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-slate-900 dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-500 text-white text-xs font-bold rounded-2xl shadow-md transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

    </div>
  );
};
