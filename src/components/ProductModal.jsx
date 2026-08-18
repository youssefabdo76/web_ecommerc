import React, { useState, useEffect } from 'react';
import { CURRENCY_SYMBOL } from '../utils/whatsapp';

export const ProductModal = ({
  isOpen = false,
  product = null,
  onClose,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extract sizes and colors from product object
  useEffect(() => {
    if (product) {
      const availableSizes =
        product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0
          ? product.sizes
          : product.product_variants?.sizes ||
            (product.type === 'Crocs'
              ? ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
              : ['Standard']);

      const availableColors =
        product.colors && Array.isArray(product.colors) && product.colors.length > 0
          ? product.colors
          : product.product_variants?.colors ||
            ['Default'];

      setSelectedSize(availableSizes[0] || '');
      setSelectedColor(availableColors[0] || 'Default');
      setQuantity(1);
      setIsAdded(false);
      setImageError(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const availableSizes =
    product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes
      : product.product_variants?.sizes ||
        (product.type === 'Crocs'
          ? ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
          : ['Standard']);

  const availableColors =
    product.colors && Array.isArray(product.colors) && product.colors.length > 0
      ? product.colors
      : product.product_variants?.colors ||
        ['Default'];

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
  const hasDiscount = product.original_price && product.original_price > product.price;
  const savingsAmount = hasDiscount ? (product.original_price - product.price).toFixed(2) : null;
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleConfirmAddToCart = () => {
    const variantString = selectedSize
      ? `${selectedSize}${selectedColor !== 'Default' ? ` / ${selectedColor}` : ''}`
      : selectedColor !== 'Default'
      ? selectedColor
      : 'Default';

    onAddToCart({
      ...product,
      selected_variant: variantString,
      selected_size: selectedSize,
      selected_color: selectedColor,
      quantity: quantity
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 drawer-backdrop transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in duration-200 transition-colors duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{product.type === 'Crocs' ? '👟' : '👜'}</span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
                {product.type === 'Crocs' ? 'Footwear Selection' : 'Bag Selection'}
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white line-clamp-1">
                {product.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Product Image & Main Details */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            
            {/* Image Container */}
            <div className="w-40 h-40 sm:w-44 sm:h-44 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 relative overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-center space-y-2">
                  <svg className="w-12 h-12 stroke-current stroke-1" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {product.type === 'Crocs' ? 'Crocs Product' : 'Bag Product'}
                  </span>
                </div>
              )}
            </div>

            {/* Title, Description & Pricing */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                {product.target_audience?.map((aud) => (
                  <span
                    key={aud}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300"
                  >
                    {aud}
                  </span>
                ))}
                {product.categories?.slice(0, 2).map((cat) => (
                  <span key={cat} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {cat}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {product.description || 'High comfort product crafted with premium durable lightweight materials.'}
              </p>

              <div className="pt-1 flex items-baseline justify-center sm:justify-start space-x-2">
                <span className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                  {CURRENCY_SYMBOL}{product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                    {CURRENCY_SYMBOL}{product.original_price.toFixed(2)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Save {CURRENCY_SYMBOL}{savingsAmount}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* 1. Dynamic Size Selector Chips */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <span>📏</span>
                <span>Select Size ({product.type === 'Crocs' ? 'EU Shoe Sizes' : 'Size Options'}):</span>
              </label>
              {selectedSize && (
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-2.5 py-0.5 rounded-full">
                  Selected: {selectedSize}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-200 border text-center ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-pink-600 text-white border-slate-900 dark:border-pink-600 shadow-md scale-105 ring-2 ring-pink-500/50'
                        : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Dynamic Color Selector */}
          {availableColors.length > 0 && availableColors[0] !== 'Default' && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <span>🎨</span>
                <span>Select Color:</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Quantity Counter */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <span>🔢</span>
                <span>Quantity:</span>
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Stock Status: <strong className="text-emerald-600 dark:text-emerald-400">{product.in_stock ? 'In Stock' : 'Out of Stock'}</strong>
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold px-2">
                Item Quantity:
              </span>

              <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-800 dark:text-slate-200 font-extrabold flex items-center justify-center text-sm transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1 && val <= 99) {
                      setQuantity(val);
                    }
                  }}
                  className="w-12 text-center text-sm font-extrabold text-slate-900 dark:text-white bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold flex items-center justify-center text-sm transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions & Dynamic Total */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
              Subtotal Price
            </span>
            <span className="font-heading font-extrabold text-2xl text-pink-600 dark:text-pink-400">
              {CURRENCY_SYMBOL}{totalPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirmAddToCart}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 shadow-emerald-500/20'
                : 'bg-slate-900 dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-500 shadow-slate-900/20'
            }`}
          >
            {isAdded ? (
              <>
                <span className="text-lg">✓</span>
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add {quantity} {quantity === 1 ? 'Item' : 'Items'} to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
