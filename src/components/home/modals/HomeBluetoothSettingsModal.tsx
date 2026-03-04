import { ActivityIndicator, Modal, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import { type BleDevice } from '@/hooks/useBluetoothConnection';
import XIcon from '@/assets/icons/x_icon.svg';

interface PairedDeviceItem {
  id: string;
  name: string;
}

interface HomeBluetoothSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  isMonitoring: boolean;
  activeDeviceId: string | null;
  connectedDevice: BleDevice | null;
  classicAudioDevice: { name: string } | null;
  autoStartEnabled: boolean;
  onSetAutoStartEnabled: (value: boolean) => void;
  pairedDevices: PairedDeviceItem[];
  onSetActiveDevice: (id: string) => void;
  onRemovePairedDevice: (id: string) => void;
  hasClassicBt: boolean;
  onPairClassicDevice: () => void;
  isBleAvailable: boolean;
  isBluetoothEnabled: boolean;
  isScanning: boolean;
  nearbyDevices: BleDevice[];
  onStartScan: () => void;
  onStopScan: () => void;
  onPairDevice: (device: BleDevice) => void;
  btError?: string | null;
}

export function HomeBluetoothSettingsModal({
  visible,
  onClose,
  isMonitoring,
  activeDeviceId,
  connectedDevice,
  classicAudioDevice,
  autoStartEnabled,
  onSetAutoStartEnabled,
  pairedDevices,
  onSetActiveDevice,
  onRemovePairedDevice,
  hasClassicBt,
  onPairClassicDevice,
  isBleAvailable,
  isBluetoothEnabled,
  isScanning,
  nearbyDevices,
  onStartScan,
  onStopScan,
  onPairDevice,
  btError,
}: HomeBluetoothSettingsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-end' }}>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          accessibilityRole="button"
          accessibilityLabel="dismiss-bt-modal"
        />

        <View
          style={{
            width: '100%',
            maxHeight: '90%',
            backgroundColor: colors.coolNeutral[10],
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 18,
            paddingBottom: 24,
            paddingHorizontal: 20,
            gap: 16,
          }}
        >
          {/* 헤더 */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.pretendard,
                ...typography.styles.body1Semibold,
                color: colors.coolNeutral[80],
              }}
            >
              블루투스 자동 운행 설정
            </Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="close-bt-modal"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <XIcon width={24} height={24} />
            </Pressable>
          </View>

          <ScrollView
            style={{ maxHeight: 600 }}
            contentContainerStyle={{ gap: 16, paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* 블루투스 자동 운행 상태 */}
            <View
              style={{
                backgroundColor: colors.primary[10],
                borderRadius: 16,
                padding: 16,
                gap: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Bold,
                    color: colors.primary[60],
                  }}
                >
                  자동 운행 시작
                </Text>
                <Switch
                  value={autoStartEnabled}
                  onValueChange={onSetAutoStartEnabled}
                  trackColor={{ false: colors.coolNeutral[30], true: colors.primary[30] }}
                  thumbColor={autoStartEnabled ? colors.primary[50] : colors.coolNeutral[30]}
                />
              </View>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body3Medium,
                  color: colors.coolNeutral[50],
                }}
              >
                설정한 디바이스가 연결되면 운행이 자동으로 시작됩니다.
              </Text>
            </View>

            {/* 등록된 디바이스 */}
            {pairedDevices.length > 0 && (
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body2Bold,
                    color: colors.coolNeutral[60],
                  }}
                >
                  등록된 디바이스
                </Text>
                <View style={{ gap: 8 }}>
                  {pairedDevices.map((device) => {
                    const isClassicConnected = classicAudioDevice?.name === device.name;
                    const isConnected = connectedDevice?.id === device.id || isClassicConnected;
                    const isActive = device.id === activeDeviceId;

                    return (
                      <View
                        key={device.id}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isConnected || isActive
                            ? colors.primary[10]
                            : colors.background.default,
                          borderRadius: 12,
                          padding: 14,
                          borderWidth: isConnected || isActive ? 1 : 0,
                          borderColor: colors.primary[30],
                        }}
                      >
                        <Pressable
                          style={{ flex: 1, gap: 2 }}
                          onPress={() => onSetActiveDevice(device.id)}
                          accessibilityRole="button"
                          accessibilityLabel={`select-bt-${device.id}`}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                backgroundColor: isConnected
                                  ? colors.primary[50]
                                  : colors.coolNeutral[30],
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: typography.fontFamily.pretendard,
                                ...typography.styles.body2Bold,
                                color: isConnected || isActive
                                  ? colors.primary[60]
                                  : colors.coolNeutral[70],
                              }}
                            >
                              {device.name}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body3Medium,
                              color: isConnected ? colors.primary[40] : colors.coolNeutral[40],
                              marginLeft: 16,
                            }}
                          >
                            {isConnected
                              ? '연결됨'
                              : isActive
                                ? '자동 연결 활성'
                                : '탭하여 활성화'}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => onRemovePairedDevice(device.id)}
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 8,
                            backgroundColor: colors.coolNeutral[20],
                          }}
                          accessibilityRole="button"
                          accessibilityLabel={`remove-bt-${device.id}`}
                        >
                          <Text
                            style={{
                              fontFamily: typography.fontFamily.pretendard,
                              ...typography.styles.body3Medium,
                              color: colors.coolNeutral[50],
                            }}
                          >
                            삭제
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* 새 디바이스 스캔 */}
            <View style={{ paddingVertical: 16, gap: 12 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.pretendard,
                  ...typography.styles.body2Bold,
                  color: colors.coolNeutral[60],
                }}
              >
                새 디바이스 등록
              </Text>

              {!isBleAvailable ? (
                <View
                  style={{
                    backgroundColor: colors.background.default,
                    borderRadius: 12,
                    padding: 16,
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Medium,
                      color: colors.coolNeutral[50],
                      textAlign: 'center',
                    }}
                  >
                    BLE를 사용할 수 없습니다.{'\n'}Development Build에서 실행해주세요.
                  </Text>
                </View>
              ) : !isBluetoothEnabled ? (
                <View
                  style={{
                    backgroundColor: colors.background.default,
                    borderRadius: 12,
                    padding: 16,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Medium,
                      color: colors.coolNeutral[50],
                      textAlign: 'center',
                    }}
                  >
                    블루투스를 켜주세요
                  </Text>
                </View>
              ) : (
                <>
                  <Pressable
                    onPress={isScanning ? onStopScan : onStartScan}
                    style={{
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: isScanning
                        ? colors.coolNeutral[20]
                        : colors.primary[50],
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      gap: 8,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="scan-bluetooth"
                  >
                    {isScanning ? (
                      <ActivityIndicator size="small" color={colors.coolNeutral[50]} />
                    ) : null}
                    <Text
                      style={{
                        fontFamily: typography.fontFamily.pretendard,
                        ...typography.styles.body2Bold,
                        color: isScanning
                          ? colors.coolNeutral[50]
                          : colors.coolNeutral[10],
                      }}
                    >
                      {isScanning ? '스캔 중지' : '주변 디바이스 검색'}
                    </Text>
                  </Pressable>

                  {nearbyDevices.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Medium,
                          color: colors.coolNeutral[40],
                        }}
                      >
                        발견된 디바이스 ({nearbyDevices.length})
                      </Text>
                      {nearbyDevices.map((device) => {
                        const alreadyPaired = pairedDevices.some(
                          (pd) => pd.id === device.id,
                        );
                        return (
                          <Pressable
                            key={device.id}
                            onPress={() => !alreadyPaired && onPairDevice(device)}
                            disabled={alreadyPaired}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: colors.background.default,
                              borderRadius: 10,
                              padding: 12,
                            }}
                            accessibilityRole="button"
                            accessibilityLabel={`pair-${device.id}`}
                          >
                            <View style={{ flex: 1, gap: 2 }}>
                              <Text
                                style={{
                                  fontFamily: typography.fontFamily.pretendard,
                                  ...typography.styles.body2Medium,
                                  color: colors.coolNeutral[70],
                                }}
                              >
                                {device.name || '알 수 없는 디바이스'}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: typography.fontFamily.pretendard,
                                  ...typography.styles.body3Medium,
                                  color: colors.coolNeutral[40],
                                }}
                              >
                                {device.rssi ? `신호 강도: ${device.rssi}dBm` : ''}
                              </Text>
                            </View>
                            <View
                              style={{
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 8,
                                backgroundColor: alreadyPaired
                                  ? colors.coolNeutral[20]
                                  : colors.primary[10],
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: typography.fontFamily.pretendard,
                                  ...typography.styles.body3Semibold,
                                  color: alreadyPaired
                                    ? colors.coolNeutral[40]
                                    : colors.primary[50],
                                }}
                              >
                                {alreadyPaired ? '등록됨' : '등록'}
                              </Text>
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  ) : null}

                  {isScanning && nearbyDevices.length === 0 ? (
                    <View style={{ alignItems: 'center', paddingVertical: 20, gap: 8 }}>
                      <ActivityIndicator size="large" color={colors.primary[40]} />
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.pretendard,
                          ...typography.styles.body3Medium,
                          color: colors.coolNeutral[40],
                        }}
                      >
                        주변 블루투스 디바이스를 검색하고 있어요...
                      </Text>
                    </View>
                  ) : null}
                </>
              )}

              {hasClassicBt ? (
                <Pressable
                  onPress={onPairClassicDevice}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: colors.primary[20],
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="pair-classic-bt"
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.pretendard,
                      ...typography.styles.body2Bold,
                      color: colors.primary[50],
                    }}
                  >
                    현재 연결된 오디오 기기 등록
                  </Text>
                </Pressable>
              ) : null}

              {btError ? (
                <Text
                  style={{
                    fontFamily: typography.fontFamily.pretendard,
                    ...typography.styles.body3Medium,
                    color: colors.red[40],
                    textAlign: 'center',
                  }}
                >
                  {btError}
                </Text>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
