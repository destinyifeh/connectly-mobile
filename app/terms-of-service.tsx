import {AppContainer} from '@/components/AppContainer';
import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {APP_DEFAULT_COLOUR, COLOUR_LINK} from '@/constants/Styles';
import {Entypo} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import appTandC from '../constants/terms-of-service.json';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const currentDate = moment().format('DD MMM YYYY');

  const {sections = []} = appTandC.content;
  const {content} = appTandC;

  return (
    <AppContainer showBackButton showScreenTitle title="Terms of Service">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10 px-3">
        <View style={styles.textContainer}>
          <Text style={styles.currentDate}>Current as of {currentDate}</Text>

          {/* <Text style={styles.textTitle}>{content.title}</Text> */}
          <Text style={styles.textDesc}>{content.intro}</Text>
        </View>

        {sections.map((item, idx) => (
          <View style={styles.textContainer} key={`${item.title}-${idx}`}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textDesc}>
              {item.content
                .split('[link to Privacy Policy]')
                .map((part, index) =>
                  index === 1 ? (
                    <Text key={index}>
                      <Text
                        style={{
                          color: COLOUR_LINK,
                          textDecorationLine: 'underline',
                        }}
                        onPress={() => router.push('/privacy-policy')}>
                        Privacy Policy
                      </Text>
                      . By using the Service, you consent to our collection and
                      use of your information as described in the Privacy
                      Policy.
                    </Text>
                  ) : (
                    part
                  ),
                )}
            </Text>

            {item?.points?.map((item, idx) => (
              <View style={{flexDirection: 'row', padding: 5}} key={idx}>
                <Entypo name="dot-single" color="grey" size={25} />
                <Text style={styles.textDesc}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.textContainer}>
          <Text style={styles.textDesc}>{content.closing}</Text>
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
