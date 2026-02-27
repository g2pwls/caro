import { Alert } from 'react-native';
import { useCallback } from 'react';
import type { ExpenseCategory } from '@/types/expense';
import type { PrimaryCar } from '@/types/profile';

interface UseCoinExpenseSubmitParams {
  isAddEnabled: boolean;
  accessToken: string | null;
  selectedCar: PrimaryCar | null;
  addDate: string;
  addAmount: string;
  addCategory: ExpenseCategory;
  addPlace: string;
  addMemo: string;
  editingExpenseId: number | null;
  isUpdating: boolean;
  isCreating: boolean;
  parseKoreanDateToIso: (value: string) => string;
  updateExpense: (params: {
    expenseId: number;
    request: {
      expenseDate: string;
      amount: number;
      category: ExpenseCategory;
      location: string;
      memo: string;
    };
  }) => Promise<boolean>;
  createExpense: (params: {
    request: {
      memberCarId: number;
      expenseDate: string;
      amount: number;
      category: ExpenseCategory;
      location: string;
      memo: string;
    };
  }) => Promise<boolean>;
  getUpdateError: () => string | null;
  getCreateError: () => string | null;
  closeAddExpenseModal: (options?: { resetForm?: boolean; clearEditing?: boolean }) => void;
  refreshExpenseData: () => void;
  setIsExpenseToastVisible: (visible: boolean) => void;
}

export function useCoinExpenseSubmit({
  isAddEnabled,
  accessToken,
  selectedCar,
  addDate,
  addAmount,
  addCategory,
  addPlace,
  addMemo,
  editingExpenseId,
  isUpdating,
  isCreating,
  parseKoreanDateToIso,
  updateExpense,
  createExpense,
  getUpdateError,
  getCreateError,
  closeAddExpenseModal,
  refreshExpenseData,
  setIsExpenseToastVisible,
}: UseCoinExpenseSubmitParams) {
  return useCallback(async () => {
    if (!isAddEnabled || !accessToken || !selectedCar) return;

    const expenseDate = parseKoreanDateToIso(addDate);
    if (!expenseDate) {
      Alert.alert('오류', '날짜가 올바르지 않습니다.');
      return;
    }

    const amount = parseInt(addAmount.replace(/,/g, ''), 10) || 0;

    if (editingExpenseId) {
      if (isUpdating) return;
      const success = await updateExpense({
        expenseId: editingExpenseId,
        request: {
          expenseDate,
          amount,
          category: addCategory,
          location: addPlace,
          memo: addMemo,
        },
      });
      if (success) {
        closeAddExpenseModal({ resetForm: true, clearEditing: true });
        refreshExpenseData();
      } else {
        Alert.alert('오류', getUpdateError() || '지출 내역 수정에 실패했습니다.');
      }
      return;
    }

    if (isCreating) return;
    const success = await createExpense({
      request: {
        memberCarId: selectedCar.id,
        expenseDate,
        amount,
        category: addCategory,
        location: addPlace,
        memo: addMemo,
      },
    });
    if (success) {
      closeAddExpenseModal({ resetForm: true, clearEditing: true });
      refreshExpenseData();
      setIsExpenseToastVisible(true);
    } else {
      Alert.alert('오류', getCreateError() || '지출 내역 추가에 실패했습니다.');
    }
  }, [
    isAddEnabled,
    accessToken,
    selectedCar,
    parseKoreanDateToIso,
    addDate,
    addAmount,
    editingExpenseId,
    isUpdating,
    updateExpense,
    addCategory,
    addPlace,
    addMemo,
    closeAddExpenseModal,
    refreshExpenseData,
    getUpdateError,
    isCreating,
    createExpense,
    setIsExpenseToastVisible,
    getCreateError,
  ]);
}
