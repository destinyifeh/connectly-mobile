import {AppAlert} from '@/components/AppAlert';
import {AppContainer} from '@/components/AppContainer';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {Octicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';

export const AccountSettingsScreen = () => {
  const router = useRouter();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onLogoutProceed = () => {
    setIsLogoutModalVisible(false);
  };

  const onLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const onDeleteAccountProceed = () => {
    setIsDeleteModalVisible(false);
  };

  const onDeleteCancel = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDeleteModalVisible(false);
    }, 5000);
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Account settings">
      <ScrollView
        className="w-full"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/change-password')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Change Password
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/change-email')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Change Email Address
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/change-phone')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Change phone number
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsLogoutModalVisible(true)}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">Logout</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsDeleteModalVisible(true)}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-red-500 font-sans text-base">
            Delete Account
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
      </ScrollView>
      <AppAlert
        onPressButtonOne={onDeleteAccountProceed}
        isModalVisible={isDeleteModalVisible}
        onPressButtonTwo={onDeleteCancel}
        buttonTextOne="Delete"
        buttonTextTwo="Cancel"
        message="Do you want to delete this account?"
        buttonTextOneColor="#D70909"
        isLoading={isLoading}
      />

      <AppAlert
        onPressButtonOne={onLogoutProceed}
        isModalVisible={isLogoutModalVisible}
        buttonTextOne="Logout"
        buttonTextTwo="Cancel"
        onPressButtonTwo={onLogoutCancel}
        message="Do you want to logout?"
        buttonTextOneColor={APP_DEFAULT_COLOUR}
        //buttonTextTwoColor="black"
      />
    </AppContainer>
  );
};

export default AccountSettingsScreen;
