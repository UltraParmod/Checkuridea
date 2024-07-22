// Library
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import publicIP from 'react-native-public-ip';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// Utails
import Colors from '../Utails/Colors';
import ImagePath from '../Utails/ImagePath';
import { hp, wp } from '../Utails/Responsive';
import Fonts from '../Utails/Fonts';
import StringsName from '../Utails/StringsName';
import ScreensName from '../Utails/ScreensName';

// Components
import InputCom from '../Components/InputCom';
import ButtonCom from '../Components/ButtonCom';

// Assets
import ActiveEmail from '../Assets/Svg/ActiveEmail.svg';
import InActiveEmail from '../Assets/Svg/InActiveEmail.svg';
import ActiveEyes from '../Assets/Svg/ActiveEyes.svg';
import InActiveEyes from '../Assets/Svg/InActiveEyes.svg';
import ActiveCalender from '../Assets/Svg/ActiveCalender.svg';
import InActiveCalender from '../Assets/Svg/InActiveCalender.svg';

// Constants
import Config from '../Constants/Config';


const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [ip, setIP] = useState(null);
  const [Loadgin, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordColor, setPasswordColor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblePivecy, setModalVisiblePrivicy] = useState(false);


  // validation email
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // validation of password
  const evaluatePasswordStrength = password => {
    const minLength = 8;
    const maxLength = 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length === 0) {
      return { strength: '', color: '' };
    } else if (password.length < minLength) {
      return { strength: 'Very Weak', color: 'red' };
    } else if (
      password.length < 12 &&
      (!hasLetter || !hasNumber || !hasSymbol)
    ) {
      return { strength: 'Weak', color: 'orange' };
    } else if (
      password.length >= maxLength &&
      hasLetter &&
      hasNumber &&
      hasSymbol
    ) {
      return { strength: 'Strong', color: 'green' };
    }
    return { strength: 'Strong', color: 'green' };
  };
  const handlePasswordChange = text => {
    setPassword(text);
    const { strength, color } = evaluatePasswordStrength(text);
    setPasswordStrength(strength);
    setPasswordColor(color);
    setPasswordValid(strength === 'Strong');
    if (strength !== 'Strong') {
    }
  };
  // date Of birth formate
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const extractDate = isoString => {
    return isoString.split('T')[0];
  };
  useEffect(() => {
    publicIP()
      .then(ip => {
        setIP(ip);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const _userRegsiter = async () => {
    if (validateEmail(email)) {
      setLoading(true);
      let filterDate = extractDate(date.toISOString());
      try {
        const response = await axios.post(
          Config.BaseUrl + Config.signupApi + Config.Apikey,
          {
            fname: firstName,
            lname: lastName,
            phone: mobileNo,
            emailid: email,
            password: password,
            dob: filterDate,
            ipaddress: ip,
          },
        );
        const dataaa = JSON.parse(response?.data);
        // console.log('data is here..fff..', dataaa[0]?.statusCode);
        setLoading(false);
        setFirstName('');
        setLastName('');
        setMobileNo('');
        setEmail('');
        setPassword('');
        setDate('');
        if (dataaa[0]?.statusCode === 200) {
          navigation.navigate(ScreensName.LOGIN);
          Toast.show({
            type: 'success',
            text1: dataaa[0]?.msg,
            text2: dataaa[0]?.msg,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: dataaa[0]?.msg,
            text2: dataaa[0]?.msg,
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
    <View style={styles.contianer}>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
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
        extraHeight={150}
        showsVerticalScrollIndicator={false}>
        <View style={styles.signupLogoContainer}>
          <Image source={ImagePath.signupLogo} style={styles.signupLogo} />
        </View>
        <Text style={styles.loginTxt}>{StringsName.signUp}</Text>

        <View style={styles.inputContainer}>
          <View
            style={[
              styles.passwordContiaer,
              {
                borderColor: !firstName
                  ? Colors.ExtraLightGray
                  : Colors.Primary,
                width: '48%',
              },
            ]}>
            <TextInput
              placeholder={StringsName.firstName}
              placeholderTextColor={Colors.Gray}
              style={styles.inputStyle}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View
            style={[
              styles.passwordContiaer,
              {
                borderColor: !lastName ? Colors.ExtraLightGray : Colors.Primary,
                width: '48%',
              },
            ]}>
            <TextInput
              placeholder={StringsName.lastName}
              placeholderTextColor={Colors.Gray}
              style={styles.inputStyle}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View
          style={[
            styles.passwordContiaer,
            { borderColor: !mobileNo ? Colors.ExtraLightGray : Colors.Primary },
          ]}>
          <TextInput
            placeholder={StringsName.phoneNo}
            placeholderTextColor={Colors.Gray}
            style={styles.inputStyle}
            value={mobileNo}
            onChangeText={setMobileNo}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        <View
          style={[
            styles.passwordContiaer,
            { borderColor: !email ? Colors.ExtraLightGray : Colors.Primary },
          ]}>
          <TextInput
            placeholder={StringsName.email}
            placeholderTextColor={Colors.Gray}
            style={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowEmail(!showEmail)}>
            {email ? (
              <ActiveEmail />
            ) : (
              <View style={{ marginTop: hp(0.5) }}>
                <InActiveEmail />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={[
              styles.passwordContiaer,
              { borderColor: !password ? Colors.ExtraLightGray : Colors.Primary },
            ]}>
            <TextInput
              placeholderTextColor={Colors.Gray}
              placeholder={StringsName.password}
              style={styles.inputStyle}
              value={password}
              // onChangeText={setPassword}
              secureTextEntry={!showPassword}
              maxLength={16}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <ActiveEyes /> : <InActiveEyes />}
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: hp(1), left: wp(1) }}>
            {password ? (
              <Text style={{ color: passwordColor, fontSize: hp(1.3) }}>
                {passwordStrength}{' '}
                <Text style={{ color: 'gray' }}>
                  Password must have{' '}
                  <Text style={{ color: 'black', fontWeight: '500' }}>
                    ("character number & symbol")
                  </Text>
                </Text>
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={[
            styles.passwordContiaer,
            {
              borderColor: !date ? Colors.ExtraLightGray : Colors.Primary,
              alignItems: 'center',
            },
          ]}>
          {show && (
            <DateTimePicker
              // minimumDate={new Date()}
              maximumDate={eighteenYearsAgo}
              testID="dateTimePicker"
              value={date || eighteenYearsAgo}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          {date ? (
            <Text style={{ color: Colors.textBlack, fontSize: hp(1.8) }}>
              {extractDate(date.toISOString())}
            </Text>
          ) : (
            <Text style={{ color: Colors.Gray }}>{StringsName.dateOfBirth}</Text>
          )}
          <TouchableOpacity style={styles.icon} onPress={() => setShow(true)}>
            {date ? <ActiveCalender /> : <InActiveCalender />}
          </TouchableOpacity>
        </View>
        <View style={styles.enterCaptcherContianer}>
          <InputCom
            placeholder={StringsName.enterCaptcher}
            containerStyle={{ width: '52%' }}
          />

          <View style={styles.captchaCodeContainer}>
            <Text style={styles.captchaCode}>{StringsName.captchaCode}</Text>
            <Image
              source={ImagePath.captchaCode}
              style={styles.captchaCodeImg}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <ButtonCom
            disabled={!firstName && !password ? true : false}
            containerStyle={{
              width: '100%',
              backgroundColor:
                firstName && lastName && mobileNo && email && password && date
                  ? Colors.Primary
                  : 'rgb(229,161,240)',
            }}
            titleStyle={{ fontSize: hp(2) }}
            title={StringsName.signUp}
            onPress={() => {
              //   navigation.navigate(ScreensName.DRAWERNAVIGATION);
              _userRegsiter();
            }}
          />
          <Text style={styles.alreadyhaveAccout}>
            {StringsName.alreadyhaveAccout}{' '}
            <Text
              style={styles.signUp}
              onPress={() => {
                navigation.navigate(ScreensName.LOGIN);
              }}>
              {StringsName.signIn}
            </Text>
          </Text>
          <Text style={styles.byYouAccept}>
            {StringsName.byYouAccept}
            <Text
              onPress={() => {
                // navigation.navigate(ScreensName.TERMSERVICES);
                // Linking.openURL('https://www.checkuridea.com/terms-condition')
                setModalVisible(true);
              }}
              style={styles.termsOfServices}>
              {StringsName.termsOfServices}
            </Text>
            <Text style={styles.and}> {StringsName.and} </Text>
            <Text
              onPress={() => {
                // navigation.navigate(ScreensName.TERMSERVICES);
                setModalVisiblePrivicy(true)
              }}
              style={styles.privacyPolicy}>
              {StringsName.privacyPolicy}
            </Text>
          </Text>
        </View>
        {/* Modal call here TERMSERVICES... */}
        <View style={styles.containerModel}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={styles.modelInerComtainer}>
              <Text style={styles.termsOfServicesModelheaderTxt}>{StringsName.termsOfServices}</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalView}>
                  <Text style={{ color: Colors.Black, textAlign: 'center', fontSize: hp(3), marginVertical: hp(25) }}>Comming Soon...</Text>
                  <ButtonCom
                    containerStyle={{
                      marginVertical: hp(5), width: '100%'
                      ,
                    }}
                    title={StringsName.close}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
        {/* Modal call here PRIVACY-POLICY */}
        <View style={styles.containerModel}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisiblePivecy}
            onRequestClose={() => {
              setModalVisiblePrivicy(!modalVisiblePivecy);
            }}>
            <View
              style={styles.modelInerComtainer}>
              <Text style={styles.termsOfServicesModelheaderTxt}>{StringsName.privacyPolicy}</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalView}>
                  <Text style={{ color: Colors.Black, textAlign: 'center', fontSize: hp(3), marginVertical: hp(25) }}>Comming Soon...</Text>
                  <ButtonCom
                    containerStyle={{
                      marginVertical: hp(5), width: '100%'
                      ,
                    }}
                    title={StringsName.close}
                    onPress={() => {
                      setModalVisiblePrivicy(!modalVisiblePivecy);
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(6),
  },
  signupLogoContainer: {
    marginVertical: hp(5),
    marginBottom: hp(2),
  },
  signupLogo: {
    alignSelf: 'center',
  },
  loginTxt: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: hp(4),
    color: Colors.Primary,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle: {
    width: '48%',
  },
  enterCaptcherContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  captchaCode: {
    fontSize: hp(1.8),
    color: Colors.Gray,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  captchaCodeContainer: {
    width: '42%',
  },
  captchaCodeImg: {
    marginTop: hp(-0.3),
  },
  alreadyhaveAccout: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.Black,
    textAlign: 'center',
    fontSize: hp(1.8),
    marginVertical: hp(2),
  },
  signUp: {
    color: Colors.Primary,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  btnContainer: {
    marginVertical: hp(2),
  },
  byYouAccept: {
    color: Colors.Gray,
    textAlign: 'center',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: hp(1.7),
  },
  termsOfServices: {
    color: Colors.Primary,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  and: {
    color: Colors.Gray,
  },
  privacyPolicy: {
    color: Colors.Primary,
  },
  inputStyle: {
    borderRadius: wp(2),
    paddingVertical: hp(0),
    width: '90%',
    color: Colors.textBlack,
  },
  // module style 
  modelInerComtainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '85%',
    width: '100%',
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    paddingHorizontal: wp(5.5),
    borderWidth: 1,
    borderColor: Colors.ExtraLightGray,
    paddingTop: hp(1)
  },
  termsOfServicesModelheaderTxt: {
    fontSize: hp(2.5),
    fontFamily: Fonts.POPPINS_REGULAR,
    marginTop: hp(1.5),
    color: Colors.Black
  }
});
