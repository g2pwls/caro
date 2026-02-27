import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import type { ExpenseCategory, ExpenseCategoryItem } from '@/types/expense';
import type { PrimaryCar } from '@/types/profile';
import XIcon from '@/assets/icons/x_icon.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import BCarIcon from '@/assets/icons/bcar.svg';
import WCheckIcon from '@/assets/icons/wcheck.svg';
import NumberInput from '@/components/common/Input/NumberInput';
import TextInput from '@/components/common/Input/TextInput';

interface ExpenseFormModalProps {
  visible: boolean;
  editingExpenseId: number | null;
  selectedCar: PrimaryCar | null;
  categories: ExpenseCategoryItem[];
  addCategory: ExpenseCategory;
  addDate: string;
  addAmount: string;
  addPlace: string;
  addMemo: string;
  isAddEnabled: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isOcrLoading: boolean;
  onDismiss: () => void;
  onClose: () => void;
  onReceiptPress: () => void;
  onChangeCarFromForm: () => void;
  onOpenDatePicker: () => void;
  onSelectCategory: (category: ExpenseCategory) => void;
  onChangeAmount: (value: string) => void;
  onChangePlace: (value: string) => void;
  onChangeMemo: (value: string) => void;
  onSubmit: () => void;
}

export function ExpenseFormModal({
  visible,
  editingExpenseId,
  selectedCar,
  categories,
  addCategory,
  addDate,
  addAmount,
  addPlace,
  addMemo,
  isAddEnabled,
  isCreating,
  isUpdating,
  isOcrLoading,
  onDismiss,
  onClose,
  onReceiptPress,
  onChangeCarFromForm,
  onOpenDatePicker,
  onSelectCategory,
  onChangeAmount,
  onChangePlace,
  onChangeMemo,
  onSubmit,
}: ExpenseFormModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)' }}>
        <Pressable
          onPress={onDismiss}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          accessibilityRole="button"
          accessibilityLabel="dismiss-add-expense"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View
            style={{
              width: '100%',
              height: '60%',
              backgroundColor: colors.coolNeutral[10],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingVertical: 32,
              paddingHorizontal: 20,
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
                  ...typography.styles.body1Semibold,
                  color: colors.coolNeutral[90],
                }}
              >
                {editingExpenseId ? '지출 수정' : '지출 추가'}
              </Text>

              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="close-add-expense"
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <XIcon width={24} height={24} />
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingTop: 12,
              }}
            >
              <View style={{ gap: 20 }}>
                <View style={{ gap: 16 }}>
                  <Pressable
                    onPress={onReceiptPress}
                    disabled={isOcrLoading}
                    accessibilityRole="button"
                    accessibilityLabel="receipt-ocr"
                    style={{
                      width: '100%',
                      borderRadius: borderRadius.lg,
                      backgroundColor: colors.background.default,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      gap: 10,
                      opacity: isOcrLoading ? 0.6 : 1,
                    }}
                  >
                    {isOcrLoading ? (
                      <>
                        <ActivityIndicator size="small" color={colors.primary[50]} />
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: colors.primary[50],
                          }}
                        >
                          영수증 분석 중...
                        </Text>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[40],
                          }}
                        >
                          잠시만 기다려주세요
                        </Text>
                      </>
                    ) : (
                      <>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <CameraIcon width={24} height={24} />
                        </View>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: colors.primary[50],
                          }}
                        >
                          영수증 촬영하기
                        </Text>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[40],
                          }}
                        >
                          OCR로 자동입력
                        </Text>
                      </>
                    )}
                  </Pressable>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: colors.coolNeutral[30] }} />
                    <Text
                      style={{
                        fontFamily: typography.fontFamily.pretendard,
                        ...typography.styles.body3Medium,
                        color: colors.coolNeutral[40],
                      }}
                    >
                      또는 직접 입력
                    </Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: colors.coolNeutral[30] }} />
                  </View>
                </View>

                <View style={{ gap: 20 }}>
                  <View style={{ width: '100%', gap: 20 }}>
                    <View style={{ width: '100%', gap: 12 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.coolNeutral[80],
                        }}
                      >
                        선택한 차량
                      </Text>

                      <Pressable
                        onPress={onChangeCarFromForm}
                        accessibilityRole="button"
                        accessibilityLabel="change-car"
                        style={{
                          width: '100%',
                          height: 48,
                          borderRadius: borderRadius.md,
                          backgroundColor: colors.primary[10],
                          paddingHorizontal: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                          <BCarIcon width={20} height={20} />

                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body2Semibold,
                              color: colors.primary[50],
                            }}
                          >
                            {selectedCar
                              ? `${selectedCar.brandName} ${selectedCar.modelName} ${selectedCar.variant}`
                              : '차량 없음'}
                          </Text>

                          <View
                            style={{
                              width: 1.4,
                              height: 17,
                              backgroundColor: colors.primary[50],
                            }}
                          />

                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body2Semibold,
                              color: colors.primary[50],
                            }}
                          >
                            {selectedCar?.registrationNumber ?? '-'}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: borderRadius.full,
                            backgroundColor: colors.primary[50],
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <WCheckIcon width={24} height={24} />
                        </View>
                      </Pressable>
                    </View>

                    <View style={{ width: '100%', gap: 12 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.coolNeutral[80],
                        }}
                      >
                        날짜
                      </Text>
                      <Pressable
                        onPress={onOpenDatePicker}
                        accessibilityRole="button"
                        accessibilityLabel="open-date-picker"
                        style={{
                          width: '100%',
                          height: 48,
                          borderRadius: borderRadius.md,
                          borderWidth: 1.2,
                          borderColor: colors.coolNeutral[20],
                          backgroundColor: colors.coolNeutral[10],
                          justifyContent: 'center',
                          paddingLeft: 12,
                          paddingRight: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body2Regular,
                            color: addDate ? colors.coolNeutral[70] : colors.coolNeutral[30],
                          }}
                        >
                          {addDate || '날짜를 입력해주세요.'}
                        </Text>
                      </Pressable>
                    </View>

                    <View style={{ width: '100%', gap: 12 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.coolNeutral[80],
                        }}
                      >
                        카테고리
                      </Text>

                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                          {categories.map((c) => {
                            const selected = addCategory === c.category;
                            return (
                              <Pressable
                                key={c.category}
                                onPress={() => onSelectCategory(c.category)}
                                style={{
                                  height: 36,
                                  paddingHorizontal: 12,
                                  borderRadius: borderRadius.md,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: selected
                                    ? colors.primary[50]
                                    : colors.background.default,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: typography.fontFamily.pretendard,
                                    ...typography.styles.body2Semibold,
                                    color: selected ? colors.coolNeutral[10] : colors.coolNeutral[40],
                                  }}
                                >
                                  {c.categoryLabel}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                      </ScrollView>
                    </View>

                    <NumberInput
                      label="금액"
                      value={addAmount}
                      placeholder="숫자만 입력해주세요."
                      onChangeText={onChangeAmount}
                      onClear={() => onChangeAmount('')}
                    />

                    <TextInput
                      label="장소"
                      value={addPlace}
                      placeholder="장소를 입력해주세요."
                      onChangeText={onChangePlace}
                      onClear={() => onChangePlace('')}
                    />

                    <TextInput
                      label="메모"
                      value={addMemo}
                      placeholder="메모를 자유롭게 입력해주세요."
                      onChangeText={onChangeMemo}
                      onClear={() => onChangeMemo('')}
                    />
                  </View>

                  <Pressable
                    disabled={!isAddEnabled || isCreating || isUpdating || !selectedCar}
                    onPress={onSubmit}
                    style={{
                      width: '100%',
                      height: 48,
                      borderRadius: borderRadius.md,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        isAddEnabled && !isCreating && !isUpdating
                          ? colors.primary[50]
                          : colors.coolNeutral[20],
                    }}
                  >
                    {isCreating || isUpdating ? (
                      <ActivityIndicator size="small" color={colors.coolNeutral[10]} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.h3Bold,
                          color: isAddEnabled ? colors.coolNeutral[10] : colors.coolNeutral[40],
                        }}
                      >
                        {editingExpenseId ? '수정하기' : '추가하기'}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
