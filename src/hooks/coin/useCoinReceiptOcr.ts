import { Alert } from 'react-native';
import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { performOcr, type OcrSuggestedCategory } from '@/services/ocrService';
import type { ExpenseCategory } from '@/types/expense';

interface UseCoinReceiptOcrParams {
  setIsOcrLoading: (value: boolean) => void;
  setAddDate: (value: string) => void;
  setPickedYear: (value: number) => void;
  setPickedMonth: (value: number) => void;
  setPickedDay: (value: number) => void;
  setAddAmount: (value: string) => void;
  setAddPlace: (value: string) => void;
  setAddCategory: (value: ExpenseCategory) => void;
  formatKoreanDateLabel: (year: number, month: number, day: number) => string;
}

export function useCoinReceiptOcr({
  setIsOcrLoading,
  setAddDate,
  setPickedYear,
  setPickedMonth,
  setPickedDay,
  setAddAmount,
  setAddPlace,
  setAddCategory,
  formatKoreanDateLabel,
}: UseCoinReceiptOcrParams) {
  const applyOcrResult = useCallback(
    (ocrResult: {
      date: string | null;
      location: string | null;
      amount: number | null;
      suggestedCategory: OcrSuggestedCategory;
    }) => {
      if (ocrResult.date) {
        const [year, month, day] = ocrResult.date.split('-').map(Number);
        if (year && month && day) {
          const label = formatKoreanDateLabel(year, month, day);
          setAddDate(label);
          setPickedYear(year);
          setPickedMonth(month);
          setPickedDay(day);
        }
      }

      if (ocrResult.amount) {
        setAddAmount(ocrResult.amount.toLocaleString('ko-KR'));
      }

      if (ocrResult.location) {
        setAddPlace(ocrResult.location);
      }

      if (ocrResult.suggestedCategory) {
        setAddCategory(ocrResult.suggestedCategory as ExpenseCategory);
      }
    },
    [
      formatKoreanDateLabel,
      setAddAmount,
      setAddCategory,
      setAddDate,
      setAddPlace,
      setPickedDay,
      setPickedMonth,
      setPickedYear,
    ],
  );

  const processOcr = useCallback(
    async (imageUri: string) => {
      setIsOcrLoading(true);
      try {
        const ocrResult = await performOcr(imageUri);
        applyOcrResult(ocrResult);

        const recognized: string[] = [];
        if (ocrResult.date) recognized.push('날짜');
        if (ocrResult.location) recognized.push('장소');
        if (ocrResult.amount) recognized.push('금액');
        if (ocrResult.suggestedCategory) recognized.push('카테고리');

        if (recognized.length > 0) {
          Alert.alert('OCR 완료', `${recognized.join(', ')}이(가) 자동 입력되었습니다.\n확인 후 수정해주세요.`);
        } else {
          Alert.alert('OCR 완료', '영수증에서 정보를 찾지 못했습니다.\n직접 입력해주세요.');
        }
      } catch (err) {
        console.error('OCR 오류:', err);
        Alert.alert('OCR 오류', '영수증 인식에 실패했습니다.\n직접 입력해주세요.');
      } finally {
        setIsOcrLoading(false);
      }
    },
    [applyOcrResult, setIsOcrLoading],
  );

  const handleReceiptCameraPress = useCallback(async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('권한 필요', '카메라 권한이 필요합니다.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      await processOcr(result.assets[0].uri);
    } catch (err) {
      console.error('카메라 오류:', err);
      Alert.alert('오류', '카메라를 실행할 수 없습니다.');
    }
  }, [processOcr]);

  const handleReceiptLibraryPress = useCallback(async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
        selectionLimit: 1,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      await processOcr(result.assets[0].uri);
    } catch (err) {
      console.error('갤러리 오류:', err);
      Alert.alert('오류', '갤러리를 열 수 없습니다.');
    }
  }, [processOcr]);

  const handleReceiptPress = useCallback(() => {
    Alert.alert('영수증 추가', '가져올 방법을 선택해주세요.', [
      { text: '촬영하기', onPress: () => void handleReceiptCameraPress() },
      { text: '갤러리', onPress: () => void handleReceiptLibraryPress() },
      { text: '취소', style: 'cancel' },
    ]);
  }, [handleReceiptCameraPress, handleReceiptLibraryPress]);

  return { handleReceiptPress };
}
