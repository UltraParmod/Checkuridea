import React, { useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../Utails/Colors';
import VectorIcon from '../Utails/VectorIcon';
import {hp, wp} from '../Utails/Responsive';
import Fonts from '../Utails/Fonts';
import StringsName from '../Utails/StringsName';
import ImagePath from '../Utails/ImagePath';
import ScreensName from '../Utails/ScreensName';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActiveEmail from '../Assets/Svg/ActiveEmail.svg';
import InActiveEmail from '../Assets/Svg/InActiveEmail.svg';
import HeaderGoback from '../Components/HeaderGoback';
import Config from '../Constants/Config';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [Loadgin, setLoading] = useState(false);

  // validation email
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const _forgotPassword = async () => {
    if (validateEmail(email)) {
      setLoading(true);

      try {
        const response = await axios.post(
          Config.BaseUrl + Config.forgotApi + Config.Apikey,
          {
            bemailid: email,
          },
        );
        // console.log('data is here.. forgot..', response.data?.msg )
        setLoading(false);
        setEmail('');
        if (response.data?.statusCode === 200) {
          navigation.navigate(ScreensName.LOGIN);
          Toast.show({
            type: 'success',
            text1: response.data?.msg,
            text2: response.data?.msg,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response.data?.msg,
            text2: response.data?.msg,
          });
        }
      } catch (error) {
        setLoading(false);
        // console.log(error);
        Toast.show({
          type: 'error',
          text1: error,
          text2: error,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: "Invalid Email Address', 'Please enter a valid email address.",
        text2: "Invalid Email Address', 'Please enter a valid email address.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: 999}}>
        <Toast />
      </View>
      <HeaderGoback title={StringsName.forgotPassword} />
      {Loadgin && (
        <ActivityIndicator
          color={Colors.Primary}
          size="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 999,
            alignSelf: 'center',
          }}
        />
      )}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={150}>
        <View style={{marginVertical: hp(6)}}>
          <Image
            source={ImagePath.GetCertified}
            style={{alignSelf: 'center'}}
          />
          <View style={{marginTop: hp(10), marginBottom: hp(2.5)}}>
            <View
              style={[
                styles.passwordContiaer,
                {borderColor: !email ? Colors.ExtraLightGray : Colors.Primary},
              ]}>
              <TextInput
                placeholder={StringsName.email}
                keyboardType="email-address"
                placeholderTextColor={Colors.Gray}
                style={{
                  borderRadius: wp(2),
                  paddingVertical: hp(0),
                  width: '90%',
                  color: Colors.textBlack,
                }}
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowEmail(!showEmail)}>
                {email ? (
                  <ActiveEmail />
                ) : (
                  <View style={{marginTop: hp(0.5)}}>
                    <InActiveEmail />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            disabled={!email ? true : false}
            style={[
              styles.btnContainer,
              {backgroundColor: !email ? Colors.disabled : Colors.Primary},
            ]}
            onPress={() => {
              // navigation.replace(ScreensName.LOGIN);
              _forgotPassword();
            }}>
            <VectorIcon
              name={'send-sharp'}
              type={'Ionicons'}
              size={hp(2.5)}
              color={Colors.White}
              style={{marginRight: wp(3)}}
            />
            <Text style={styles.btnTitle}>{StringsName.send}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.signUp,
            {color: Colors.textBlack, textDecorationLine: 'none'},
          ]}>
          {' '}
          Please verification your eamil Id &{' '}
          <Text
            style={styles.signUp}
            onPress={() => {
              navigation.navigate(ScreensName.LOGIN);
            }}>
            {StringsName.signIn}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(6),
  },
  btnContainer: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.7),
    backgroundColor: Colors.Primary,
    borderRadius: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    textAlign: 'center',
    fontSize: hp(1.8),
    color: Colors.White,
    textTransform: 'uppercase',
    fontFamily: Fonts.POPPINS_SEMIBOLD,
  },
  passwordContiaer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    borderWidth: wp(0.3),
    borderColor: Colors.ExtraLightGray,
    borderRadius: 5,
    paddingVertical: hp(1),
    marginBottom: hp(3),
  },
  signUp: {
    textAlign: 'center',
    marginTop: hp(-3),
    marginBottom: hp(5),
    textDecorationLine: 'underline',
    color: Colors.Primary,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: hp(1.5),
  },
});
