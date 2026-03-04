import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import BCheckIcon from '@/assets/icons/bcheck.svg';
import Day1Icon from '@/assets/icons/Day1.svg';
import Day2Icon from '@/assets/icons/Day2.svg';
import Day3Icon from '@/assets/icons/Day3.svg';
import Day4Icon from '@/assets/icons/Day4.svg';
import Day5Icon from '@/assets/icons/Day5.svg';
import Day6Icon from '@/assets/icons/Day6.svg';
import Day7Icon from '@/assets/icons/Day7.svg';

interface HomeAttendanceSectionProps {
  attendanceStreak: number;
  isAttendanceChecked: boolean;
  attendedDays: Set<number>;
  onAttendanceCheck: () => void;
}

const ATTENDANCE_DAY_ICONS = [
  { day: 1, Icon: Day1Icon },
  { day: 2, Icon: Day2Icon },
  { day: 3, Icon: Day3Icon },
  { day: 4, Icon: Day4Icon },
  { day: 5, Icon: Day5Icon },
  { day: 6, Icon: Day6Icon },
  { day: 7, Icon: Day7Icon },
];

export function HomeAttendanceSection({
  attendanceStreak,
  isAttendanceChecked,
  attendedDays,
  onAttendanceCheck,
}: HomeAttendanceSectionProps) {
  return (
    <View style={{ gap: 20, marginBottom: 8 }}>
      <Text
        style={{
          fontFamily: typography.fontFamily.pretendard,
          ...typography.styles.h3Bold,
          color: colors.coolNeutral[80],
        }}
      >
        출석체크
      </Text>
      <View
        style={{
          backgroundColor: colors.background.default,
          borderRadius: 16,
          padding: 20,
          gap: 16,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.body2Semibold,
              color: colors.coolNeutral[40],
            }}
          >
            연속 {attendanceStreak > 0 ? attendanceStreak : 0}일째 출석중 !
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="attendance-check"
            disabled={isAttendanceChecked}
            onPress={onAttendanceCheck}
            style={{
              backgroundColor: isAttendanceChecked ? colors.coolNeutral[30] : colors.primary[50],
              borderRadius: 7,
              paddingHorizontal: 10.6,
              paddingVertical: 3.52,
              width: 88,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body3Semibold,
                color: colors.coolNeutral[10],
              }}
            >
              {isAttendanceChecked ? '완료' : '출석체크'}
            </Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {ATTENDANCE_DAY_ICONS.map(({ day, Icon }) => {
            const isChecked = attendedDays.has(day);
            return (
              <View key={day} style={{ alignItems: 'center', gap: 4 }}>
                {isChecked ? <BCheckIcon width={36} height={36} /> : <Icon width={36} height={36} />}
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.captionMedium,
                    color: isChecked ? colors.coolNeutral[30] : colors.coolNeutral[50],
                  }}
                >
                  Day {day}
                </Text>
              </View>
            );
          })}
        </View>
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.captionMedium,
            color: colors.primary[50],
            textAlign: 'center',
          }}
        >
          오늘 출석하고 랜덤포인트 받아가세요!
        </Text>
      </View>
    </View>
  );
}
