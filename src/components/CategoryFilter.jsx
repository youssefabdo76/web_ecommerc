import React from 'react';
import { AUDIENCE_CATEGORIES, PRODUCT_TYPES } from '../data/products';

export const CategoryFilter = ({
  selectedCategory = 'ALL',
  onSelectCategory,
  selectedType = 'ALL',
  onSelectType,
  totalResults = 0,
  onResetFilters
}) => {
  const isFilterActive = selectedCategory !== 'ALL' || selectedType !== 'ALL';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 mb-8 space-y-6 transition-colors duration-300">
      
      {/* Product Type Tabs (Crocs vs Bags) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Product Category
          </span>
          {isFilterActive && (
            <button
              onClick={onResetFilters}
              className="text-xs font-medium text-pink-600 dark:text-pink-400 hover:text-pink-700 flex items-center space-x-1"
            >
              <span>Reset Filters</span>
              <span>✕</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {PRODUCT_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-pink-600 text-white shadow-md scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{type.id === 'Crocs' ? '👟' : type.id === 'Bags' ? '👜' : '🛍️'}</span>
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Audience Tabs (Women, Men, Kids) */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Target Audience
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-slate-100">{totalResults}</strong> items
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {AUDIENCE_CATEGORIES.map((audience) => {
            const isSelected = selectedCategory === audience.id;
            
            let activeStyle = "bg-pink-600 text-white shadow-pink-500/20";
            if (audience.id === 'Men') activeStyle = "bg-sky-600 text-white shadow-sky-500/20";
            if (audience.id === 'Kids') activeStyle = "bg-amber-500 text-white shadow-amber-500/20";
            if (audience.id === 'ALL') activeStyle = "bg-slate-900 dark:bg-pink-600 text-white shadow-slate-900/20";

            return (
              <button
                key={audience.id}
                onClick={() => onSelectCategory(audience.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? `${activeStyle} font-bold shadow-md scale-[1.02]`
                    : `${audience.badgeColor} border-transparent`
                }`}
              >
                <span>{audience.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
