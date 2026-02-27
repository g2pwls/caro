import { Modal, Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import type { Expense } from '@/types/expense';
import type { PrimaryCar } from '@/types/profile';
import BCarIcon from '@/assets/icons/bcar.svg';
import PencilIcon from '@/assets/icons/pencil.svg';

interface ExpenseDetailModalProps {
  visible: boolean;
  detailExpense: Expense | null;
  myCars: PrimaryCar[];
  onClose: () => void;
  onEdit: (expense: Expense) => void;
}

export function ExpenseDetailModal({
  visible,
  detailExpense,
  myCars,
  onClose,
  onEdit,
}: ExpenseDetailModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: 355,
            backgroundColor: colors.coolNeutral[10],
            borderRadius: 20,
            padding: 20,
            gap: 20,
          }}
        >
          {detailExpense &&
            (() => {
              const car = detailExpense.memberCar;
              const carLabel = [car?.brandName, car?.modelName, car?.variant].filter(Boolean).join(' ');
              const matchedCar = myCars.find((c) => c.id === car?.id);
              const regNumber = matchedCar?.registrationNumber;
              const dateFormatted = detailExpense.expenseDate.replace(/-/g, '. ');

              return (
                <>
                  <View style={{ gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body2Semibold,
                            color: colors.primary[50],
                          }}
                        >
                          {dateFormatted}
                        </Text>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body2Semibold,
                            color: colors.coolNeutral[80],
                          }}
                        >
                          지출내역
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => onEdit(detailExpense)}
                        accessibilityRole="button"
                        accessibilityLabel="edit-expense"
                        hitSlop={8}
                      >
                        <PencilIcon width={22} height={22} />
                      </Pressable>
                    </View>
                    <View style={{ height: 22, borderBottomWidth: 1, borderColor: colors.coolNeutral[30] }} />
                  </View>

                  {carLabel && (
                    <View
                      style={{
                        backgroundColor: colors.primary[10],
                        borderRadius: 12,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 12,
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
                        {carLabel}
                      </Text>
                      {regNumber && (
                        <>
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
                              ...typography.styles.body3Semibold,
                              color: colors.primary[50],
                            }}
                          >
                            {regNumber}
                          </Text>
                        </>
                      )}
                    </View>
                  )}

                  <View>
                    <View style={{ gap: 8 }}>
                      <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body3Medium,
                              color: colors.coolNeutral[80],
                            }}
                          >
                            메모
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              flex: 1,
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body3Medium,
                              color: colors.coolNeutral[50],
                              textAlign: 'right',
                            }}
                          >
                            {detailExpense.memo || '-'}
                          </Text>
                        </View>
                        <View style={{ height: 20, borderBottomWidth: 1, borderColor: colors.coolNeutral[30] }} />
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[80],
                          }}
                        >
                          장소
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            flex: 1,
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: colors.coolNeutral[50],
                            textAlign: 'right',
                          }}
                        >
                          {detailExpense.location || '-'}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[80],
                          }}
                        >
                          카테고리
                        </Text>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: colors.coolNeutral[50],
                          }}
                        >
                          {detailExpense.categoryLabel}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Medium,
                            color: colors.coolNeutral[80],
                          }}
                        >
                          가격
                        </Text>
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: colors.coolNeutral[50],
                          }}
                        >
                          {detailExpense.amount.toLocaleString('ko-KR')}원
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ gap: 12 }}>
                    <View style={{ height: 2, backgroundColor: colors.coolNeutral[80] }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.h2Bold,
                          color: colors.coolNeutral[70],
                        }}
                      >
                        전체금액
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.h2Bold,
                          color: colors.primary[50],
                        }}
                      >
                        {detailExpense.amount.toLocaleString('ko-KR')} 원
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                    <Pressable
                      onPress={onClose}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: colors.coolNeutral[20],
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      accessibilityRole="button"
                      accessibilityLabel="detail-cancel"
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body1Bold,
                          color: colors.coolNeutral[40],
                        }}
                      >
                        취소
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={onClose}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: colors.primary[50],
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      accessibilityRole="button"
                      accessibilityLabel="detail-confirm"
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body1Bold,
                          color: colors.coolNeutral[10],
                        }}
                      >
                        확인
                      </Text>
                    </Pressable>
                  </View>
                </>
              );
            })()}
        </View>
      </View>
    </Modal>
  );
}
