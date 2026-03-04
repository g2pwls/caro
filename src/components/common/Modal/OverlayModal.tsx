import { Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

interface OverlayModalProps {
  visible: boolean;
  onBackdropPress: () => void;
  children: ReactNode;
  overlayStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function OverlayModal({
  visible,
  onBackdropPress,
  children,
  overlayStyle,
  contentStyle,
}: OverlayModalProps) {
  if (!visible) return null;

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        overlayStyle,
      ]}
    >
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onBackdropPress} />
      <View style={contentStyle}>{children}</View>
    </View>
  );
}
