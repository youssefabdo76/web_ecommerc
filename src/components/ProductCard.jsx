import React, { useState } from 'react';
import { CURRENCY_SYMBOL } from '../utils/whatsapp';

export const ProductCard = ({ product, onAddToCart, onOpenModal }) => {
  const [imageError, setImageError] = useState(false);

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

  // Robust image URL calculation (strips /public prefix if present)
  const getImageUrl = () => {
    const rawImage = product.images?.[0] || product.image_url || product.image;
    if (!rawImage || imageError) {
      return null;
    }
    if (typeof rawImage === 'string' && rawImage.startsWith('/public/')) {
      return rawImage.replace('/public/', '/');
    }
    return rawImage;
  };

  const imageUrl = getImageUrl();

  const handleCardClick = () => {
    if (onOpenModal) {
      onOpenModal(product);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 cursor-pointer"
    >
      
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

        {/* Dynamic Image with Fallback handling */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          /* SVG Placeholder graphics when URL is missing or broken */
          <div className="flex flex-col items-center justify-center text-slate-300 space-y-2">
            <svg className="w-16 h-16 stroke-current stroke-1" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {product.type === 'Crocs' ? 'Crocs Shoe' : 'Bag Product'}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          
          {/* Target Audience Pill Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {product.target_audience?.map((aud) => (
              <span
                key={aud}
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeStyle(aud)} shadow-2xs`}
              >
                {aud}
              </span>
            ))}
            {product.categories?.slice(0, 1).map((cat) => (
              <span key={cat} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {cat}
              </span>
            ))}
          </div>

          {/* Title (Ratings & Reviews completely removed as requested) */}
          <h3 className="font-heading font-bold text-base text-slate-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description || 'Lightweight, ultra-comfortable footwear with ergonomic cushioning.'}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
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

          {/* Quick Select Options / Add to Cart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenModal) {
                onOpenModal(product);
              } else {
                onAddToCart(product);
              }
            }}
            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-pink-600 text-white transition-all duration-200 flex items-center space-x-1.5 shadow-md active:scale-95"
          >
            <span>👟 Select Size & Qty</span>
          </button>
        </div>

      </div>

    </div>
  );
};
