import React from 'react';
import { Stock } from '@/types/stock';

interface StockCardProps {
  stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const isPositive = stock.percentageChange >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Top Section: Name and Price */}
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white leading-tight">
            {stock.name} <span className="opacity-70">({stock.symbol})</span>
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
            {stock.fullName || stock.name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            RM {stock.currentPrice.toFixed(2)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${
            isPositive 
              ? 'bg-emerald-400/90 text-white dark:bg-emerald-500/20 dark:text-emerald-400' 
              : 'bg-rose-400/90 text-white dark:bg-rose-500/20 dark:text-rose-400'
          }`}>
            {isPositive ? '+' : ''}{stock.percentageChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-slate-50 dark:bg-slate-800/50"></div>

      {/* Insight Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 8.7L21 11L14.4 13.3L12 20L9.6 13.3L3 11L9.6 8.7L12 2Z" />
          </svg>
          <span className="text-[10px] font-extrabold uppercase tracking-widest leading-none">
            Sifu Insight
          </span>
        </div>
        
        <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 italic">
          "{stock.aiExplanation || 'Performance reflects market trends and sectoral investor sentiment.'}"
        </p>
      </div>
    </div>
  );
};

export default StockCard;
