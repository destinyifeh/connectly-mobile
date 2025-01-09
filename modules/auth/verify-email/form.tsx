import {AppButton} from '@/components/Button';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {z} from 'zod';
type formData = {
  otp: string;
};
interface OTPRefProp {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

const otpDataSchema = z.object({
  otp: z.string().trim().length(4, {message: 'Code must be 4 characters long'}),
});
export const VerifyEmailForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const otpRef = useRef<OTPRefProp>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(otpDataSchema),
    mode: 'onSubmit',
  });

  const clearOtp = () => {
    if (otpRef.current) {
      otpRef.current?.clear(); // Clear the OTP input field
    }
  };

  const onSubmitOtpData = (data: formData) => {
    console.log(data, 'dataa');

    setIsLoading(true);
    //clearErrors(['username', 'email', 'password', 'phone', 'confirmPassword']);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      clearOtp();
      setError('otp', {
        //type: 'server',
        message: 'Incorrect otp',
      });

      router.push('/reset-password');
    }, 2000);
  };

  const onResendCode = () => {
    setIsResending(true);
    setIsLoading(true);
    clearErrors('otp');
    setTimeout(() => {
      setIsResending(false);
      setIsLoading(false);
      router.push('/complete-setup');
      ToastAndroid.show('Code resent successfully', ToastAndroid.LONG);
    }, 2000);
  };

  return (
    <View className="mt-5">
      <Controller
        control={control}
        name="otp"
        render={({field: {onChange, onBlur, value}}) => (
          <OtpInput
            numberOfDigits={4}
            focusColor="#d4b300"
            placeholder="******"
            blurOnFilled={true}
            disabled={isLoading}
            type="numeric"
            secureTextEntry={false}
            onTextChange={onChange}
            onFocus={() => clearErrors('otp')}
            theme={{
              pinCodeContainerStyle: styles.otpBox,
              containerStyle: styles.otpContainer,
            }}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            ref={otpRef}
          />
        )}
      />
      {Boolean(errors) && (
        <Text className="text-app-danger text-sm font-sans text-center mt-2">
          {errors.otp?.message}
        </Text>
      )}
      <TouchableOpacity onPress={onResendCode} className="self-center mt-5">
        <Text className="text-app-default font-bold font-sans text-base">
          {isResending ? 'Resending...' : ' Send code again'}
        </Text>
      </TouchableOpacity>

      <View className="mt-[20%]">
        <AppButton
          title={isLoading ? 'Please wait...' : 'Continue'}
          onPress={handleSubmit(onSubmitOtpData)}
          disabled={isLoading || !isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpBox: {},
  otpContainer: {
    width: '60%',
    alignSelf: 'center',
  },
});
