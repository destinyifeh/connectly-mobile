import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {globalStore} from '@/stores/global-store';
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';

export default function TabLayout() {
  const {themeColor} = globalStore(state => state);

  const renderHomeIcon = (color: string) => {
    return <MaterialIcons name="home-filled" size={20} color={color} />;
  };

  const renderFavIcon = (color: string) => {
    return <AntDesign size={20} name="heart" color={color} />;
  };

  const renderSettingsIcon = (color: string) => {
    return <MaterialIcons size={20} name="settings" color={color} />;
  };

  const renderProfileIcon = (color: string) => {
    return <FontAwesome6 name="user-large" size={20} color={color} />;
  };

  const renderSearchIcon = (color: string) => {
    return <Ionicons name="search" size={20} color={color} />;
  };

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: APP_DEFAULT_COLOUR,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          android: {
            backgroundColor: themeColor.background,
            //borderRadius: 25,
            //  width: '80%',
            // alignSelf: 'center',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({color}) => renderHomeIcon(color),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: '',
          tabBarIcon: ({color}) => renderFavIcon(color),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({color}) => renderSearchIcon(color),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({color}) => renderProfileIcon(color),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({color}) => renderSettingsIcon(color),
        }}
      />
    </Tabs>
  );
}
