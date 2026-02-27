import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import type { PrimaryCar } from '@/types/profile';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import BCheckIcon from '@/assets/icons/bcheck.svg';
import GCheckIcon from '@/assets/icons/gcheck.svg';
import { deleteMyCar, setPrimaryCar } from '@/services/vehicleService';

interface UserMyCarSectionProps {
  accessToken: string | null;
  primaryCar: PrimaryCar | null;
  cars: PrimaryCar[];
  loadProfile: () => Promise<void> | void;
  loadMyCars: () => Promise<void> | void;
  onBack: () => void;
}

export function UserMyCarSection({
  accessToken,
  primaryCar,
  cars,
  loadProfile,
  loadMyCars,
  onBack,
}: UserMyCarSectionProps) {
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    loadProfile();
    loadMyCars();
  }, [accessToken, loadMyCars, loadProfile]);

  const handleDeleteCar = (carId: number, carName: string) => {
    setDeleteTarget({ id: carId, name: carName });
  };

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget || !accessToken) return;
    try {
      await deleteMyCar(deleteTarget.id);
      await Promise.all([loadMyCars(), loadProfile()]);
    } catch (err) {
      console.warn('차량 삭제 실패:', err);
    } finally {
      setDeleteTarget(null);
    }
  }, [accessToken, deleteTarget, loadMyCars, loadProfile]);

  const handleCancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleSelectPrimary = useCallback(
    async (carId: number) => {
      if (!accessToken) return;
      if (primaryCar?.id === carId) return;
      try {
        await setPrimaryCar(carId);
        await loadProfile();
      } catch (err) {
        console.warn('대표 차량 변경 실패:', err);
      }
    },
    [accessToken, loadProfile, primaryCar],
  );

  return (
    <>
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ paddingBottom: 20, gap: 25 }}>
        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Pressable
            onPress={onBack}
            style={{ width: 24, height: 24, justifyContent: 'center' }}
            accessibilityRole="button"
            accessibilityLabel="back-my-car"
          >
            <ArrowLeftIcon width={24} height={24} />
          </Pressable>
          <Text
            style={{
              fontFamily: typography.fontFamily.pretendard,
              ...typography.styles.h3Semibold,
              color: colors.coolNeutral[80],
            }}
          >
            내 차 정보
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 24 }}>
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.h3Bold,
                color: colors.coolNeutral[80],
              }}
            >
              선택 된 차량
            </Text>

            {primaryCar ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  borderWidth: 1,
                  borderColor: colors.primary[50],
                  borderRadius: borderRadius.lg,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  backgroundColor: colors.primary[10],
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BCheckIcon width={20} height={20} />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Semibold,
                      color: colors.primary[50],
                    }}
                  >
                    {primaryCar.brandName} {primaryCar.modelName} {primaryCar.variant}
                  </Text>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body3Medium,
                      color: colors.coolNeutral[40],
                    }}
                  >
                    {primaryCar.registrationNumber}
                  </Text>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Medium,
                  color: colors.coolNeutral[40],
                }}
              >
                선택된 차량이 없습니다.
              </Text>
            )}
          </View>

          <View style={{ height: 1, backgroundColor: colors.coolNeutral[20] }} />

          <View style={{ gap: 16, marginTop: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.h3Bold,
                  color: colors.coolNeutral[80],
                }}
              >
                보유 차량
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.h3Bold,
                  color: colors.primary[50],
                }}
              >
                {cars.length}
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              {cars.map((car) => {
                const isPrimary = primaryCar?.id === car.id;
                const carName = `${car.brandName} ${car.modelName} ${car.variant}`;

                return (
                  <Pressable
                    key={car.id}
                    onPress={() => handleSelectPrimary(car.id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                      borderWidth: 1,
                      borderColor: isPrimary ? colors.primary[50] : colors.coolNeutral[20],
                      borderRadius: borderRadius.lg,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      backgroundColor: isPrimary ? colors.primary[10] : colors.background.default,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`select-primary-car-${car.id}`}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isPrimary ? <BCheckIcon width={20} height={20} /> : <GCheckIcon width={20} height={20} />}
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: isPrimary ? colors.primary[50] : colors.coolNeutral[80],
                        }}
                      >
                        {carName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Medium,
                          color: colors.coolNeutral[40],
                        }}
                      >
                        {car.registrationNumber}
                      </Text>
                    </View>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteCar(car.id, carName);
                      }}
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 8,
                        backgroundColor: colors.coolNeutral[20],
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={`delete-car-${car.id}`}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Semibold,
                          color: colors.coolNeutral[40],
                        }}
                      >
                        삭제
                      </Text>
                    </Pressable>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={deleteTarget !== null} transparent animationType="fade" onRequestClose={handleCancelDelete}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'center', alignItems: 'center' }}>
          <Pressable
            onPress={handleCancelDelete}
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          />
          <View
            style={{
              width: 296,
              backgroundColor: colors.coolNeutral[10],
              borderRadius: 20,
              paddingTop: 32,
              paddingBottom: 24,
              paddingHorizontal: 24,
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View style={{ alignItems: 'center', gap: 12 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Semibold,
                  color: colors.coolNeutral[80],
                  textAlign: 'center',
                }}
              >
                카로에 등록 된{'\n'}
                <Text style={{ color: colors.primary[50] }}>{deleteTarget?.name}</Text>
                을 삭제할까요?
              </Text>

              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Medium,
                  color: colors.coolNeutral[40],
                  textAlign: 'center',
                }}
              >
                삭제하면 차량 정보가{'\n'}카로에서 사라져요.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <Pressable
                onPress={handleCancelDelete}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.coolNeutral[20],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body3Medium,
                    color: colors.coolNeutral[40],
                  }}
                >
                  취소할래요
                </Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmDelete}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: borderRadius.md,
                  backgroundColor: colors.primary[50],
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
                  삭제하기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
