import {AppButton} from '@/components/Button';
import {THEME_ISDARK} from '@/constants/Colors';
import {getUserCurrentAge} from '@/helpers/formatters';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {AntDesign} from '@expo/vector-icons';
import {zodResolver} from '@hookform/resolvers/zod';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useRouter} from 'expo-router';
import {useLocalSearchParams} from 'expo-router/build/hooks';
import moment from 'moment';
import {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {z} from 'zod';
import {genderOptions, hobbies} from './contants/data';

type formData = {
  gender: string;
  hobbies: string[];
  dob: Date;
  //hobby: { label: string; value: string }[];
};
interface dropDownProps {
  close: () => void;
  open: () => void;
}

const formSchema = z.object({
  gender: z.string().min(1, {message: 'Code must be 4 characters long'}),
  hobbies: z
    .array(z.string())
    .min(1, {message: 'At least one hobby is required'}),
  dob: z.date({required_error: 'Date of birth is required'}),
});
export const CompleteSetupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormattedDate, setIsFormattedDate] = useState<string>('');
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDateField, setIsFocusDateField] = useState(false);
  const [isFocusSelect, setIsFocusSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const dropDownRef = useRef<dropDownProps>(null);
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);
  const {
    setApplication,
    application,
    resetApplication,
    currentUserLocation,
    setCurrentUser,
  } = useUserStore(state => state);
  const {isFromGoogleSignIn} = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const {mutate} = apiHookRequester.usePostData('/api/v1/user/google-auth');

  const onSubmitData = (data: formData) => {
    console.log(data, 'dataa');
    setIsLoading(true);
    if (isFromGoogleSignIn) {
      const payload = {
        ...application,
        ...data,
        dob: isFormattedDate,
        age: getUserCurrentAge(isFormattedDate),
        ...currentUserLocation,
      };

      mutate(payload, {
        onSuccess(data, variables, context) {
          console.log(data, 'data google auth');
          resetApplication();
          const {message, user} = data.data;
          reset();
          setCurrentUser(user);
          ToastAndroid.show(message, ToastAndroid.LONG);
          router.replace('/dashboard');
        },
        onError(error: any, variables, context) {
          console.log(error, 'error google auth');
          const {message} = error.data;
          ToastAndroid.show(message, ToastAndroid.LONG);
        },
        onSettled(data, error, variables, context) {
          console.log('settled');
          setIsLoading(false);
        },
      });
      return;
    }

    const saveToDraft = {
      ...application,
      ...data,
      dob: isFormattedDate,
      age: getUserCurrentAge(isFormattedDate),
    };
    setApplication(saveToDraft);

    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      setSelected([]);
      setIsFormattedDate('');

      router.replace('/upload');
    }, 1000);
  };

  const selectedmessage = `${selected?.length} ${
    selected?.length === 1 ? 'hobby' : 'hobbies'
  } selected`;

  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));

  return (
    <View className="flex-1">
      <View>
        <Text
          className="font-sans text-app-dark font-bold mb-1 text-base"
          style={{color: themeColor.text}}>
          Gender
        </Text>
        <Controller
          control={control}
          name="gender"
          render={({field: {onChange, onBlur, value}}) => (
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: '#d4b300'}]}
              placeholderStyle={{color: 'gray'}}
              selectedTextStyle={{color: themeColor.text}}
              inputSearchStyle={{color: themeColor.text}}
              data={genderOptions}
              accessibilityLabel="gender"
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select gender"
              searchPlaceholder="Search..."
              value={value}
              disable={isLoading}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
                onChange(item.value);
              }}
              ref={dropDownRef}
            />
          )}
        />
        {Boolean(errors.gender?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.gender?.message}
          </Text>
        )}
      </View>

      <View className="mt-1">
        <Text
          className="font-sans text-app-dark font-bold mb-1 text-base"
          style={{color: themeColor.text}}>
          Hobby
        </Text>
        <Controller
          control={control}
          name="hobbies"
          render={({field: {onChange, onBlur, value}}) => (
            <MultiSelect
              style={[
                styles.dropdown,
                isFocusSelect && {borderColor: '#d4b300'},
              ]}
              placeholderStyle={{
                color:
                  selected?.length && themeColor.type === THEME_ISDARK
                    ? themeColor.text
                    : 'gray',
              }}
              selectedTextStyle={{color: themeColor.text}}
              inputSearchStyle={{color: themeColor.text}}
              data={hobbies}
              search
              labelField="label"
              valueField="value"
              placeholder={selected?.length ? selectedmessage : 'Select hobby'}
              searchPlaceholder="Search..."
              accessibilityLabel="Select hobby"
              value={selected}
              onFocus={() => setIsFocusSelect(true)}
              onBlur={() => setIsFocusSelect(false)}
              //maxSelect={2}
              disable={isLoading}
              onChange={item => {
                setSelected(item);
                onChange(item);
              }}
            />
          )}
        />
        {Boolean(errors.hobbies?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.hobbies?.message}
          </Text>
        )}
      </View>
      <View className="mt-1">
        <Text
          className="font-sans text-app-dark font-bold mb-1 text-base"
          style={{color: themeColor.text}}>
          Birth Date
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          onPressIn={() => setIsFocusDateField(true)}
          onPress={() => setShowDatePicker(true)}
          className={`${
            isFocusDateField ? 'border-app-default' : 'border-gray-300'
          } border h-[40.7] rounded-3xl flex-row items-center justify-between px-3 w-full`}>
          <Text
            style={{
              color: themeColor.text,
            }}
            className={`${
              isFormattedDate ? 'text-black' : ' text-gray-500'
            } font-sans text-[14px]`}>
            {isFormattedDate || ' Date of birth'}
          </Text>
          <AntDesign name="down" size={14.5} color="gray" />
        </TouchableOpacity>
        {showDatePicker && (
          <Controller
            control={control}
            name="dob"
            //defaultValue={date}
            render={({field: {onChange, onBlur, value}}) => (
              <RNDateTimePicker
                value={date}
                mode="date"
                minimumDate={new Date(1950, 0, 1)}
                maximumDate={maxDate}
                style={{backgroundColor: 'red'}}
                accentColor="red"
                onChange={(event, selectedDate) => {
                  console.log(selectedDate, 'seleeeel');
                  console.log(event, 'seleeeel22');
                  setShowDatePicker(false); // Close the picker
                  setIsFocusDateField(false);

                  if (event.type === 'dismissed') {
                    console.log('dismissed');
                    return;
                  }
                  if (selectedDate) {
                    const formattedDate =
                      moment(selectedDate).format('DD-MM-YYYY');
                    setDate(selectedDate);
                    setIsFormattedDate(formattedDate); // Update local date state
                    onChange(selectedDate); // Pass the selected date to react-hook-form
                  }
                }}
              />
            )}
          />
        )}

        {Boolean(errors.dob?.message) && (
          <Text className="text-app-danger text-sm font-sans text-center mt-2">
            {errors.dob?.message}
          </Text>
        )}
      </View>
      <View className="absolute bottom-10 w-full">
        <AppButton
          title={isLoading ? 'Please wait...' : 'Continue'}
          onPress={handleSubmit(onSubmitData)}
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
  dropdown: {
    height: 40.7,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 8,
  },
});
