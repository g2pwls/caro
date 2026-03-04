import { Modal, Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import PointIcon from '@/assets/icons/point.svg';
import XIcon from '@/assets/icons/x_icon.svg';

interface HomeStopDrivingModalProps {
  visible: boolean;
  isSaving: boolean;
  totalDistanceKm: number;
  elapsedTimeText: string;
  estimatedPoints: number;
  onRequestClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function HomeStopDrivingModal({
  visible,
  isSaving,
  totalDistanceKm,
  elapsedTimeText,
  estimatedPoints,
  onRequestClose,
  onCancel,
  onConfirm,
}: HomeStopDrivingModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: 296,
            backgroundColor: colors.coolNeutral[10],
            borderRadius: 20,
            padding: 20,
            gap: 28,
          }}
        >
          <View>
            <View style={{ alignItems: 'flex-end' }}>
              <Pressable
                onPress={onCancel}
                style={{ padding: 4 }}
                accessibilityRole="button"
                accessibilityLabel="close-modal"
              >
                <XIcon width={24} height={24} />
              </Pressable>
            </View>

            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.h3Bold,
                  color: colors.coolNeutral[80],
                  textAlign: 'center',
                }}
              >
                운행을 종료하시겠어요?
              </Text>

              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Medium,
                  color: colors.coolNeutral[40],
                  textAlign: 'center',
                }}
              >
                지금까지의 운행기록이 저장됩니다.
              </Text>
            </View>
          </View>

          <View style={{ gap: 20 }}>
            <View
              style={{
                backgroundColor: colors.background.default,
                borderRadius: 12,
                padding: 12,
                gap: 12,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Medium,
                    color: colors.coolNeutral[60],
                  }}
                >
                  주행 거리
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Bold,
                    color: colors.coolNeutral[90],
                  }}
                >
                  {totalDistanceKm.toFixed(1)} km
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Medium,
                    color: colors.coolNeutral[60],
                  }}
                >
                  운행 시간
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Bold,
                    color: colors.coolNeutral[80],
                  }}
                >
                  {elapsedTimeText}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Medium,
                    color: colors.coolNeutral[60],
                  }}
                >
                  예상 적립 포인트
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PointIcon width={16} height={16} />
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Bold,
                      color: colors.coolNeutral[80],
                    }}
                  >
                    {estimatedPoints} P
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={onCancel}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: colors.coolNeutral[20],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                accessibilityRole="button"
                accessibilityLabel="cancel-stop"
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body1Bold,
                    color: colors.coolNeutral[30],
                  }}
                >
                  취소
                </Text>
              </Pressable>

              <Pressable
                onPress={onConfirm}
                disabled={isSaving}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: isSaving ? colors.coolNeutral[30] : colors.red[40],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                accessibilityRole="button"
                accessibilityLabel="confirm-stop"
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body1Bold,
                    color: colors.coolNeutral[10],
                  }}
                >
                  {isSaving ? '저장 중...' : '종료하기'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
