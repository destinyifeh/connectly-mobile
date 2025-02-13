import {AppContainer} from '@/components/AppContainer';
import {AppActivityIndicator} from '@/components/AppLoader';
import {TextField} from '@/components/TextField';
import {getUserCurrentAge} from '@/helpers/formatters';
//import AppList from '@/constants/AppPackages';
import {apiHookRequester} from '@/services/api/hooks';
import {globalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {FlashList as AppList} from '@shopify/flash-list';
import {useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
interface ItemType {
  [key: string]: any;
}
const QueryItems = ({item}: ItemType) => {
  const router = useRouter();
  const {themeColor} = globalStore(state => state);

  return (
    <View className="w-full self-center border-b border-gray-200 h-[60] justify-center">
      <View className="w-[100%] self-center">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/dashboard/user-details',
              params: {
                userInfo: JSON.stringify(item),
              },
            })
          }
          className="flex-row items-center gap-3">
          <Image
            source={{uri: item.profilePhoto.url}}
            className="h-[45] w-[45] rounded-3xl"
            resizeMode="cover"
          />
          <View className="flex-row items-center gap-1 ">
            <Text
              className="text-black font-sans font-bold text-lg capitalize"
              style={{color: themeColor.text}}>
              {item.username}, {getUserCurrentAge(item.dob)}
            </Text>
            {/* <Text
              className="text-gray font-sans"
              style={{color: themeColor.text}}>
              visited your profile
            </Text> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const SearchScreen = () => {
  const ref = useRef<TextInput | null>(null);
  const [query, setQuery] = useState<string>('');

  const {currentUser, currentUserLocation, setCurrentUser} = useUserStore(
    state => state,
  );
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
    data: queryData,
  } = apiHookRequester.useFetchData(
    query ? `/api/v1/search-user/${currentUser?._id}?query=${query}` : '', // Avoid calling if no searchQuery
    'searchQuery',
  );

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        ref.current?.focus();
      }, 100);

      return () => {
        clearTimeout(timer);
        setQuery('');
      };
    }, []),
  );

  const onRemoveSearchText = () => {
    setQuery('');
  };

  const debounced = useDebouncedCallback((value: string) => {
    console.log(value, 'vall');
    if (value) {
      setQuery(value);
      refetch();
    } else {
      setQuery('');
    }
  }, 500);

  const renderListFooter = () => {
    console.log(error, 'err');
    const {message = null, code} = (error as any)?.data || {};
    console.log(code, 'code err');
    if (isLoading) {
      return <AppActivityIndicator />;
    }
    return (
      <Text className="mt-2 text-black text-base font-sans">
        {query && message ? message : null}
      </Text>
    );
  };
  const items = query && queryData?.data ? queryData.data.items : [];

  const renderItem = ({item}: {item: ItemType}) => {
    return <QueryItems item={item} />;
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Search">
      <View className="flex-1">
        <TextField
          placeholder="Search user"
          ref={ref}
          isSearchFieldCancelText
          defaultValue={query}
          onChangeText={debounced}
          onRemoveSearchText={onRemoveSearchText}
        />

        <AppList
          contentContainerClassName="pb-5"
          className="mt-5"
          data={items}
          renderItem={renderItem}
          estimatedItemSize={200}
          keyExtractor={(item: ItemType) => item._id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderListFooter}
        />
      </View>
    </AppContainer>
  );
};
