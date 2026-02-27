import { Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import type { DashboardData } from '@/services/profileService';
import PencilIcon from '@/assets/icons/pencil.svg';
import PointIcon from '@/assets/icons/point.svg';

interface UserProfileSummarySectionProps {
  profileName: string;
  profileEmail: string;
  carModel: string;
  carNumber: string;
  dashboard: DashboardData | null;
  onPressEdit: () => void;
}

export function UserProfileSummarySection({
  profileName,
  profileEmail,
  carModel,
  carNumber,
  dashboard,
  onPressEdit,
}: UserProfileSummarySectionProps) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          width: '100%',
          borderRadius: borderRadius.lg,
          backgroundColor: colors.coolNeutral[10],
          paddingTop: 24,
          overflow: 'hidden',
        }}
      >
        <View style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body1Bold,
                  color: colors.coolNeutral[90],
                }}
              >
                {profileName}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Regular,
                  color: colors.coolNeutral[40],
                }}
              >
                {profileEmail}
              </Text>
            </View>

            <Pressable
              onPress={onPressEdit}
              accessibilityRole="button"
              accessibilityLabel="edit-profile"
              style={{
                width: 28,
                height: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PencilIcon width={20} height={20} />
            </Pressable>
          </View>

          <View>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Semibold,
                color: colors.primary[50],
              }}
            >
              {carModel}  {'|'}  {carNumber}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: colors.primary[50],
            paddingVertical: 24,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body1Semibold,
                color: colors.coolNeutral[10],
              }}
            >
              {dashboard ? `${dashboard.totalDistanceKm.toFixed(1)} km` : '- km'}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Regular,
                color: colors.coolNeutral[10],
              }}
            >
              총 운행거리
            </Text>
          </View>

          <View
            style={{
              width: 1,
              height: 63,
              backgroundColor: 'rgba(255,255,255,0.4)',
            }}
          />

          <View style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <PointIcon width={18} height={18} />
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body1Semibold,
                  color: colors.coolNeutral[10],
                }}
              >
                {dashboard ? `${dashboard.availablePoints.toLocaleString()}` : '-'}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Regular,
                color: colors.coolNeutral[10],
              }}
            >
              총 적립 포인트
            </Text>
          </View>

          <View
            style={{
              width: 1,
              height: 63,
              backgroundColor: 'rgba(255,255,255,0.4)',
            }}
          />

          <View style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body1Semibold,
                color: colors.coolNeutral[10],
              }}
            >
              {dashboard ? `${dashboard.totalDrivingRecordCount}` : '-'}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body2Regular,
                color: colors.coolNeutral[10],
              }}
            >
              총 운행 횟수
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
