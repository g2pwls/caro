import { Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import type { DrivingRecord } from '@/types/drivingRecord';
import { formatTimeHHMM } from '@/utils/date';
import BCarIcon from '@/assets/icons/bcar.svg';
import PointIcon from '@/assets/icons/point.svg';
import UpIcon from '@/assets/icons/UpIcon.svg';
import DownIcon from '@/assets/icons/DownIcon.svg';
import B1Icon from '@/assets/icons/b1.svg';
import B2Icon from '@/assets/icons/b2.svg';
import B3Icon from '@/assets/icons/b3.svg';
import B4Icon from '@/assets/icons/b4.svg';
import B5Icon from '@/assets/icons/b5.svg';
import B6Icon from '@/assets/icons/b6.svg';
import B7Icon from '@/assets/icons/b7.svg';
import B8Icon from '@/assets/icons/b8.svg';
import B9Icon from '@/assets/icons/b9.svg';

const DRIVE_NUMBER_ICONS = [B1Icon, B2Icon, B3Icon, B4Icon, B5Icon, B6Icon, B7Icon, B8Icon, B9Icon];

function formatDuration(startISO: string, endISO: string): string {
  const diffMs = new Date(endISO).getTime() - new Date(startISO).getTime();
  const totalSec = Math.max(0, Math.floor(diffMs / 1000));
  const hh = Math.floor(totalSec / 3600).toString().padStart(2, '0');
  const mm = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
  const ss = (totalSec % 60).toString().padStart(2, '0');
  return `${hh} : ${mm} : ${ss}`;
}

interface HomeTodayDriveSectionProps {
  todayRecords: DrivingRecord[];
  expandedDriveIndices: Set<number>;
  onToggleExpand: (index: number) => void;
}

export function HomeTodayDriveSection({
  todayRecords,
  expandedDriveIndices,
  onToggleExpand,
}: HomeTodayDriveSectionProps) {
  if (todayRecords.length === 0) return null;

  return (
    <View style={{ gap: 20 }}>
      <Text
        style={{
          fontFamily: typography.fontFamily.pretendard,
          ...typography.styles.body3Medium,
          color: colors.coolNeutral[40],
          textAlign: 'center',
        }}
      >
        가장 최근 운행 두 건만 보여요!
      </Text>
      {todayRecords.slice(0, 2).map((record, index) => {
        const isExpanded = expandedDriveIndices.has(index);
        const NumberIcon = DRIVE_NUMBER_ICONS[index] || DRIVE_NUMBER_ICONS[0];
        const carName = `${record.vehicleBrandName} ${record.vehicleModelName}`;
        return (
          <View
            key={record.id}
            style={{
              backgroundColor: colors.background.default,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Pressable
              onPress={() => onToggleExpand(index)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              accessibilityRole="button"
              accessibilityLabel={`toggle-drive-${index}`}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <NumberIcon width={16} height={16} />
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body1Semibold,
                    color: colors.coolNeutral[80],
                  }}
                >
                  운행
                </Text>
              </View>
              {isExpanded ? <UpIcon width={22} height={22} /> : <DownIcon width={22} height={22} />}
            </Pressable>

            <View style={{ marginTop: 16, gap: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body3Medium,
                    color: colors.coolNeutral[50],
                  }}
                >
                  주행거리
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Semibold,
                    color: colors.primary[60],
                  }}
                >
                  {record.distanceKm} km
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body3Medium,
                    color: colors.coolNeutral[50],
                  }}
                >
                  운행시간
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Semibold,
                    color: colors.primary[60],
                  }}
                >
                  {formatDuration(record.startDateTime, record.endDateTime)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body3Medium,
                    color: colors.coolNeutral[50],
                  }}
                >
                  적립 포인트
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PointIcon width={18} height={18} />
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Semibold,
                      color: colors.primary[60],
                    }}
                  >
                    {record.earnedPoints} P
                  </Text>
                </View>
              </View>
            </View>

            {isExpanded ? (
              <View style={{ marginTop: 16, gap: 12 }}>
                <View style={{ height: 1, backgroundColor: colors.coolNeutral[30] }} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.coolNeutral[10],
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    gap: 10,
                  }}
                >
                  <BCarIcon width={20} height={20} />
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body3Semibold,
                      color: colors.primary[50],
                    }}
                  >
                    {carName}
                  </Text>
                  <View style={{ width: 1.4, height: 17, backgroundColor: colors.primary[50] }} />
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body3Semibold,
                      color: colors.primary[50],
                    }}
                  >
                    {record.vehicleVariantName}
                  </Text>
                </View>

                <View style={{ gap: 8, paddingHorizontal: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: colors.primary[50],
                        borderRadius: 6,
                        paddingHorizontal: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.captionSemibold,
                          color: colors.coolNeutral[10],
                        }}
                      >
                        출발
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Semibold,
                          color: colors.coolNeutral[70],
                        }}
                      >
                        {formatTimeHHMM(record.startDateTime)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Medium,
                          color: colors.coolNeutral[40],
                          flexShrink: 1,
                        }}
                        numberOfLines={1}
                      >
                        {record.startLocation}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: colors.coolNeutral[50],
                        borderRadius: 6,
                        paddingHorizontal: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.captionSemibold,
                          color: colors.coolNeutral[10],
                        }}
                      >
                        도착
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Semibold,
                          color: colors.coolNeutral[70],
                        }}
                      >
                        {formatTimeHHMM(record.endDateTime)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Medium,
                          color: colors.coolNeutral[40],
                          flexShrink: 1,
                        }}
                        numberOfLines={1}
                      >
                        {record.endLocation}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
