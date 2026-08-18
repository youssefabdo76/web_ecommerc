import React, { useState } from 'react';
import { sendOrderToWhatsApp, CURRENCY_SYMBOL, DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const CartDrawer = ({
  isOpen = false,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);

  if (!isOpen) return null;

  // Calculate order metrics
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // WhatsApp Checkout Handler
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const customerDetails = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      notes: customerNotes
    };

    sendOrderToWhatsApp(cartItems, customerDetails, totalAmount, whatsappNumber);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Dimmed Blurred Backdrop */}
      <div
        className="fixed inset-0 drawer-backdrop transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Slide-over Container */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg">
                🛒
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg tracking-tight">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length > 0 ? (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Selected Items
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemSubtotal = (item.price * item.quantity).toFixed(2);
                    return (
                      <div
                        key={`${item.id}-${item.selected_variant || 'default'}`}
                        className="flex items-center space-x-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/60 hover:bg-white hover:shadow-sm transition-all"
                      >
                        {/* Image Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-white p-2 border border-slate-200 flex-shrink-0">
                          <img
                            src={item.images?.[0]}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {item.title}
                          </h4>
                          
                          {/* Audience & Variant info */}
                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                            {item.target_audience && (
                              <span className="font-semibold text-pink-600">
                                [{item.target_audience.join(', ')}]
                              </span>
                            )}
                            {item.selected_variant && (
                              <span className="truncate">({item.selected_variant})</span>
                            )}
                          </div>

                          <div className="font-bold text-xs text-slate-900">
                            {CURRENCY_SYMBOL}{item.price.toFixed(2)}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end space-y-1.5">
                          <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selected_variant, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selected_variant, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-[11px] font-extrabold text-pink-600">
                            {CURRENCY_SYMBOL}{itemSubtotal}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Customer Information Form */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                    <span>📋</span>
                    <span>Order & Delivery Details (Optional)</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address / City"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Special instructions or notes..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      rows="2"
                      className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Target WhatsApp Business Number Configuration */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-emerald-800">
                    <span>Target Business WhatsApp:</span>
                    <span className="bg-emerald-200/60 px-2 py-0.5 rounded text-[10px] uppercase">Active</span>
                  </div>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full text-xs font-mono py-1 px-2 bg-white border border-emerald-300 rounded-lg text-emerald-900 focus:outline-none"
                    title="Change WhatsApp target number if needed"
                  />
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto">
                  🛍️
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-800">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our Crocs & Bags collection and add your favorite items!
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer & PRIMARY WHATSAPP CHECKOUT CTA */}
          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            
            {/* Calculation Summary */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-800">
                  {CURRENCY_SYMBOL}{totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp Delivery Confirmation</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-heading font-extrabold text-slate-900">
                <span>Total Order Amount</span>
                <span className="text-pink-600 text-lg">
                  {CURRENCY_SYMBOL}{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CRUCIAL FEATURE: Official WhatsApp Checkout Button */}
            <button
              onClick={handleWhatsAppCheckout}
              disabled={cartItems.length === 0}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2.5 transition-all duration-200 shadow-lg active:scale-98 ${
                cartItems.length > 0
                  ? 'bg-[#25D366] hover:bg-[#20BD5A] whatsapp-glow cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed opacity-60'
              }`}
            >
              {/* Official WhatsApp SVG Logo */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.003 3.674 3.746-.983z"/>
              </svg>
              <span>Order via WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-slate-400">
              ⚡ Clicking will open WhatsApp with your formatted order summary.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
