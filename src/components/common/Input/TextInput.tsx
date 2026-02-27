import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput, Pressable, Text, TextInputProps, View } from 'react-native';
import { colors, typography } from '@/theme';
import XIcon from '@/assets/icons/x_icon.svg';
import { BaseInput, InputFrame } from '@/components/common/Input/BaseInput';
import { useInputVisualState } from '@/components/common/Input/useInputVisualState';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onClear?: () => void;
  noBlurStyle?: boolean;
}

const TextInput = ({
  label,
  required = false,
  error,
  disabled = false,
  onClear,
  noBlurStyle = false,
  value,
  onFocus,
  onBlur,
  ...props
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);
  
  const hasValue = value && value.length > 0;
  const hasError = error && error.length > 0;
  const { borderColor, backgroundColor, cursorColor } = useInputVisualState({
    disabled,
    hasError: !!hasError,
    isFocused,
    hasValue: !!hasValue,
    blurFilledStyle: !noBlurStyle,
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleClear = () => {
    onClear?.();
    if (!disabled) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  return (
    <BaseInput label={label} required={required} error={error}>
      {/* 입력창 */}
      <InputFrame
        width={334}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        style={{ justifyContent: 'space-between' }}
      >
        <RNTextInput
          ref={inputRef}
          value={value}
          editable={!disabled}
          placeholderTextColor={colors.coolNeutral[30]}
          cursorColor={cursorColor}
          selectionColor={cursorColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            flex: 1,
            fontFamily: typography.fontFamily.pretendard,
            ...typography.styles.body2Regular,
            color: colors.coolNeutral[70],
            padding: 0,
          }}
          {...props}
        />

        {/* X 버튼 - 포커스 상태이고 값이 있으면 표시 */}
        {hasValue && !disabled && isFocused && (
          <Pressable
            onPressIn={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <XIcon width={24} height={24} fill={colors.coolNeutral[70]} />
          </Pressable>
        )}
      </InputFrame>
    </BaseInput>
  );
};

export default TextInput;