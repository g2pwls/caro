import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import { borderRadius, colors, typography } from '@/theme';
import type { PrimaryCar } from '@/types/profile';
import XIcon from '@/assets/icons/x_icon.svg';
import GCarIcon from '@/assets/icons/gcar.svg';
import WCarIcon from '@/assets/icons/wcar.svg';
import WCheckIcon from '@/assets/icons/wcheck.svg';

interface CarSelectModalProps {
  visible: boolean;
  isLoading: boolean;
  cars: PrimaryCar[];
  selectedCar: PrimaryCar | null;
  onClose: () => void;
  onSelectCar: (car: PrimaryCar) => void;
}

export function CarSelectModal({
  visible,
  isLoading,
  cars,
  selectedCar,
  onClose,
  onSelectCar,
}: CarSelectModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)' }}>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          accessibilityRole="button"
          accessibilityLabel="dismiss-car-select"
        />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              width: '100%',
              backgroundColor: colors.coolNeutral[10],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingTop: 28,
              paddingBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body1Semibold,
                  color: colors.coolNeutral[90],
                }}
              >
                보유한 차량 선택
              </Text>

              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="close-car-select"
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <XIcon width={24} height={24} />
              </Pressable>
            </View>

            {isLoading ? (
              <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary[50]} />
              </View>
            ) : cars.length === 0 ? (
              <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Medium,
                    color: colors.coolNeutral[50],
                  }}
                >
                  등록된 차량이 없습니다.
                </Text>
              </View>
            ) : (
              <View style={{ gap: 12 }}>
                {cars.map((car) => {
                  const isSelected = selectedCar?.id === car.id;
                  return (
                    <Pressable
                      key={car.id}
                      onPress={() => onSelectCar(car)}
                      accessibilityRole="button"
                      accessibilityLabel={`select-car-${car.id}`}
                      style={{
                        width: '100%',
                        height: 56,
                        borderRadius: borderRadius.lg,
                        backgroundColor: isSelected ? colors.primary[50] : colors.background.default,
                        paddingLeft: 12,
                        paddingRight: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                        {isSelected ? <WCarIcon width={20} height={20} /> : <GCarIcon width={20} height={20} />}

                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: isSelected ? colors.primary[10] : colors.coolNeutral[40],
                          }}
                        >
                          {car.brandName} {car.modelName} {car.variant}
                        </Text>

                        <View
                          style={{
                            width: 1.4,
                            height: 17,
                            backgroundColor: isSelected ? colors.primary[10] : colors.coolNeutral[40],
                          }}
                        />

                        <Text
                          style={{
                            fontFamily: typography.fontFamily.pretendard,
                            ...typography.styles.body3Semibold,
                            color: isSelected ? colors.primary[10] : colors.coolNeutral[40],
                          }}
                        >
                          {car.registrationNumber}
                        </Text>
                      </View>

                      {isSelected && (
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
                      )}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
