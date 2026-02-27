import { useMemo } from 'react';
import { colors } from '@/theme';

type InputVisualStateOptions = {
  disabled?: boolean;
  hasError: boolean;
  isFocused: boolean;
  hasValue?: boolean;
  hasSuccess?: boolean;
  completed?: boolean;
  focusOnlyBorder?: boolean;
  blurFilledStyle?: boolean;
  disabledBackgroundColor?: string;
  completedBorderColor?: string;
  completedBackgroundColor?: string;
};

export function useInputVisualState({
  disabled = false,
  hasError,
  isFocused,
  hasValue = false,
  hasSuccess = false,
  completed = false,
  focusOnlyBorder = false,
  blurFilledStyle = true,
  disabledBackgroundColor = colors.background.default,
  completedBorderColor = colors.coolNeutral[10],
  completedBackgroundColor = 'transparent',
}: InputVisualStateOptions) {
  return useMemo(() => {
    const isBlurFilled = blurFilledStyle && !isFocused && (hasValue || hasSuccess);

    const borderColor = (() => {
      if (completed || hasSuccess) return completedBorderColor;
      if (disabled) return colors.coolNeutral[30];
      if (hasError) return colors.red[30];
      if (isFocused) return colors.primary[50];
      if (!focusOnlyBorder && isBlurFilled) return colors.coolNeutral[30];
      return colors.coolNeutral[20];
    })();

    const backgroundColor = (() => {
      if (completed) return completedBackgroundColor;
      if (disabled) return disabledBackgroundColor;
      if (isBlurFilled) return colors.background.default;
      return colors.coolNeutral[10];
    })();

    const cursorColor = hasError ? colors.red[50] : colors.primary[50];

    return { borderColor, backgroundColor, cursorColor };
  }, [
    blurFilledStyle,
    completed,
    completedBackgroundColor,
    completedBorderColor,
    disabled,
    disabledBackgroundColor,
    focusOnlyBorder,
    hasError,
    hasSuccess,
    hasValue,
    isFocused,
  ]);
}
