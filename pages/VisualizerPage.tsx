// Fix: Implement the VisualizerPage component.
import React, { useState, useCallback } from 'react';
import { Controls } from '../components/Controls';
import { VisualizationArea } from '../components/VisualizationArea';
import { AiInsights } from '../components/AiInsights';
import type { Bar, Algorithm } from '../types';

const generateInitialBars = (values: number[]): Bar[] => {
  return values.map((value, index) => ({
    value,
    status: 'default',
    id: `${value}-${index}-${Date.now()}` // Unique key
  }));
};

// This array should match the default inputValue in Controls.tsx
const DEFAULT_ARRAY = [65, 58, 9, 88, 21, 14, 34, 45, 77, 51];

const VisualizerPage: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>(() => generateInitialBars(DEFAULT_ARRAY));
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubble');

  const handleArrayChange = useCallback((newArray: number[]) => {
    if (isSorting) return;
    setBars(generateInitialBars(newArray));
  }, [isSorting]);
  
  const handleReset = useCallback(() => {
    if (isSorting) return;
    setBars(generateInitialBars(DEFAULT_ARRAY));
  }, [isSorting]);

  const handleSortStart = useCallback(() => setIsSorting(true), []);
  const handleSortEnd = useCallback(() => setIsSorting(false), []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <Controls
        onArrayChange={handleArrayChange}
        onSortStart={handleSortStart}
        onSortEnd={handleSortEnd}
        onReset={handleReset}
        isSorting={isSorting}
        setBars={setBars}
        initialBars={bars}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <VisualizationArea bars={bars} />
      <AiInsights algorithm={selectedAlgorithm} />
    </div>
  );
};

export default VisualizerPage;