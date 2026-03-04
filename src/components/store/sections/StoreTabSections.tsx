import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import CategoryTab from '@/components/common/Category/CategoryTab';
import { ContentState } from '@/components/common/State/ContentState';
import { colors, typography } from '@/theme';
import type { MemberCoupon, PointHistory, RewardCoupon } from '@/services/rewardService';
import DownIcon from '@/assets/icons/DownIcon.svg';

type StoreCategoryItem = { key: string; label: string };

interface StoreProductsSectionProps {
  pointCard: ReactNode;
  storeCategory: string;
  storeCategories: StoreCategoryItem[];
  onSelectCategory: (category: string) => void;
  couponsLoading: boolean;
  rewardCoupons: RewardCoupon[];
  renderProductCard: (product: RewardCoupon) => ReactNode;
}

export function StoreProductsSection({
  pointCard,
  storeCategory,
  storeCategories,
  onSelectCategory,
  couponsLoading,
  rewardCoupons,
  renderProductCard,
}: StoreProductsSectionProps) {
  return (
    <View style={{ paddingTop: 18, gap: 37.5 }}>
      <View style={{ paddingHorizontal: 20 }}>{pointCard}</View>

      <View style={{ gap: 28.5 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <CategoryTab
            selected={storeCategory}
            onSelect={onSelectCategory}
            categories={storeCategories}
            variant="store"
            dividerAfterIndex={2}
          />
        </View>

        <View style={{ gap: 12 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.h3Bold,
                color: colors.coolNeutral[90],
              }}
            >
              {storeCategories.find((c) => c.key === storeCategory)?.label ?? '전체'}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, gap: 16 }}>
            {couponsLoading ? (
              <ContentState variant="loading" message="불러오는 중..." />
            ) : rewardCoupons.length === 0 ? (
              <ContentState variant="empty" message="상품이 없습니다" />
            ) : (
              Array.from({ length: Math.ceil(rewardCoupons.length / 2) }).map((_, rowIndex) => {
                const product1 = rewardCoupons[rowIndex * 2];
                const product2 = rewardCoupons[rowIndex * 2 + 1];

                return (
                  <View key={rowIndex} style={{ flexDirection: 'row', gap: 19 }}>
                    {product1 ? renderProductCard(product1) : <View style={{ flex: 1 }} />}
                    {product2 ? renderProductCard(product2) : <View style={{ flex: 1 }} />}
                  </View>
                );
              })
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

interface StorePointHistorySectionProps {
  pointCard: ReactNode;
  historyTotalCount: number;
  pointHistories: PointHistory[];
  visibleHistoryCount: number;
  onMoreHistory: () => void;
  renderHistoryCard: (item: PointHistory, index: number) => ReactNode;
}

export function StorePointHistorySection({
  pointCard,
  historyTotalCount,
  pointHistories,
  visibleHistoryCount,
  onMoreHistory,
  renderHistoryCard,
}: StorePointHistorySectionProps) {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 18, gap: 30 }}>
      {pointCard}

      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.coolNeutral[90],
            }}
          >
            전체
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.primary[50],
            }}
          >
            {historyTotalCount}건
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {pointHistories.length === 0 ? (
            <ContentState variant="empty" message="포인트 내역이 없습니다" />
          ) : (
            pointHistories
              .slice(0, visibleHistoryCount)
              .map((item, index) => renderHistoryCard(item, index))
          )}
        </View>

        {visibleHistoryCount < pointHistories.length ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="more"
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 }}
            onPress={onMoreHistory}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body3Regular,
                color: colors.coolNeutral[50],
              }}
            >
              더보기
            </Text>
            <DownIcon width={16} height={16} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

interface StoreCouponSectionProps {
  pointCard: ReactNode;
  couponTotalCount: number;
  memberCoupons: MemberCoupon[];
  visibleCouponCount: number;
  onMoreCoupons: () => void;
  renderCouponCard: (coupon: MemberCoupon) => ReactNode;
}

export function StoreCouponSection({
  pointCard,
  couponTotalCount,
  memberCoupons,
  visibleCouponCount,
  onMoreCoupons,
  renderCouponCard,
}: StoreCouponSectionProps) {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 18, gap: 30 }}>
      {pointCard}

      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.coolNeutral[90],
            }}
          >
            보유쿠폰
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Bold,
              color: colors.primary[50],
            }}
          >
            {couponTotalCount}개
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {memberCoupons.length === 0 ? (
            <ContentState variant="empty" message="보유 쿠폰이 없습니다" />
          ) : (
            memberCoupons.slice(0, visibleCouponCount).map((coupon) => renderCouponCard(coupon))
          )}
        </View>

        {visibleCouponCount < memberCoupons.length ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="more-coupons"
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 }}
            onPress={onMoreCoupons}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body3Regular,
                color: colors.coolNeutral[50],
              }}
            >
              더보기
            </Text>
            <DownIcon width={16} height={16} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
