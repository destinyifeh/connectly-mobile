import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {AppContainer} from '@/components/AppContainer';
import {APP_DEFAULT_COLOUR, COLOUR_LINK} from '@/constants/Styles';
import {Entypo} from '@expo/vector-icons';
import privacyData from '../constants/privacy-policy.json';

export default function PrivacyPolicyScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();

  const currentDate = moment().format('DD MMM YYYY');

  const {privacyPolicy} = privacyData;

  const {
    howWeUseYourInformation,
    sharingYourInformation,
    dataRetention,
    yourRightsAndChoices,
  } = privacyPolicy;

  return (
    <AppContainer showBackButton showScreenTitle title="Privacy Policy">
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={[styles.contentContainer]}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Privacy Policy for Connectly</Text>
            <Text style={[styles.textTitle, {fontSize: 16}]}>Introduction</Text>
            <Text style={styles.textDesc}>{privacyPolicy.introduction}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Information We Collect</Text>
            <Text style={styles.textDesc}>
              We may collect the following types of information when you use our
              Service:
            </Text>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                {/* <Entypo name="dot-single" color="grey" size={25} /> */}
                <Text style={[styles.textTitle, {fontSize: 16}]}>1. </Text>

                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Personal Information:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                When you sign up, or contact us, we may collect personally
                identifiable information such as:
              </Text>

              <View>
                {privacyPolicy.informationWeCollect.personalInformation.map(
                  (item, idx) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 1,
                        marginLeft: 15,
                      }}
                      key={idx}>
                      <Entypo name="dot-single" color="grey" size={25} />
                      <Text style={[styles.textTitle, {fontSize: 14}]}>
                        {' '}
                        {item}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>3. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Usage Data:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                Information about how you use our Service, such as:
              </Text>

              <View>
                {privacyPolicy.informationWeCollect.usageData.map(
                  (item, idx) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 1,
                        marginLeft: 15,
                      }}
                      key={idx}>
                      <Entypo name="dot-single" color="grey" size={25} />
                      <Text style={[styles.textTitle, {fontSize: 14}]}>
                        {' '}
                        {item}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>4. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Location Data:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                If you allow location services, we may collect geolocation data
                to provide location-based services such as nearby users.
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>5. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Communication Data:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                Data from interactions with customer service or support teams,
                including chat messages, email correspondence, or phone calls.
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>How We Use Your Information</Text>
            <Text style={styles.textDesc}>
              We use the information we collect for the following purposes:
            </Text>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>2. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  To Provide Customer Support:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {howWeUseYourInformation.toProvideCustomerSupport}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>3. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  To Improve Our Service:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {howWeUseYourInformation.toImproveOurService}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>4. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  For Communication:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {howWeUseYourInformation.forCommunication}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>5. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  To Comply with Legal Obligations:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {howWeUseYourInformation.toComplyWithLegalObligations}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Sharing Your Information</Text>
            <Text style={styles.textDesc}>
              We may share your personal information with third parties in the
              following situations:
            </Text>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>1. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Service Providers:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {sharingYourInformation.serviceProviders}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>2. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Business Transfers:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {sharingYourInformation.businessTransfers}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>3. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Legal Compliance:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {sharingYourInformation.legalCompliance}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>4. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  With Your Consent:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {sharingYourInformation.withYourConsent}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Data Retention</Text>
            <Text style={styles.textDesc}>{dataRetention}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Your Rights and Choices</Text>
            <Text style={styles.textDesc}>
              Depending on your location, you may have the following rights:
            </Text>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>1. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Access and Update:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.accessAndUpdate}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>2. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Delete Your Account:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.deleteYourAccount}
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>3. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Opt-Out of Marketing Communications:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.optOutOfMarketingCommunications}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>4. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Location Services:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.locationServices}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>5. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Data Portability:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.dataPortability}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Text style={[styles.textTitle, {fontSize: 16}]}>6. </Text>
                <Text style={[styles.textTitle, {fontSize: 16}]}>
                  Restrict Processing:
                </Text>
              </View>
              <Text style={styles.textDesc}>
                {yourRightsAndChoices.restrictProcessing}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Security</Text>
            <Text style={styles.textDesc}>{privacyPolicy.security}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Third-Party Links</Text>
            <Text style={styles.textDesc}>{privacyPolicy.thirdPartyLinks}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Children’s Privacy</Text>
            <Text style={styles.textDesc}>
              {privacyPolicy.childrensPrivacy}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Changes to This Privacy Policy</Text>
            <Text style={styles.textDesc}>
              {privacyPolicy.changesToThisPolicy}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Contact Us</Text>
            <Text style={styles.textDesc}>
              {privacyPolicy.contactUs.description}
            </Text>
            <View>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Entypo name="dot-single" color="grey" size={25} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: 3,
                  }}>
                  <Text style={[styles.textTitle, {fontSize: 16}]}>Email:</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${'09033838383'}`)}>
                    <Text style={[styles.textDesc, {color: COLOUR_LINK}]}>
                      {privacyPolicy.contactUs.email}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignSelf: 'center',
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
    }),
  },
  headerTitle: {
    fontFamily: 'sans',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18.75,
    color: APP_DEFAULT_COLOUR,
  },

  backButton: {
    position: 'absolute',
    left: 15,
  },

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
