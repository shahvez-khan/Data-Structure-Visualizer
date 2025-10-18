// Fix: Implement the AiInsights component.
import React, { useState, useEffect } from 'react';
import type { Algorithm } from '../types';
import { getAlgorithmExplanation } from '../services/geminiService';

interface AiInsightsProps {
  algorithm: Algorithm;
}

const algorithmDisplayNames: Record<Algorithm, string> = {
    bubble: 'Bubble Sort',
    selection: 'Selection Sort',
    insertion: 'Insertion Sort',
    merge: 'Merge Sort',
};

export const AiInsights: React.FC<AiInsightsProps> = ({ algorithm }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      if (!algorithm) return;
      setIsLoading(true);
      setError(null);
      setExplanation('');
      try {
        const result = await getAlgorithmExplanation(algorithm);
        setExplanation(result);
      } catch (err) {
        setError('Failed to load AI insights. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExplanation();
  }, [algorithm]);
  
  const displayName = algorithmDisplayNames[algorithm];

  return (
    <div className="mt-6 p-4 bg-brand-secondary/30 rounded-lg border border-brand-secondary">
      <h3 className="text-xl font-bold text-brand-accent mb-3">AI Insights: {displayName} Time Complexity</h3>
      {isLoading && (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
          <p className="ml-3 text-brand-text-secondary">Generating explanation...</p>
        </div>
      )}
      {error && <p className="text-red-400">{error}</p>}
      {!isLoading && explanation && (
        <div className="prose prose-invert max-w-none text-brand-text-secondary whitespace-pre-wrap">
          {explanation}
        </div>
      )}
    </div>
  );
};
