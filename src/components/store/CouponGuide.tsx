import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { colors, typography, borderRadius } from '@/theme';
import DownIcon from '@/assets/icons/DownIcon.svg';
import UpIcon from '@/assets/icons/UpIcon.svg';
import OneIcon from '@/assets/icons/one.svg';
import TwoIcon from '@/assets/icons/two.svg';
import ThreeIcon from '@/assets/icons/three.svg';
import FourIcon from '@/assets/icons/four.svg';
import BlueDotIcon from '@/assets/icons/bluedot.svg';

const COUPON_INFO_BULLETS = [
  '포인트로 교환하면 모바일 쿠폰으로 바로 지급돼요.',
  '교환 완료 후에는 취소나 환불이 어려워요.',
  '쿠폰은 발급일 기준 30일 동안 사용 가능해요.',
  '일부 매장에서는 사용이 제한될 수 있어요.',
  '매장 상황에 따라 조기 품절될 수 있어요.',
] as const;

const COUPON_USAGE_STEPS = [
  "'교환하기' 버튼을 눌러주세요.",
  '마이페이지 > 내 쿠폰함에서 확인!',
  '매장에서 직원에게 쿠폰 화면 보여주기',
  '바코드 스캔 후 바로 사용 완료!',
] as const;

const COUPON_CAUTION_BULLETS = [
  '쿠폰은 다른 사람에게 양도할 수 없어요.',
  '사용하지 않은 쿠폰은 재발급되지 않아요.',
  '네트워크 문제로 발급이 늦어질 수 있어요.',
  '현금으로 바꿀 수 없어요.',
  '운영 정책에 따라 내용이 바뀔 수 있어요.',
] as const;

const COMPACT_USAGE_GUIDE_BULLETS = [
  '결제 시 바코드를 제시해주세요.',
  '다른 쿠폰과 중복 사용 불가해요',
  '유효기간 경과 시 자동 소멸 되어요.',
] as const;

function NumberIcon({ number }: { number: number }) {
  if (number === 1) return <OneIcon width={16} height={16} />;
  if (number === 2) return <TwoIcon width={16} height={16} />;
  if (number === 3) return <ThreeIcon width={16} height={16} />;
  if (number === 4) return <FourIcon width={16} height={16} />;
  return <OneIcon width={16} height={16} />;
}

function BulletItem({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          fontFamily: typography.fontFamily.pretendard,
          ...typography.styles.body3Medium,
          color: colors.coolNeutral[40],
          flex: 1,
        }}
      >
        •  {text}
      </Text>
    </View>
  );
}

function NumberedItem({ number, text }: { number: number; text: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <NumberIcon number={number} />
      <Text
        style={{
          fontFamily: typography.fontFamily.pretendard,
          ...typography.styles.body3Medium,
          color: colors.coolNeutral[40],
          flex: 1,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={{ gap: 20 }}>
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.coolNeutral[30],
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.body2Bold,
            color: colors.coolNeutral[80],
          }}
        >
          {title}
        </Text>
        {isOpen ? <UpIcon width={20} height={20} /> : <DownIcon width={20} height={20} />}
      </Pressable>
      {isOpen ? <View>{children}</View> : null}
    </View>
  );
}

export function StoreDetailCouponGuide() {
  return (
    <View style={{ gap: 24 }}>
      <AccordionSection title="쿠폰 및 이용 안내" defaultOpen>
        <View style={{ gap: 12 }}>
          {COUPON_INFO_BULLETS.map((text) => (
            <BulletItem key={text} text={text} />
          ))}
        </View>
      </AccordionSection>

      <AccordionSection title="쿠폰 사용 방법" defaultOpen>
        <View style={{ gap: 12 }}>
          {COUPON_USAGE_STEPS.map((text, index) => (
            <NumberedItem key={text} number={index + 1} text={text} />
          ))}
        </View>
      </AccordionSection>

      <AccordionSection title="사용 전 꼭 확인해주세요!" defaultOpen>
        <View style={{ gap: 12 }}>
          {COUPON_CAUTION_BULLETS.map((text) => (
            <BulletItem key={text} text={text} />
          ))}
        </View>
      </AccordionSection>
    </View>
  );
}

export function CompactCouponUsageGuide({
  expanded,
  onExpand,
  onCollapse,
}: {
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  if (!expanded) {
    return (
      <Pressable
        onPress={onExpand}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.body3Medium,
            color: colors.coolNeutral[50],
          }}
        >
          사용 안내
        </Text>
        <DownIcon width={16} height={16} />
      </Pressable>
    );
  }

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          backgroundColor: colors.coolNeutral[20],
          borderRadius: borderRadius.lg,
          padding: 20,
          gap: 8,
        }}
      >
        {COMPACT_USAGE_GUIDE_BULLETS.map((text) => (
          <View key={text} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <BlueDotIcon width={4} height={4} />
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body3Regular,
                color: colors.coolNeutral[50],
              }}
            >
              {text}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onCollapse}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.body3Medium,
            color: colors.coolNeutral[50],
          }}
        >
          접기
        </Text>
        <UpIcon width={16} height={16} />
      </Pressable>
    </View>
  );
}
