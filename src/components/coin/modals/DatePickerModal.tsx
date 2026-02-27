import type { MutableRefObject } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import XIcon from '@/assets/icons/x_icon.svg';

const DATE_WHEEL_ITEM_HEIGHT = 44;
const DATE_WHEEL_HEIGHT = 220;
const DATE_WHEEL_PADDING = (DATE_WHEEL_HEIGHT - DATE_WHEEL_ITEM_HEIGHT) / 2;
const DATE_PICKER_YEARS: number[] = [2024, 2025, 2026, 2027, 2028];

interface DatePickerModalProps {
  visible: boolean;
  closeDatePicker: () => void;
  pickedDateLabel: string;
  pickedYear: number;
  pickedMonth: number;
  pickedDay: number;
  dayCountInPickedMonth: number;
  setPickedYear: (value: number) => void;
  setPickedMonth: (value: number) => void;
  setPickedDay: (value: number | ((prev: number) => number)) => void;
  setAddDate: (value: string) => void;
  yearListRef: MutableRefObject<FlatList<number> | null>;
  monthListRef: MutableRefObject<FlatList<number> | null>;
  dayListRef: MutableRefObject<FlatList<number> | null>;
}

export function DatePickerModal({
  visible,
  closeDatePicker,
  pickedDateLabel,
  pickedYear,
  pickedMonth,
  pickedDay,
  dayCountInPickedMonth,
  setPickedYear,
  setPickedMonth,
  setPickedDay,
  setAddDate,
  yearListRef,
  monthListRef,
  dayListRef,
}: DatePickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={closeDatePicker}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-end' }}>
        <Pressable
          onPress={closeDatePicker}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          accessibilityRole="button"
          accessibilityLabel="dismiss-date-picker"
        />

        <View
          style={{
            width: '100%',
            backgroundColor: colors.background.default,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 18,
            paddingBottom: 24,
            paddingHorizontal: 20,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body1Semibold,
                color: colors.coolNeutral[80],
              }}
            >
              날짜 선택
            </Text>
            <Pressable
              onPress={closeDatePicker}
              accessibilityRole="button"
              accessibilityLabel="close-date-picker"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <XIcon width={24} height={24} />
            </Pressable>
          </View>

          <View style={{ gap: 24 }}>
            <View
              style={{
                width: '100%',
                borderRadius: borderRadius.lg,
                backgroundColor: colors.coolNeutral[10],
                borderWidth: 1,
                borderColor: colors.coolNeutral[20],
                paddingVertical: 16,
                paddingHorizontal: 12,
              }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <FlatList
                    ref={(r) => {
                      yearListRef.current = r;
                    }}
                    data={DATE_PICKER_YEARS}
                    keyExtractor={(item) => `y-${item}`}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={DATE_WHEEL_ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: DATE_WHEEL_PADDING }}
                    getItemLayout={(_, index) => ({
                      length: DATE_WHEEL_ITEM_HEIGHT,
                      offset: DATE_WHEEL_ITEM_HEIGHT * index,
                      index,
                    })}
                    style={{ height: DATE_WHEEL_HEIGHT }}
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(e.nativeEvent.contentOffset.y / DATE_WHEEL_ITEM_HEIGHT);
                      const y = DATE_PICKER_YEARS[idx] ?? pickedYear;
                      setPickedYear(y);
                      const maxDay = new Date(y, pickedMonth, 0).getDate();
                      setPickedDay((d) => Math.min(d, maxDay));
                    }}
                    renderItem={({ item, index }) => {
                      const selected = item === pickedYear;
                      return (
                        <Pressable
                          onPress={() => {
                            setPickedYear(item);
                            yearListRef.current?.scrollToIndex({ index, animated: true });
                            const maxDay = new Date(item, pickedMonth, 0).getDate();
                            setPickedDay((d) => Math.min(d, maxDay));
                          }}
                          style={{
                            height: DATE_WHEEL_ITEM_HEIGHT,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body1Bold,
                              color: selected ? colors.primary[50] : colors.coolNeutral[40],
                            }}
                          >
                            {item}년
                          </Text>
                        </Pressable>
                      );
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <FlatList
                    ref={(r) => {
                      monthListRef.current = r;
                    }}
                    data={Array.from({ length: 12 }, (_, i) => i + 1)}
                    keyExtractor={(item) => `m-${item}`}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={DATE_WHEEL_ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: DATE_WHEEL_PADDING }}
                    getItemLayout={(_, index) => ({
                      length: DATE_WHEEL_ITEM_HEIGHT,
                      offset: DATE_WHEEL_ITEM_HEIGHT * index,
                      index,
                    })}
                    style={{ height: DATE_WHEEL_HEIGHT }}
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(e.nativeEvent.contentOffset.y / DATE_WHEEL_ITEM_HEIGHT);
                      const mo = idx + 1;
                      setPickedMonth(mo);
                      const maxDay = new Date(pickedYear, mo, 0).getDate();
                      setPickedDay((d) => Math.min(d, maxDay));
                    }}
                    renderItem={({ item, index }) => {
                      const selected = item === pickedMonth;
                      return (
                        <Pressable
                          onPress={() => {
                            setPickedMonth(item);
                            monthListRef.current?.scrollToIndex({ index, animated: true });
                            const maxDay = new Date(pickedYear, item, 0).getDate();
                            setPickedDay((d) => Math.min(d, maxDay));
                          }}
                          style={{
                            height: DATE_WHEEL_ITEM_HEIGHT,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body1Bold,
                              color: selected ? colors.primary[50] : colors.coolNeutral[40],
                            }}
                          >
                            {item}월
                          </Text>
                        </Pressable>
                      );
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <FlatList
                    ref={(r) => {
                      dayListRef.current = r;
                    }}
                    data={Array.from({ length: dayCountInPickedMonth }, (_, i) => i + 1)}
                    keyExtractor={(item) => `d-${item}`}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={DATE_WHEEL_ITEM_HEIGHT}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: DATE_WHEEL_PADDING }}
                    getItemLayout={(_, index) => ({
                      length: DATE_WHEEL_ITEM_HEIGHT,
                      offset: DATE_WHEEL_ITEM_HEIGHT * index,
                      index,
                    })}
                    style={{ height: DATE_WHEEL_HEIGHT }}
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(e.nativeEvent.contentOffset.y / DATE_WHEEL_ITEM_HEIGHT);
                      setPickedDay(idx + 1);
                    }}
                    renderItem={({ item, index }) => {
                      const selected = item === pickedDay;
                      return (
                        <Pressable
                          onPress={() => {
                            setPickedDay(item);
                            dayListRef.current?.scrollToIndex({ index, animated: true });
                          }}
                          style={{
                            height: DATE_WHEEL_ITEM_HEIGHT,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body1Bold,
                              color: selected ? colors.primary[50] : colors.coolNeutral[40],
                            }}
                          >
                            {item}일
                          </Text>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              </View>

              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: 12,
                  right: 12,
                  top: 16 + DATE_WHEEL_PADDING,
                  height: DATE_WHEEL_ITEM_HEIGHT,
                  borderRadius: borderRadius.md,
                  borderWidth: 1,
                  borderColor: colors.coolNeutral[20],
                }}
              />
            </View>

            <Pressable
              onPress={() => {
                setAddDate(pickedDateLabel);
                closeDatePicker();
              }}
              style={{
                width: '100%',
                height: 56,
                borderRadius: borderRadius.md,
                backgroundColor: colors.primary[50],
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessibilityRole="button"
              accessibilityLabel="confirm-date-picker"
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Semibold,
                  color: colors.coolNeutral[10],
                }}
              >
                {pickedDateLabel} 선택
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
