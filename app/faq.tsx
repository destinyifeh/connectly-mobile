import {AppContainer} from '@/components/AppContainer';
import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {APP_DEFAULT_COLOUR, COLOUR_LINK} from '@/constants/Styles';
import {useRouter} from 'expo-router';
import appTandC from '../constants/terms-of-service.json';

export default function FaqScreen() {
  const router = useRouter();

  const currentDate = moment().format('DD MMM YYYY');

  const {sections = []} = appTandC.content;
  const {content} = appTandC;

  return (
    <AppContainer showBackButton showScreenTitle title="User Support FAQ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10">
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            1. How can I delete my Connectly account?
          </Text>
          <Text style={styles.textDesc}>
            To delete your Connectly account, please navigate to the account
            settings within the app. There you will find the option to delete
            your account. If you need further assistance, you can contact our
            support team via email or WhatsApp for help.
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            2. What happens to my data when I delete my account?
          </Text>
          <Text style={styles.textDesc}>
            When you delete your Connectly account, all your personal data and
            transaction history will be permanently removed from our servers.
            Please ensure that you have saved any important information before
            proceeding with the deletion.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            3. How can other users contact me through the Connectly app?
          </Text>
          <Text style={styles.textDesc}>
            Other users can reach you via email, WhatsApp, phone call, and text
            messages. Make sure your contact information is up-to-date in your
            profile settings to allow seamless communication.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            4. Is there a way to block other users from contacting me?
          </Text>
          <Text style={styles.textDesc}>
            If you wish to block other users from contacting you, you can adjust
            your privacy settings in the app. This will limit the ways in which
            other users can interact with you.
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            5. What should I do if I am experiencing issues with the Connectly
            app?
          </Text>
          <Text style={styles.textDesc}>
            If you encounter any issues while using the Connectly app, please
            reach out to our{' '}
            <Text
              onPress={() => router.push('/feedback')}
              style={{
                color: COLOUR_LINK,
                fontFamily: 'sans',
              }}>
              support team{' '}
            </Text>
            . You can also consult the help section within the app for
            troubleshooting tips.
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            6. Can I reactivate my account after deleting it?
          </Text>
          <Text style={styles.textDesc}>
            Once your Connectly account is deleted, it cannot be reactivated. If
            you wish to use Connectly again, you will need to create a new
            account.
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            7. How can I reach customer support for urgent issues?
          </Text>
          <Text style={styles.textDesc}>
            For urgent issues, you can contact our{' '}
            <Text
              onPress={() => router.push('/feedback')}
              style={{
                color: COLOUR_LINK,
                fontFamily: 'sans',
              }}>
              customer support team{' '}
            </Text>
            {/* directly via phone call or text message */}. Our support team is
            available to assist you promptly.
          </Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 20,
  },

  textTitle: {
    fontFamily: 'sans',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 23.44,
    color: '#666464',
    marginBottom: 5,
  },

  textDesc: {
    fontFamily: 'sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#666464',
  },
  currentDate: {
    fontFamily: 'sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.41,
    color: APP_DEFAULT_COLOUR,
    marginBottom: 8,
  },
});
