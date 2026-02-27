import type { CategoryKey } from '@/constants/categories';

export type CoinExpenseItem = {
  id: string;
  category: Exclude<CategoryKey, 'ALL'>;
  title: string;
  note?: string;
  date: string;
  amount: number;
  carInfo?: string;
};
