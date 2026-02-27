import type { ReactNode } from 'react';
import type { CategoryKey } from '@/constants/categories';
import OilingIcon from '@/assets/icons/oiling.svg';
import ParkingIcon from '@/assets/icons/parking.svg';
import InsuranceIcon from '@/assets/icons/insurance.svg';
import TollIcon from '@/assets/icons/toll.svg';
import MaintenanceIcon from '@/assets/icons/maintenance.svg';
import CarwashIcon from '@/assets/icons/carwash.svg';
import ExpendablesIcon from '@/assets/icons/expendables.svg';

type ExpenseCategoryKey = Exclude<CategoryKey, 'ALL'>;

export const EXPENSE_CATEGORY_LABEL_MAP: Record<ExpenseCategoryKey, string> = {
  FUEL: '주유비',
  PARKING: '주차비',
  REPAIR: '정비·수리비',
  TOLL: '통행료',
  CAR_WASH: '세차비',
  INSURANCE: '보험료',
  ACCESSORY: '자동차 용품비',
};

const CATEGORY_LABEL_MAP: Record<CategoryKey, string> = {
  ALL: '전체',
  ...EXPENSE_CATEGORY_LABEL_MAP,
};

export function getCategoryLabel(category: CategoryKey): string {
  return CATEGORY_LABEL_MAP[category];
}

export function renderExpenseCategoryIcon(category: ExpenseCategoryKey): ReactNode {
  if (category === 'FUEL') return <OilingIcon width={24} height={24} />;
  if (category === 'PARKING') return <ParkingIcon width={24} height={24} />;
  if (category === 'INSURANCE') return <InsuranceIcon width={24} height={24} />;
  if (category === 'TOLL') return <TollIcon width={24} height={24} />;
  if (category === 'REPAIR') return <MaintenanceIcon width={24} height={24} />;
  if (category === 'CAR_WASH') return <CarwashIcon width={24} height={24} />;
  return <ExpendablesIcon width={24} height={24} />;
}
