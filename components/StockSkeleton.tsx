import React from 'react';

const StockSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 w-20 rounded bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 w-16 rounded bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/50"></div>
          <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
      </div>
    </div>
  );
};

export default StockSkeleton;
