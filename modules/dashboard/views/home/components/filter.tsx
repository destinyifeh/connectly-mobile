import {AppButton} from '@/components/Button';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
import {FontAwesome} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {FC, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
type FilterProps = {
  closeFilter: () => void;
  minAge: number;
  maxAge: number;
  isLoadingFilter: boolean;
  handleApplyFilter: () => void;
  setMaxAge: (val: number) => void;
  setMinAge: (val: number) => void;
  isFilterGender: string;
  setIsFilterGender: (value: string) => void;
};
export const HomeFilter: FC<FilterProps> = ({
  closeFilter,
  minAge,
  maxAge,
  isLoadingFilter,
  handleApplyFilter,
  setMaxAge,
  setMinAge,
  isFilterGender,
  setIsFilterGender,
}) => {
  const {themeColor} = useGlobalStore(state => state);
  useEffect(() => {
    setIsFilterGender('male');
  }, []);

  const onMaxAgeChange = useDebouncedCallback((value: number) => {
    setMaxAge(value);
  }, 1000);

  const onMinAgeChange = useDebouncedCallback((value: number) => {
    setMinAge(value);
  }, 1000);

  return (
    <ScrollView
      className="w-[90%] self-center my-5"
      contentContainerStyle={{paddingBottom: 10}}
      showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center p-1">
        <Text className="screen-title" style={{color: themeColor.text}}>
          Filters
        </Text>
        <TouchableOpacity
          onPress={closeFilter}
          className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center self-end">
          <FontAwesome name="close" size={23} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center my-3 gap-3">
        <TouchableOpacity
          onPress={() => setIsFilterGender('male')}
          className={`${
            isFilterGender === 'male' ? 'bg-app-default' : 'bg-app-ghost'
          } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
          <Text className="text-base font-sans">male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFilterGender('female')}
          className={`${
            isFilterGender === 'female' ? 'bg-app-default' : 'bg-app-ghost'
          } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
          <Text className="text-base font-sans">Women</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFilterGender('both')}
          className={`${
            isFilterGender === 'both' ? 'bg-app-default' : 'bg-app-ghost'
          } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
          <Text className="text-base font-sans">Both</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-3">
        <View className="flex-row items-center justify-between px-5">
          <Text
            className="text-lg text-gray font-sans"
            style={{color: themeColor.text}}>
            Age range
          </Text>
          <Text
            className="text-xl text-gray font-sans font-bold"
            style={{color: themeColor.text}}>
            {minAge}-{maxAge}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={30}
            step={1}
            value={minAge}
            onValueChange={onMinAgeChange}
            minimumTrackTintColor={APP_DEFAULT_COLOUR}
            maximumTrackTintColor="gray"
            thumbTintColor={APP_DEFAULT_COLOUR}
          />

          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={70}
            step={1}
            value={maxAge}
            onValueChange={onMaxAgeChange}
            minimumTrackTintColor={APP_DEFAULT_COLOUR}
            maximumTrackTintColor="gray"
            thumbTintColor={APP_DEFAULT_COLOUR}
          />
        </View>
      </View>
      <View className="mt-3 p-2">
        <AppButton
          title={isLoadingFilter ? 'Please wait...' : 'Apply'}
          onPress={handleApplyFilter}
          disabled={isLoadingFilter}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '50%',
    height: 40,
  },
});
