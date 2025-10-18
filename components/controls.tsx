import React, { useState, useCallback } from 'react';
import type { Bar, Algorithm } from '../types';

interface ControlsProps {
  onArrayChange: (newArray: number[]) => void;
  onSortStart: () => void;
  onSortEnd: () => void;
  onReset: () => void;
  isSorting: boolean;
  setBars: React.Dispatch<React.SetStateAction<Bar[]>>;
  initialBars: Bar[];
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ALGORITHMS: { id: Algorithm; name: string }[] = [
  { id: 'bubble', name: 'Bubble Sort' },
  { id: 'selection', name: 'Selection Sort' },
  { id: 'insertion', name: 'Insertion Sort' },
  { id: 'merge', name: 'Merge Sort' },
];

export const Controls: React.FC<ControlsProps> = ({ 
  onArrayChange, 
  onSortStart, 
  onSortEnd,
  onReset,
  isSorting,
  setBars,
  initialBars,
  selectedAlgorithm,
  setSelectedAlgorithm
}) => {
  const [inputValue, setInputValue] = useState<string>("65, 58, 9, 88, 21, 14, 34, 45, 77, 51");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const parseAndSetArray = () => {
    const numbers = inputValue
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);

    if (numbers.some(isNaN) || numbers.length < 2) {
      setError("Please enter at least two comma-separated numbers.");
      return;
    }

    if(numbers.some(n => n > 100 || n < 1)) {
      setError("Please enter numbers between 1 and 100.");
      return;
    }
    
    setError(null);
    onArrayChange(numbers);
  };

