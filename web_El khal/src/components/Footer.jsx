import React, { useState } from 'react';

export const Footer = ({ onSelectCategory, onSelectType }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                👟
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                CROCBAG
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your premier destination for lightweight, comfortable Crocs clogs & stylish handcrafted everyday bags. Order effortlessly via WhatsApp with instant delivery confirmation.
            </p>

            {/* Official Social Media Links */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Follow Us On Social Media
              </h4>
              <div className="flex items-center space-x-3">
                
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.33 2.56-.04 1.25.68 2.47 1.79 3.04 1.05.56 2.37.52 3.37-.11.96-.6 1.54-1.67 1.57-2.79.03-4.52.01-9.04.01-13.56z"/>
                  </svg>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/50252506084"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  aria-label="WhatsApp Contact"
                  title="WhatsApp: +502 52506084"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.003 3.674 3.746-.983z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { onSelectCategory('Women'); }}
                  className="hover:text-pink-400 transition-colors"
                >
                  Women's Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('Men'); }}
                  className="hover:text-sky-400 transition-colors"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('Kids'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kids Special
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectType('Crocs'); }}
                  className="hover:text-pink-400 transition-colors"
                >
                  Crocs & Slides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectType('Bags'); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Bags & Totes
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">WhatsApp Order Guide</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping & Delivery</li>
              <li className="hover:text-white cursor-pointer transition-colors">Crocs Size Chart</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchange</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* Direct WhatsApp Contact Card */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Instant Order Line
            </h4>
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Online & Ready</span>
              </div>
              <p className="text-xs text-slate-300">
                Have questions or need custom sizes? Contact our WhatsApp sales desk directly:
              </p>
              <a
                href="https://wa.me/50252506084"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <span>💬 Chat +502 52506084</span>
              </a>
            </div>
          </div>

        </div>

        {/* Newsletter & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} CROCBAG Store. All rights reserved. Designed for ultra-fast WhatsApp checkout.
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <span>🚚</span>
              <span>Fast Express Shipping</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>🔒</span>
              <span>Direct WhatsApp Verification</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
