export type BarStatus = 'default' | 'comparing' | 'swapping' | 'sorted';

export interface Bar {
  value: number;
  status: BarStatus;
  id: string; // For stable React keys
}

export type Algorithm = 'bubble' | 'selection' | 'insertion' | 'merge';
