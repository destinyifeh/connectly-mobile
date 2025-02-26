import {AppAlert} from '@/components/AppAlert';
import {AppContainer} from '@/components/AppContainer';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {Octicons} from '@expo/vector-icons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {Toast} from 'toastify-react-native';

export const AccountSettingsScreen = () => {
  const router = useRouter();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {logoutUser, currentUser} = useUserStore(state => state);
  const {themeColor} = useGlobalStore(state => state);

  const {mutate} = apiHookRequester.useDeleteData(
    `/api/v1/user/delete/${currentUser?._id}`,
  );

  const onLogoutProceed = async () => {
    setIsLogoutModalVisible(false);
    if (currentUser?.isGoogleAuthUser) {
      await GoogleSignin.signOut();
    }
    logoutUser();
  };

  const onLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const onDeleteAccountProceed = () => {
    setIsLoading(true);
    const payload = {
      userid: currentUser._id,
    };
    mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data, 'deleted');
        Toast.success('Account deleted', 'bottom');
        setIsDeleteModalVisible(false);
        onLogoutProceed();
      },
      onError(error, variables, context) {
        console.log(error, 'deleted-err');
        Toast.error('OOps! Something went wrong. Try again', 'bottom');
      },
      onSettled(data, error, variables, context) {
        setIsLoading(false);
      },
    });
  };

  const onDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Account settings">
      <ScrollView
        className="w-full"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/change-password')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Change Password
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/change-email')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Change Email Address
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/basic-info')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Basic Info
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsLogoutModalVisible(true)}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Logout
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsDeleteModalVisible(true)}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-red-500 font-sans text-base"
            style={{color: themeColor.text}}>
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
