import { Pressable, View } from 'react-native';
import { colors } from '@/theme';
import { NavigationBar } from '@/components/common/Bar/NavigationBar';
import { Toast } from '@/components/common/Toast/Toast';
import BPlusIcon from '@/assets/icons/bplus.svg';
import type { CategoryKey } from '@/constants/categories';
import type { NavigationTab } from '@/utils/navigation';

interface CoinBottomSectionProps {
  selectedTab: string;
  isDaySelected: boolean;
  calendarExpenseItemsLength: number;
  selectedDateString: string;
  isExpenseToastVisible: boolean;
  onOpenAddExpenseWithDate: (date: string) => void;
  onOpenCarSelect: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onToastGoToExpense: () => void;
  onDismissToast: () => void;
}

export function CoinBottomSection({
  selectedTab,
  isDaySelected,
  calendarExpenseItemsLength,
  selectedDateString,
  isExpenseToastVisible,
  onOpenAddExpenseWithDate,
  onOpenCarSelect,
  onNavigateTab,
  onToastGoToExpense,
  onDismissToast,
}: CoinBottomSectionProps) {
  return (
    <>
      {!(selectedTab === 'calendar' && isDaySelected && calendarExpenseItemsLength === 0) && (
        <Pressable
          onPress={
            selectedTab === 'calendar' && isDaySelected
              ? () => onOpenAddExpenseWithDate(selectedDateString)
              : onOpenCarSelect
          }
          accessibilityRole="button"
          accessibilityLabel="지출내역 추가"
          style={{
            position: 'absolute',
            right: 20,
            bottom: 100,
            zIndex: 100,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <BPlusIcon width={56} height={56} />
        </Pressable>
      )}

      <View style={{ width: '100%', backgroundColor: colors.coolNeutral[10] }}>
        <View style={{}}>
          <NavigationBar
            active="coin"
            showBorder
            onPress={onNavigateTab}
          />
        </View>
      </View>

      <Toast
        visible={isExpenseToastVisible}
        message="지출내역이 추가되었어요!"
        actionLabel="보러가기"
        onAction={onToastGoToExpense}
        onDismiss={onDismissToast}
        duration={5000}
      />
    </>
  );
}
