import { Alert } from 'react-native';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { PrimaryCar } from '@/types/profile';
import type { UserEditData } from '@/components/user/types';

interface UseUserProfileEditParams {
  accessToken: string | null;
  profileName: string;
  primaryCar: PrimaryCar | null;
  cars: PrimaryCar[];
  loadProfile: () => Promise<void> | void;
  loadMyCars: () => Promise<void> | void;
  updateProfile: (request: {
    name?: string;
    car?: { id: number; registrationNumber: string };
  }) => Promise<void>;
}

interface UseUserProfileEditResult {
  isEditModalVisible: boolean;
  editData: UserEditData;
  setEditData: Dispatch<SetStateAction<UserEditData>>;
  isSaving: boolean;
  handleOpenEditModal: () => void;
  handleCloseEditModal: () => void;
  handleSaveProfile: () => Promise<void>;
}

export function useUserProfileEdit({
  accessToken,
  profileName,
  primaryCar,
  cars,
  loadProfile,
  loadMyCars,
  updateProfile,
}: UseUserProfileEditParams): UseUserProfileEditResult {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<UserEditData>({
    name: '',
    selectedCarId: null,
    carNumber: '',
  });

  const handleOpenEditModal = () => {
    setEditData({
      name: profileName,
      selectedCarId: primaryCar?.id ?? (cars.length > 0 ? cars[0].id : null),
      carNumber: primaryCar?.registrationNumber || '',
    });
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleSaveProfile = async () => {
    if (!accessToken) return;

    const request: { name?: string; car?: { id: number; registrationNumber: string } } = {};

    if (editData.name !== profileName) {
      request.name = editData.name;
    }

    const originalCarId = primaryCar?.id;
    const originalCarNumber = primaryCar?.registrationNumber || '';
    if (
      editData.selectedCarId &&
      (editData.selectedCarId !== originalCarId || editData.carNumber !== originalCarNumber)
    ) {
      request.car = {
        id: editData.selectedCarId,
        registrationNumber: editData.carNumber,
      };
    }

    if (Object.keys(request).length === 0) {
      setIsEditModalVisible(false);
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(request);
      await Promise.all([loadProfile(), loadMyCars()]);
      setIsEditModalVisible(false);
    } catch (e) {
      Alert.alert('수정 실패', '프로필 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isEditModalVisible,
    editData,
    setEditData,
    isSaving,
    handleOpenEditModal,
    handleCloseEditModal,
    handleSaveProfile,
  };
}
