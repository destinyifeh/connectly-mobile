import {AppContainer} from '@/components/AppContainer';
import {TextField} from '@/components/TextField';
import {useFocusEffect} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';

export const SearchScreen = () => {
  const ref = useRef<TextInput | null>(null);
  const [val, setVal] = useState<string>('');
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        ref.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }, []),
  );

  const onRemoveSearchText = () => {
    setVal('');
  };
  return (
    <AppContainer showBackButton showScreenTitle title="Search">
      <View className="flex-1">
        <TextField
          placeholder="Search user"
          ref={ref}
          isSearchFieldCancelText
          value={val}
          onChangeText={text => setVal(text)}
          onRemoveSearchText={onRemoveSearchText}
        />
      </View>
    </AppContainer>
  );
};
