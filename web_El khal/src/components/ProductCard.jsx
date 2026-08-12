import React, { useState } from 'react';
import { CURRENCY_SYMBOL } from '../utils/whatsapp';

export const ProductCard = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.product_variants?.sizes?.[0] || ''
  );

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selected_variant: selectedVariant
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Helper for cross-category pill badge styling
  const getBadgeStyle = (audience) => {
    switch (audience) {
      case 'Women':
        return 'badge-women';
      case 'Men':
        return 'badge-men';
      case 'Kids':
        return 'badge-kids';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center p-6">
        
        {/* Product Type Tag (Crocs vs Bag) */}
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-800 shadow-sm border border-slate-100">
          {product.type === 'Crocs' ? '👟 Crocs' : '👜 Bag'}
        </span>

        {/* Featured / Discount Tag */}
        {product.original_price && (
          <span className="absolute top-3 right-3 z-10 text-[10px] font-extrabold uppercase tracking-wider bg-pink-500 text-white px-2.5 py-1 rounded-full shadow-md">
            Save ${(product.original_price - product.price).toFixed(0)}
          </span>
        )}

        {/* High Quality Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          
          {/* CROSS-CATEGORY PILL BADGES (Crucial Requirement) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {product.target_audience.map((aud) => (
              <span
                key={aud}
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeStyle(aud)} shadow-2xs`}
              >
                {aud}
              </span>
            ))}
            {product.categories.slice(0, 1).map((cat) => (
              <span key={cat} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-base text-slate-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating & Review */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(product.rating))}
            </div>
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span>({product.review_count})</span>
          </div>

          {/* Variant Selector (if size available) */}
          {product.product_variants?.sizes && (
            <div className="pt-1">
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-500"
              >
                {product.product_variants.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    Size: {sz}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price */}
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-heading font-extrabold text-xl text-slate-900">
                {CURRENCY_SYMBOL}{product.price.toFixed(2)}
              </span>
              {product.original_price && (
                <span className="text-xs text-slate-400 line-through">
                  {CURRENCY_SYMBOL}{product.original_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart CTA Button */}
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 flex items-center space-x-1.5 shadow-md active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-slate-900 hover:bg-pink-600 text-white shadow-slate-900/10'
            }`}
          >
            {isAdded ? (
              <>
                <span>✓</span>
                <span>Added</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
