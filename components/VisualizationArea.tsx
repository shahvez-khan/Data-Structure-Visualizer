import React from 'react';
import type { Bar } from '../types';

interface VisualizationAreaProps {
  bars: Bar[];
}

const statusColors: Record<Bar['status'], string> = {
  default: 'bg-slate-500',
  comparing: 'bg-yellow-400',
  swapping: 'bg-red-500',
  sorted: 'bg-green-500',
};

export const VisualizationArea: React.FC<VisualizationAreaProps> = ({ bars }) => {
  const maxVal = bars.length > 0 ? Math.max(...bars.map(b => b.value)) : 1;
  
  return (
    // A single root element that holds both the bars and the labels in one bordered container.
    <div className="bg-brand-bg rounded-lg border border-brand-secondary">
      {/* This container is for the animated bars */}
      <div 
        id="visualization-area" 
        className="flex justify-center items-end gap-1 p-4 h-[55vh]"
      >
        {bars.map((bar) => (
          <div
            key={bar.id}
            className={`w-full rounded-t-md transition-all duration-300 ease-in-out ${statusColors[bar.status]}`}
            style={{ height: `${(bar.value / maxVal) * 100}%` }}
          >
            {/* The bar itself has no text inside */}
          </div>
        ))}
      </div>
      {/* This new container is for the large, visible labels at the bottom */}
      <div
        id="label-area"
        className="flex justify-center items-center gap-1 px-4 pb-4"
      >
        {bars.map((bar) => (
          <div 
            key={bar.id} 
            className={`w-full text-center bg-brand-primary border border-brand-secondary text-brand-text font-bold p-2 rounded text-lg`}
          >
            {bar.value}
          </div>
        ))}
      </div>
    </div>
  );
};