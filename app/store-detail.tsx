import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { borderRadius, colors, typography } from '@/theme';
import { NavigationBar } from '@/components/common/Bar/NavigationBar';
import { MainButton } from '@/components/common/Button/MainButton';
import { OverlayModal } from '@/components/common/Modal/OverlayModal';
import { StoreDetailCouponGuide } from '@/components/store/CouponGuide';
import { Toast } from '@/components/common/Toast';
import { useMemberPoints } from '@/hooks/store/useMemberPoints';
import { useAuthStore } from '@/stores/authStore';
import { exchangeCoupon } from '@/services/rewardService';
import { getTabRoute } from '@/utils/navigation';
import { formatPointNumber, formatPointTotal } from '@/utils/points';
import { toRewardImageUrl } from '@/utils/rewardImage';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import PointIcon from '@/assets/icons/point.svg';
import Coffee1Icon from '@/assets/icons/coffee1.svg';

export default function StoreDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { accessToken } = useAuthStore();
  const { availablePoints: userPoint, reload: reloadMemberPoints } = useMemberPoints({ accessToken });

  // URL 파라미터에서 상품 정보 가져오기
  const productId = params.id as string;
  const productBrand = (params.brand as string) || '스타벅스';
  const productName = (params.name as string) || '[스타벅스] 아이스 아메리카노 Tall 모바일 교환권';
  const productPrice = Number(params.price) || 11000;
  const productImageUrl = params.imageUrl as string | undefined;

  // 포인트 충분 여부
  const hasEnoughPoints = userPoint >= productPrice;

  // 교환 확인 팝업
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);

  const handleExchange = async () => {
    setIsExchanging(true);
    try {
      await exchangeCoupon(Number(productId));
      setIsExchangeModalOpen(false);
      setIsToastVisible(true);
      // 포인트 갱신
      await reloadMemberPoints();
    } catch (err: any) {
      setIsExchangeModalOpen(false);
      console.warn('쿠폰 교환 실패:', err);
      console.warn('응답 데이터:', err?.response?.data);
      console.warn('요청 데이터:', err?.config?.data);
    } finally {
      setIsExchanging(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.coolNeutral[10] }}>
      {/* 교환 확인 팝업 */}
      <OverlayModal
        visible={isExchangeModalOpen}
        onBackdropPress={() => setIsExchangeModalOpen(false)}
        contentStyle={{
          backgroundColor: colors.coolNeutral[10],
          borderRadius: 20,
          paddingTop: 32,
          paddingBottom: 20,
          paddingHorizontal: 20,
          width: '85%',
          maxWidth: 340,
          alignItems: 'center',
          gap: 20,
        }}
      >
            {/* 포인트 + 제목 + 안내 문구 묶음 */}
            <View style={{ alignItems: 'center', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <PointIcon width={20} height={20} />
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Bold,
                    color: colors.coolNeutral[90],
                  }}
                >
                  {formatPointTotal(productPrice)}를
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Bold,
                  color: colors.coolNeutral[80],
                }}
              >
                쿠폰으로 교환하시겠어요?
              </Text>

              {/* 안내 문구 */}
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body3Medium,
                  color: colors.coolNeutral[40],
                  textAlign: 'center',
                  lineHeight: 22,
                }}
              >
                {formatPointNumber(productPrice)}P가 차감되고 쿠폰이 바로 지급돼요.{'\n'}
                교환 후에는 취소가 불가능해요.
              </Text>
            </View>

            {/* 버튼 영역 */}
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              {/* 취소 버튼 */}
              <Pressable
                onPress={() => setIsExchangeModalOpen(false)}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.coolNeutral[20],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Semibold,
                    color: colors.coolNeutral[50],
                  }}
                >
                  취소할래요
                </Text>
              </Pressable>

              {/* 교환 버튼 */}
              <Pressable
                onPress={handleExchange}
                disabled={isExchanging}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: borderRadius.md,
                  backgroundColor: isExchanging ? colors.coolNeutral[30] : colors.primary[50],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Semibold,
                    color: colors.coolNeutral[10],
                  }}
                >
                  {isExchanging ? '교환 중...' : '교환하기'}
                </Text>
              </Pressable>
            </View>
      </OverlayModal>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100, gap: 28 }}>
        {/* 헤더 */}
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: colors.coolNeutral[30],
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ width: 24, height: 24, justifyContent: 'center' }}
            accessibilityRole="button"
            accessibilityLabel="back"
          >
            <ArrowLeftIcon width={24} height={24} />
          </Pressable>

          {/* 포인트 표시 */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 }}>
            <PointIcon width={14} height={14} />
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body1Bold,
                color: colors.coolNeutral[60],
              }}
            >
              {formatPointTotal(userPoint)}
            </Text>
          </View>
        </View>

        {/* 상품 이미지 + 상품 정보 영역 */}
        <View style={{ gap: 28 }}>
          {/* 상품 이미지 */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {productImageUrl ? (
              <Image
                source={{ uri: toRewardImageUrl(productImageUrl) }}
                style={{ width: 257, height: 257 }}
                resizeMode="contain"
              />
            ) : (
              <Coffee1Icon width={257} height={257} />
            )}
          </View>

          {/* 상품 정보 + 버튼 + 아코디언 영역 */}
          <View style={{ paddingHorizontal: 20, gap: 24 }}>
            {/* 상품 정보 */}
            <View style={{ gap: 8, paddingTop: 24, paddingBottom: 20 }}>
              {/* 브랜드명 */}
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Medium,
                  color: colors.coolNeutral[50],
                }}
              >
                {productBrand}
              </Text>

              {/* 상품명 */}
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.h2Semibold,
                  color: colors.coolNeutral[90],
                  lineHeight: 26,
                }}
              >
                {productName}
              </Text>

              {/* 가격 */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <PointIcon width={20} height={20} />
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.h1Bold,
                    color: colors.coolNeutral[90],
                  }}
                >
                  {formatPointTotal(productPrice)}
                </Text>
              </View>
            </View>

            {/* 버튼 + 아코디언 영역 */}
            <View style={{ gap: 47 }}>
          {/* 교환 버튼 */}
          <MainButton
            label={hasEnoughPoints ? '포인트로 교환하기' : '포인트가 부족해요'}
            disabled={!hasEnoughPoints}
            alwaysPrimary={hasEnoughPoints}
            onPress={() => setIsExchangeModalOpen(true)}
            containerStyle={{
              width: '100%',
              height: 52,
              backgroundColor: hasEnoughPoints ? colors.primary[50] : colors.coolNeutral[20],
            }}
            labelStyle={{
              ...typography.styles.body1Bold,
              color: hasEnoughPoints ? colors.background.default : colors.coolNeutral[40],
            }}
          />

          {/* 아코디언 섹션들 */}
          <StoreDetailCouponGuide />
            </View>
          </View>
        </View>
      </ScrollView>

      <Toast
        message="교환 완료! 쿠폰이 저장됐어요."
        visible={isToastVisible}
        actionLabel="보러가기"
        onAction={() => {
          setIsToastVisible(false);
          router.push({ pathname: '/store', params: { tab: 'coupon' } });
        }}
        onDismiss={() => setIsToastVisible(false)}
      />

      <NavigationBar
        active="store"
        showBorder
        onPress={(tab) => router.push(getTabRoute(tab))}
      />
    </SafeAreaView>
  );
}
