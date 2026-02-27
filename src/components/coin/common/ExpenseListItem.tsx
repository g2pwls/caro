import { Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import GRightIcon from '@/assets/icons/GRightIcon.svg';
import GCarIcon from '@/assets/icons/gcar.svg';
import { EXPENSE_CATEGORY_LABEL_MAP, renderExpenseCategoryIcon } from '@/components/coin/constants/expenseCategoryMeta';
import type { CoinExpenseItem } from '@/components/coin/types';

interface ExpenseListItemProps {
  item: CoinExpenseItem;
  isLast: boolean;
  accessibilityLabelPrefix: 'expense' | 'calendar-expense';
  onPress: (id: string) => void;
}

export function ExpenseListItem({
  item,
  isLast,
  accessibilityLabelPrefix,
  onPress,
}: ExpenseListItemProps) {
  return (
    <Pressable
      key={item.id}
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      accessibilityLabel={`${accessibilityLabelPrefix}-${item.id}`}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        ...(isLast
          ? {}
          : {
              borderBottomWidth: 1,
              borderBottomColor: colors.coolNeutral[30],
            }),
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: borderRadius.full,
          backgroundColor: colors.background.default,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderExpenseCategoryIcon(item.category)}
      </View>

      <View style={{ flex: 1, gap: 6 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.body2Semibold,
              color: colors.coolNeutral[90],
            }}
          >
            {item.title}
          </Text>

          <GRightIcon width={24} height={24} />
        </View>

        <View style={{ gap: 4 }}>
          {item.carInfo && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <GCarIcon width={14} height={14} />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.captionSemibold,
                  color: colors.coolNeutral[40],
                }}
              >
                {item.carInfo}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {item.note ? (
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.captionMedium,
                  color: colors.primary[30],
                }}
              >
                {item.note}
              </Text>
            ) : (
              <View style={{ flex: 1 }} />
            )}

            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Bold,
                color: colors.primary[50],
              }}
            >
              {item.amount.toLocaleString('ko-KR')}원
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.captionMedium,
                color: colors.coolNeutral[40],
              }}
            >
              {EXPENSE_CATEGORY_LABEL_MAP[item.category]}
            </Text>

            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.captionMedium,
                color: colors.coolNeutral[40],
              }}
            >
              {item.date}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
