import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import CouponTab from '@/components/common/Category/CouponTab';
import { MainButton } from '@/components/common/Button/MainButton';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import DownIcon from '@/assets/icons/DownIcon.svg';
import UpIcon from '@/assets/icons/UpIcon.svg';
import UpGraphIcon from '@/assets/icons/upgraph.svg';
import RGraphIcon from '@/assets/icons/rgraph.svg';
import GGraphIcon from '@/assets/icons/ggraph.svg';

interface SummaryCategoryItem {
  label: string;
  value: string;
}

interface CoinHeaderSummarySectionProps {
  tabs: { id: string; label: string }[];
  selectedTab: string;
  onTabChange: (tabId: string) => void;
  isMonthlySummaryExpanded: boolean;
  onToggleMonthlySummary: () => void;
  isSummaryLoading: boolean;
  summaryMonthLabel: string;
  summaryTotalAmountLabel: string;
  summaryPeriodLabel: string | null;
  summaryStartYearMonthLabel: string | null;
  summaryDifferenceLabel: string | null;
  summaryDifferenceValue: number | null;
  summaryCategoryItems: SummaryCategoryItem[];
  onBack: () => void;
  onAddExpense: () => void;
}

export function CoinHeaderSummarySection({
  tabs,
  selectedTab,
  onTabChange,
  isMonthlySummaryExpanded,
  onToggleMonthlySummary,
  isSummaryLoading,
  summaryMonthLabel,
  summaryTotalAmountLabel,
  summaryPeriodLabel,
  summaryStartYearMonthLabel,
  summaryDifferenceLabel,
  summaryDifferenceValue,
  summaryCategoryItems,
  onBack,
  onAddExpense,
}: CoinHeaderSummarySectionProps) {
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: colors.background.default,
        }}
      >
        <Pressable
          onPress={onBack}
          style={{ width: 24, height: 24, justifyContent: 'center' }}
          accessibilityRole="button"
          accessibilityLabel="back"
        >
          <ArrowLeftIcon width={24} height={24} />
        </Pressable>

        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.h3Semibold,
            color: colors.coolNeutral[90],
          }}
        >
          지출관리
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: colors.background.default,
        }}
      >
        <CouponTab tabs={tabs} selectedTab={selectedTab} onTabChange={onTabChange} />
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: selectedTab === 'expense' ? '#FFFFFF' : colors.background.default,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              width: '100%',
              backgroundColor: colors.coolNeutral[10],
              borderRadius: borderRadius.md,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Semibold,
                  color: colors.coolNeutral[80],
                }}
              >
                <Text style={{ color: colors.primary[50] }}>
                  {selectedTab === 'expense' && isMonthlySummaryExpanded ? '누적' : summaryMonthLabel}
                </Text>{' '}
                소비금액
              </Text>

              <Pressable
                onPress={onToggleMonthlySummary}
                accessibilityRole="button"
                accessibilityLabel="monthly-summary-toggle"
                style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}
              >
                {isMonthlySummaryExpanded ? (
                  <UpIcon width={20} height={20} />
                ) : (
                  <DownIcon width={20} height={20} />
                )}
              </Pressable>
            </View>

            {!isMonthlySummaryExpanded ? (
              isSummaryLoading ? (
                <ActivityIndicator size="small" color={colors.primary[50]} style={{ marginTop: 12 }} />
              ) : (
                <Text
                  style={{
                    marginTop: 12,
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.h1Bold,
                    color: colors.coolNeutral[90],
                  }}
                >
                  {summaryTotalAmountLabel}
                </Text>
              )
            ) : (
              <View style={{ marginTop: 16, gap: 12 }}>
                {selectedTab === 'expense' && summaryPeriodLabel ? (
                  <>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.coolNeutral[30],
                        opacity: 0.6,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: typography.fontFamily.pretendard,
                        ...typography.styles.body3Medium,
                        color: colors.coolNeutral[50],
                      }}
                    >
                      <Text style={{ color: colors.primary[50] }}>{summaryStartYearMonthLabel ?? ''}</Text>
                      {'부터 사용한 금액이에요.'}
                    </Text>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.coolNeutral[30],
                        opacity: 0.6,
                      }}
                    />

                    {summaryDifferenceLabel && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[50],
                          }}
                        >
                          전월대비
                        </Text>
                        {summaryDifferenceValue != null && summaryDifferenceValue > 0 ? (
                          <UpGraphIcon width={12} height={12} />
                        ) : summaryDifferenceValue != null && summaryDifferenceValue < 0 ? (
                          <RGraphIcon width={12} height={12} />
                        ) : (
                          <GGraphIcon width={12} height={12} />
                        )}
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color:
                              summaryDifferenceValue != null && summaryDifferenceValue > 0
                                ? colors.primary[50]
                                : summaryDifferenceValue != null && summaryDifferenceValue < 0
                                  ? colors.red[40]
                                  : colors.coolNeutral[40],
                          }}
                        >
                          {summaryDifferenceLabel}
                        </Text>
                      </View>
                    )}
                  </>
                )}

                <View style={{ gap: 8 }}>
                  {summaryCategoryItems.map((item) => (
                    <View
                      key={item.label}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.coolNeutral[90],
                        }}
                      >
                        {item.label}
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.coolNeutral[90],
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    height: 2,
                    backgroundColor: colors.coolNeutral[70],
                    opacity: 0.9,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Bold,
                      color: colors.coolNeutral[90],
                    }}
                  >
                    전체금액
                  </Text>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.h2Bold,
                      color: colors.coolNeutral[90],
                    }}
                  >
                    {summaryTotalAmountLabel}
                  </Text>
                </View>
              </View>
            )}

            <View style={{ marginTop: 24 }}>
              <MainButton
                label="지출내역 추가하기"
                alwaysPrimary
                onPress={onAddExpense}
                containerStyle={{ width: '100%' }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
