import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { colors, typography } from '@/theme';

interface CarStatCellProps {
  label: string;
  value?: string;
  valueNode?: ReactNode;
}

export function CarStatCell({ label, value, valueNode }: CarStatCellProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 8 }}>
      <Text
        style={{
          fontFamily: typography.fontFamily.pretendard,
          ...typography.styles.body2Medium,
          color: colors.primary[50],
        }}
      >
        {label}
      </Text>
      {valueNode ?? (
        <Text
          style={{
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.h2Semibold,
            color: colors.primary[50],
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );
}