  const runBubbleSort = useCallback(async () => {
    onSortStart();
    let localBars = [...initialBars];
    const n = localBars.length;
    
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        localBars[j].status = 'comparing';
        localBars[j + 1].status = 'comparing';
        setBars([...localBars]);
        await sleep(150);

        if (localBars[j].value > localBars[j + 1].value) {
          swapped = true;
          localBars[j].status = 'swapping';
          localBars[j + 1].status = 'swapping';
          setBars([...localBars]);
          await sleep(250);

          [localBars[j], localBars[j + 1]] = [localBars[j + 1], localBars[j]];
          setBars([...localBars]);
          await sleep(250);
        }

        localBars[j].status = 'default';
        localBars[j + 1].status = 'default';
        setBars([...localBars]);
      }
      localBars[n - 1 - i].status = 'sorted';
      setBars([...localBars]);

      if (!swapped) {
        for(let k = 0; k < n; k++) {
            if(localBars[k].status !== 'sorted') localBars[k].status = 'sorted';
        }
        setBars([...localBars]);
        break;
      }
    }
    if (localBars.length > 0 && localBars[0].status !== 'sorted') {
      localBars[0].status = 'sorted';
    }
    setBars([...localBars]);
    onSortEnd();
  }, [initialBars, onSortStart, onSortEnd, setBars]);
  
  const runSelectionSort = useCallback(async () => {
    onSortStart();
    let localBars = [...initialBars];
    const n = localBars.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      localBars[minIndex].status = 'comparing';
      
      for (let j = i + 1; j < n; j++) {
        localBars[j].status = 'comparing';
        setBars([...localBars]);
        await sleep(100);

        if (localBars[j].value < localBars[minIndex].value) {
          localBars[minIndex].status = 'default';
          minIndex = j;
          localBars[minIndex].status = 'comparing';
        } else {
          localBars[j].status = 'default';
        }
        setBars([...localBars]);
      }

      if (minIndex !== i) {
        localBars[i].status = 'swapping';
        localBars[minIndex].status = 'swapping';
        setBars([...localBars]);
        await sleep(300);

        [localBars[i], localBars[minIndex]] = [localBars[minIndex], localBars[i]];
        await sleep(300);
      }
      
      localBars[minIndex].status = 'default';
      localBars[i].status = 'sorted';
      setBars([...localBars]);
    }
    if (n > 0) localBars[n - 1].status = 'sorted';
    setBars([...localBars]);
    onSortEnd();
  }, [initialBars, onSortStart, onSortEnd, setBars]);

  const runInsertionSort = useCallback(async () => {
    onSortStart();
    let localBars = [...initialBars];
    const n = localBars.length;

    for (let i = 1; i < n; i++) {
      let key = localBars[i];
      let j = i - 1;
      
      key.status = 'comparing';
      setBars([...localBars]);
      await sleep(200);

      while (j >= 0 && localBars[j].value > key.value) {
        localBars[j+1].status = 'swapping';
        localBars[j].status = 'swapping';
        setBars([...localBars]);
        await sleep(200);

        localBars[j + 1] = localBars[j];
        
        localBars[j+1].status = 'default';
        localBars[j].status = 'default';
        setBars([...localBars]);
        await sleep(200);
        j--;
      }
      localBars[j + 1] = key;
      key.status = 'default';
      setBars([...localBars]);
    }

    localBars.forEach(bar => bar.status = 'sorted');
    setBars([...localBars]);
    onSortEnd();
  }, [initialBars, onSortStart, onSortEnd, setBars]);

  const runMergeSort = useCallback(async () => {
    onSortStart();
    let localBars = [...initialBars];

    const merge = async (arr: Bar[], l: number, m: number, r: number) => {
      const n1 = m - l + 1;
      const n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

      for (let p = l; p <= r; p++) arr[p].status = 'comparing';
      setBars([...arr]);
      await sleep(300);

      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        if (L[i].value <= R[j].value) {
          arr[k] = L[i]; i++;
        } else {
          arr[k] = R[j]; j++;
        }
        arr[k].status = 'swapping';
        setBars([...arr]);
        await sleep(150);
        k++;
      }
      while (i < n1) {
        arr[k] = L[i];
        arr[k].status = 'swapping';
        setBars([...arr]);
        await sleep(150);
        i++; k++;
      }
      while (j < n2) {
        arr[k] = R[j];
        arr[k].status = 'swapping';
        setBars([...arr]);
        await sleep(150);
        j++; k++;
      }
      for (let p = l; p <= r; p++) arr[p].status = 'default';
      setBars([...arr]);
    };

    const mergeSortHelper = async (arr: Bar[], l: number, r: number) => {
      if (l >= r) return;
      const m = l + Math.floor((r - l) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    };

    await mergeSortHelper(localBars, 0, localBars.length - 1);
    localBars.forEach(bar => bar.status = 'sorted');
    setBars([...localBars]);
    onSortEnd();
  }, [initialBars, onSortStart, onSortEnd, setBars]);

  const runSort = () => {
    switch (selectedAlgorithm) {
      case 'bubble': runBubbleSort(); break;
      case 'selection': runSelectionSort(); break;
      case 'insertion': runInsertionSort(); break;
      case 'merge': runMergeSort(); break;
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-brand-text-secondary mb-2">Choose an Algorithm:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ALGORITHMS.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setSelectedAlgorithm(id)}
              disabled={isSorting}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedAlgorithm === id
                  ? 'bg-brand-accent text-white shadow-lg'
                  : 'bg-brand-secondary hover:bg-opacity-80'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-grow w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={isSorting}
            placeholder="e.g., 5, 3, 8, 4, 2"
            className="w-full px-4 py-2 bg-brand-bg border border-brand-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-shadow"
          />
          {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
        </div>
        <button
          onClick={parseAndSetArray}
          disabled={isSorting}
          className="w-full sm:w-auto px-5 py-2 bg-brand-secondary text-brand-text font-semibold rounded-lg hover:bg-opacity-80 disabled:bg-brand-secondary/50 disabled:cursor-not-allowed transition-colors"
        >
          Set Array
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={runSort}
          disabled={isSorting}
          className="flex-1 px-5 py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-opacity-90 disabled:bg-brand-accent/50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          Run Sort
        </button>
        <button
          onClick={onReset}
          disabled={isSorting}
          className="flex-1 px-5 py-3 bg-brand-secondary text-brand-text font-bold rounded-lg hover:bg-opacity-90 disabled:bg-brand-secondary/50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};