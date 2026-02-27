import { useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { Dispatch, SetStateAction } from 'react';
import { borderRadius, colors, typography } from '@/theme';
import TextInput from '@/components/common/Input/TextInput';
import type { UserEditData } from '@/components/user/types';
import type { PrimaryCar } from '@/types/profile';
import XIcon from '@/assets/icons/x_icon.svg';
import DownIcon from '@/assets/icons/DownIcon.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import BCheckIcon from '@/assets/icons/bcheck.svg';

interface ProfileEditModalProps {
  visible: boolean;
  editData: UserEditData;
  setEditData: Dispatch<SetStateAction<UserEditData>>;
  profileName: string;
  profileEmail: string;
  cars: PrimaryCar[];
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onAddNewVehicle: () => void;
}

export function ProfileEditModal({
  visible,
  editData,
  setEditData,
  profileName,
  profileEmail,
  cars,
  isSaving,
  onClose,
  onSave,
  onAddNewVehicle,
}: ProfileEditModalProps) {
  const [isCarNumberFocused, setIsCarNumberFocused] = useState(false);
  const [isCarModelDropdownOpen, setIsCarModelDropdownOpen] = useState(false);

  const selectedEditCar = useMemo(
    () => cars.find((car) => car.id === editData.selectedCarId) ?? null,
    [cars, editData.selectedCarId],
  );

  const handleClose = () => {
    setIsCarModelDropdownOpen(false);
    setIsCarNumberFocused(false);
    onClose();
  };

  const handleAddVehicle = () => {
    setIsCarModelDropdownOpen(false);
    onAddNewVehicle();
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={isCarNumberFocused}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-end' }}>
          <Pressable
            onPress={Keyboard.dismiss}
            style={{
              width: '100%',
              maxHeight: '90%',
              backgroundColor: colors.coolNeutral[10],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingTop: 18,
                paddingBottom: 24,
                paddingHorizontal: 20,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body1Semibold,
                    color: colors.coolNeutral[80],
                  }}
                >
                  프로필 수정
                </Text>
                <Pressable
                  onPress={handleClose}
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  accessibilityRole="button"
                  accessibilityLabel="close-modal"
                >
                  <XIcon width={24} height={24} />
                </Pressable>
              </View>

              <View style={{ marginBottom: 20 }}>
                <TextInput
                  label="이름"
                  value={editData.name}
                  onChangeText={(text) => setEditData((prev) => ({ ...prev, name: text }))}
                  onClear={() => setEditData((prev) => ({ ...prev, name: '' }))}
                  onBlur={() => {
                    if (!editData.name.trim()) {
                      setEditData((prev) => ({ ...prev, name: profileName }));
                    }
                  }}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <TextInput label="이메일" value={profileEmail} disabled />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Semibold,
                    color: colors.coolNeutral[80],
                    marginBottom: 12,
                  }}
                >
                  차종
                </Text>
                <Pressable
                  onPress={() => setIsCarModelDropdownOpen((prev) => !prev)}
                  style={{
                    height: 48,
                    borderWidth: 1.2,
                    borderColor: colors.coolNeutral[20],
                    borderRadius: borderRadius.md,
                    paddingHorizontal: 12,
                    paddingRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: colors.coolNeutral[10],
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Regular,
                      color: colors.coolNeutral[70],
                    }}
                  >
                    {selectedEditCar
                      ? `${selectedEditCar.brandName} ${selectedEditCar.modelName}`
                      : '차량을 선택해주세요'}
                  </Text>
                  <DownIcon width={20} height={20} />
                </Pressable>

                {isCarModelDropdownOpen && (
                  <View
                    style={{
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: colors.coolNeutral[20],
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.coolNeutral[10],
                      overflow: 'hidden',
                    }}
                  >
                    <Pressable
                      onPress={handleAddVehicle}
                      style={{
                        paddingVertical: 14,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.coolNeutral[20],
                      }}
                    >
                      <PlusIcon width={20} height={20} />
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body2Semibold,
                          color: colors.primary[50],
                        }}
                      >
                        새로운 차 추가하기
                      </Text>
                    </Pressable>

                    {cars.map((car) => {
                      const isSelected = car.id === editData.selectedCarId;
                      return (
                        <Pressable
                          key={car.id}
                          onPress={() => {
                            setEditData((prev) => ({
                              ...prev,
                              selectedCarId: car.id,
                              carNumber: car.registrationNumber,
                            }));
                            setIsCarModelDropdownOpen(false);
                          }}
                          style={{
                            paddingVertical: 14,
                            paddingHorizontal: 16,
                            backgroundColor: isSelected ? colors.primary[10] : 'transparent',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <View style={{ gap: 2 }}>
                            <Text
                              style={{
                                fontFamily: typography.fontFamily.pretendard,
                                ...typography.styles.body2Regular,
                                color: isSelected ? colors.primary[50] : colors.coolNeutral[70],
                              }}
                            >
                              {car.brandName} {car.modelName}
                            </Text>
                            <Text
                              style={{
                                fontFamily: typography.fontFamily.pretendard,
                                ...typography.styles.body3Regular,
                                color: isSelected ? colors.primary[40] : colors.coolNeutral[40],
                              }}
                            >
                              {car.registrationNumber}
                            </Text>
                          </View>
                          {isSelected && <BCheckIcon width={16} height={16} />}
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>

              <View style={{ marginBottom: 24 }}>
                <TextInput
                  label="차량번호"
                  value={editData.carNumber}
                  onChangeText={(text) => setEditData((prev) => ({ ...prev, carNumber: text }))}
                  onClear={() => setEditData((prev) => ({ ...prev, carNumber: '' }))}
                  onFocus={() => setIsCarNumberFocused(true)}
                  onBlur={() => {
                    setIsCarNumberFocused(false);
                    if (!editData.carNumber.trim()) {
                      setEditData((prev) => ({
                        ...prev,
                        carNumber: selectedEditCar?.registrationNumber || '',
                      }));
                    }
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable
                  onPress={handleClose}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.background.default,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body1Semibold,
                      color: colors.coolNeutral[50],
                    }}
                  >
                    취소
                  </Text>
                </Pressable>

                <Pressable
                  onPress={onSave}
                  disabled={isSaving}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: borderRadius.md,
                    backgroundColor: isSaving ? colors.coolNeutral[30] : colors.primary[50],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body1Semibold,
                      color: colors.coolNeutral[10],
                    }}
                  >
                    {isSaving ? '저장 중...' : '저장하기'}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
