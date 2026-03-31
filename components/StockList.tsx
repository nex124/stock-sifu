import React from 'react';
import { Stock } from '@/types/stock';
import StockCard from './StockCard';
import StockSkeleton from './StockSkeleton';

interface StockListProps {
  title: string;
  icon: string;
  stocks: Stock[];
  isLoading: boolean;
  error: string | null;
}

const StockList: React.FC<StockListProps> = ({ title, icon, stocks, isLoading, error }) => {
  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>{icon}</span> {title}
        </h2>
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/30 dark:bg-rose-900/10">
          <p className="font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-sm font-bold underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      
      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <StockSkeleton key={i} />
          ))
        ) : stocks.length > 0 ? (
          stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
            <p>No stocks found for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
