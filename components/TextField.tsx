import {globalStore} from '@/stores/global-store';
import {MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import React, {forwardRef, useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type TextFieldProps = {
  label?: string;
  type?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: 'password' | 'username' | 'oneTimeCode' | 'emailAddress';
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  onPasswordVisible?: () => void;
  error?: string;
  value?: string;
  clearErrors?: () => void;
  isSearchFieldCancelText?: boolean;
  onRemoveSearchText?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
};
export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      type,
      disabled,
      keyboardType = 'default',
      textContentType,
      defaultValue,
      isPassword = false,
      isLoading,
      placeholder,
      onChangeText,
      secureTextEntry,
      onPasswordVisible,
      error,
      value,
      clearErrors,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const borderColor = isFocused ? 'border-app-default' : 'border-gray-300';
    const {themeColor} = globalStore(state => state);
    const onBlurTrigger = () => {
      setIsFocused(false);
      if (clearErrors) clearErrors();
    };

    const onFocusTrigger = () => {
      setIsFocused(true);
    };

    return (
      <View className="my-1">
        {label && (
          <Text
            className="font-sans text-app-dark font-bold mb-1 text-base"
            style={{color: themeColor.text}}>
            {label}
          </Text>
        )}
        <View
          className={`${error ? 'border-app-danger' : borderColor} border ${
            rest.multiline
              ? 'h-[100px]'
              : 'h-[40.7px] flex-row items-center justify-between'
          } rounded-3xl px-3 w-full`}>
          <TextInput
            className={rest.multiline ? 'w-[100%]' : 'w-[92%]'}
            keyboardType={keyboardType}
            textContentType={textContentType}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            editable={!disabled}
            onFocus={onFocusTrigger}
            onBlur={onBlurTrigger}
            placeholder={placeholder}
            placeholderTextColor="gray"
            secureTextEntry={secureTextEntry}
            value={value}
            ref={ref}
            multiline={rest.multiline}
            numberOfLines={rest.numberOfLines}
            style={{color: themeColor.text}}
          />
          {isPassword && (
            <TouchableOpacity onPress={onPasswordVisible}>
              <MaterialCommunityIcons name="eye" size={18} color="gray" />
            </TouchableOpacity>
          )}

          {rest.isSearchFieldCancelText && value && (
            <TouchableOpacity onPress={rest.onRemoveSearchText}>
              <Octicons name="x" size={18} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        {Boolean(error) && (
          <Text className="text-app-danger text-sm font-sans">{error}</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.25,
    borderColor: 'grey',
    borderRadius: 24,
    height: 40.7,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textInput: {
    width: '92%',
  },
});
