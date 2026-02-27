import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import CategoryTab from '@/components/common/Category/CategoryTab';
import type { CategoryKey } from '@/constants/categories';
import DownIcon from '@/assets/icons/DownIcon.svg';
import UpIcon from '@/assets/icons/UpIcon.svg';
import { ExpenseListItem } from '@/components/coin/common/ExpenseListItem';
import type { CoinExpenseItem } from '@/components/coin/types';

interface CoinExpenseSectionProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (key: CategoryKey) => void;
  apiCategoryItems:
    | {
        key: CategoryKey;
        label: string;
      }[]
    | undefined;
  selectedCategoryLabel: string;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  expenseItems: CoinExpenseItem[];
  displayedExpenseItems: CoinExpenseItem[];
  onExpensePress: (id: string) => void;
  isExpenseListExpanded: boolean;
  onToggleExpenseList: () => void;
}

export function CoinExpenseSection({
  selectedCategory,
  onSelectCategory,
  apiCategoryItems,
  selectedCategoryLabel,
  totalCount,
  isLoading,
  error,
  expenseItems,
  displayedExpenseItems,
  onExpensePress,
  isExpenseListExpanded,
  onToggleExpenseList,
}: CoinExpenseSectionProps) {
  return (
    <View style={{ width: '100%', backgroundColor: colors.coolNeutral[10] }}>
      <View style={{ paddingLeft: 20, paddingVertical: 32 }}>
        <CategoryTab selected={selectedCategory} onSelect={onSelectCategory} categories={apiCategoryItems} />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.coolNeutral[90],
            }}
          >
            {selectedCategoryLabel}
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.primary[50],
            }}
          >
            {totalCount}건
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.coolNeutral[10] }}>
        {isLoading ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary[50]} />
          </View>
        ) : error ? (
          <View style={{ paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Medium,
                color: colors.coolNeutral[60],
                textAlign: 'center',
              }}
            >
              {error}
            </Text>
          </View>
        ) : expenseItems.length === 0 ? (
          <View style={{ paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Medium,
                color: colors.coolNeutral[60],
                textAlign: 'center',
              }}
            >
              지출 내역이 없습니다.
            </Text>
          </View>
        ) : (
          displayedExpenseItems.map((item, idx) => {
            const isLast = idx === displayedExpenseItems.length - 1;
            return (
              <ExpenseListItem
                item={item}
                isLast={isLast}
                accessibilityLabelPrefix="expense"
                onPress={onExpensePress}
              />
            );
          })
        )}
      </View>

      {expenseItems.length > 5 && (
        <Pressable
          onPress={onToggleExpenseList}
          accessibilityRole="button"
          accessibilityLabel="expense-list-toggle"
          style={{
            backgroundColor: colors.coolNeutral[10],
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: colors.coolNeutral[30],
          }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.body3Medium,
              color: colors.coolNeutral[50],
            }}
          >
            {isExpenseListExpanded ? '접기' : '더보기'}
          </Text>
          {isExpenseListExpanded ? <UpIcon width={22} height={22} /> : <DownIcon width={22} height={22} />}
        </Pressable>
      )}
    </View>
  );
}
