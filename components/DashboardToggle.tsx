import React from 'react';
import { TimeRange } from '@/types/stock';

interface DashboardToggleProps {
  currentRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

const DashboardToggle: React.FC<DashboardToggleProps> = ({ currentRange, onChange }) => {
  return (
    <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      <button
        onClick={() => onChange('daily')}
        className={`px-4 py-1.5 text-sm font-semibold transition-all duration-200 rounded-lg ${
          currentRange === 'daily'
            ? 'bg-white text-indigo-600 shadow-sm dark:bg-indigo-600 dark:text-white'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
      >
        Daily
      </button>
      <button
        onClick={() => onChange('weekly')}
        className={`px-4 py-1.5 text-sm font-semibold transition-all duration-200 rounded-lg ${
          currentRange === 'weekly'
            ? 'bg-white text-indigo-600 shadow-sm dark:bg-indigo-600 dark:text-white'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
      >
        Weekly
      </button>
    </div>
  );
};

export default DashboardToggle;
