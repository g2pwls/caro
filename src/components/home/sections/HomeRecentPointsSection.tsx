import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import type { PointHistory } from '@/services/rewardService';
import { StorePointHistoryCard } from '@/components/store/cards/StorePointHistoryCard';
import RightIcon from '@/assets/icons/RightIcon.svg';

interface HomeRecentPointsSectionProps {
  pointHistories: PointHistory[];
  onPressMore: () => void;
}

export function HomeRecentPointsSection({
  pointHistories,
  onPressMore,
}: HomeRecentPointsSectionProps) {
  return (
    <View style={{ gap: 16, paddingVertical: 24, paddingHorizontal: 20, marginHorizontal: -20, marginTop: -24 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="recent-points"
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        onPress={onPressMore}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.h3Bold,
            color: colors.coolNeutral[90],
          }}
        >
          최근 포인트
        </Text>
        <RightIcon width={20} height={20} />
      </Pressable>

      <View style={{ gap: 12 }}>
        {pointHistories.slice(0, 5).map((item, index) => (
          <StorePointHistoryCard key={`${item.date}-${index}`} item={item} />
        ))}
      </View>
    </View>
  );
}
