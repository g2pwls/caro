import { useCallback, useEffect } from 'react';
import type { CategoryKey } from '@/constants/categories';
import type { ExpenseCategory } from '@/types/expense';
import { toYearMonth } from '@/utils/date';

type CoinTab = 'calendar' | 'expense';

interface UseCoinExpenseDataParams {
  accessToken: string | null;
  selectedTab: CoinTab;
  selectedCategory: CategoryKey;
  calendarSelectedCategory: CategoryKey;
  currentYear: number;
  currentMonthIndex: number;
  categoriesLength: number;
  addCategory: ExpenseCategory;
  setAddCategory: (category: ExpenseCategory) => void;
  fetchExpenses: (params: {
    yearMonth?: string;
    category?: ExpenseCategory;
    size?: number;
  }) => Promise<void> | void;
  fetchSummary: (params: { yearMonth?: string }) => Promise<void> | void;
  fetchCategories: () => Promise<void> | void;
  mapUiCategoryToApi: (category: CategoryKey) => ExpenseCategory | undefined;
  categories: Array<{ category: ExpenseCategory }>;
}

export function useCoinExpenseData({
  accessToken,
  selectedTab,
  selectedCategory,
  calendarSelectedCategory,
  currentYear,
  currentMonthIndex,
  categoriesLength,
  addCategory,
  setAddCategory,
  fetchExpenses,
  fetchSummary,
  fetchCategories,
  mapUiCategoryToApi,
  categories,
}: UseCoinExpenseDataParams) {
  const refreshExpenseData = useCallback(() => {
    const yearMonth = toYearMonth(currentYear, currentMonthIndex + 1);
    fetchExpenses({ yearMonth, size: 100 });
    if (selectedTab === 'expense') {
      fetchSummary({});
    } else {
      fetchSummary({ yearMonth });
    }
  }, [currentYear, currentMonthIndex, fetchExpenses, fetchSummary, selectedTab]);

  useEffect(() => {
    if (!accessToken) return;
    if (selectedTab === 'expense') {
      fetchExpenses({
        category: mapUiCategoryToApi(selectedCategory),
      });
      return;
    }
    const yearMonth = toYearMonth(currentYear, currentMonthIndex + 1);
    fetchExpenses({
      category: mapUiCategoryToApi(calendarSelectedCategory),
      yearMonth,
      size: 100,
    });
  }, [
    accessToken,
    selectedTab,
    selectedCategory,
    calendarSelectedCategory,
    currentYear,
    currentMonthIndex,
    fetchExpenses,
    mapUiCategoryToApi,
  ]);

  useEffect(() => {
    if (!accessToken) return;
    if (selectedTab === 'expense') {
      fetchSummary({});
      return;
    }
    const yearMonth = toYearMonth(currentYear, currentMonthIndex + 1);
    fetchSummary({ yearMonth });
  }, [accessToken, selectedTab, currentYear, currentMonthIndex, fetchSummary]);

  useEffect(() => {
    if (accessToken && categoriesLength === 0) {
      fetchCategories();
    }
  }, [accessToken, categoriesLength, fetchCategories]);

  useEffect(() => {
    if (categories.length > 0 && !categories.find((c) => c.category === addCategory)) {
      setAddCategory(categories[0].category);
    }
  }, [categories, addCategory, setAddCategory]);

  return { refreshExpenseData };
}
