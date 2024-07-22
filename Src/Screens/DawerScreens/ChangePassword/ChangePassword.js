import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderGoback from '../../../Components/HeaderGoback';
import StringsName from '../../../Utails/StringsName';
import Colors from '../../../Utails/Colors';
import {hp, wp} from '../../../Utails/Responsive';
import Fonts from '../../../Utails/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonCom from '../../../Components/ButtonCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveEyes from '../../../Assets/Svg/ActiveEyes.svg';
import InActiveEyes from '../../../Assets/Svg/InActiveEyes.svg';
import ImagePath from '../../../Utails/ImagePath';
import ScreensName from '../../../Utails/ScreensName';
import axios from 'axios';
import Config from '../../../Constants/Config';
import Toast from 'react-native-toast-message';

export default function ChangePassword({navigation}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confpassword, setConfPassword] = useState('');
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [reConfpassword, setReConfPassword] = useState('');
  const [reshowConfPassword, setReShowConfPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Loadgin, setLoading] = useState(false);
  const _logout = () => {
    AsyncStorage.clear();
    navigation.replace(ScreensName.LOGIN);
  };
  
//   _userPasswordChange
  const _userPasswordChange = async () => {
    setLoading(true);
    try {
      AsyncStorage.getItem('apiData').then(result => {
        let data = JSON.parse(result);
        axios
          .post(Config.BaseUrl + Config.changepasswordApi + Config.Apikey, {
            emailid: data?.emailid,
            oldpassword: password,
            newpassword: confpassword,
            confirmpassword: reConfpassword,
          })
          .then(response => {
            // console.log('data is here.. Login..', response?.data);
            setLoading(false);
            setPassword('');
            setConfPassword('');
            setReConfPassword('');
            if (response?.data?.statusCode == 200) {
              Toast.show({
                type: 'success',
                text1: response?.data?.msg,
                text2: response?.data?.msg,
              });
              navigation.replace(ScreensName.LOGIN);
            } else {
              Toast.show({
                type: 'error',
                text1: response?.data?.msg,
                text2: response?.data?.msg,
              });
            }
          });
      });
    } catch (error) {
      setLoading(false);
      // console.log(error);
      Toast.show({
        type: 'error',
        text1: error,
        text2: error,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: 999}}>
        <Toast />
      </View>
      <HeaderGoback title={StringsName.changePassword} />
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
        <Text
          style={{
            color: Colors.textBlack,
            marginVertical: hp(2),
            fontSize: hp(1.5),
            fontFamily: Fonts.POPPINS_REGULAR,
          }}>
          {StringsName.changeNewPassword}
        </Text>
        <View
          style={[
            styles.passwordContiaer,
            {borderColor: !password ? Colors.ExtraLightGray : Colors.Primary},
          ]}>
          <TextInput
            placeholder={StringsName.oldPassword}
            placeholderTextColor={Colors.Gray}
            style={{
              color: Colors.Black,
              borderRadius: wp(2),
              paddingVertical: hp(0),
              width: '90%',
            }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <ActiveEyes /> : <InActiveEyes />}
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.passwordContiaer,
            {
              borderColor: !confpassword
                ? Colors.ExtraLightGray
                : Colors.Primary,
            },
          ]}>
          <TextInput
            placeholderTextColor={Colors.Gray}
            placeholder={StringsName.newPassword}
            style={{
              color: Colors.Black,
              borderRadius: wp(2),
              paddingVertical: hp(0),
              width: '90%',
            }}
            value={confpassword}
            onChangeText={setConfPassword}
            secureTextEntry={!showConfPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowConfPassword(!showConfPassword)}>
            {showConfPassword ? <ActiveEyes /> : <InActiveEyes />}
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordProtecttxt}>
          {StringsName.passwordProtecttxt01}
        </Text>
        <Text style={styles.passwordProtecttxt}>
          {StringsName.passwordProtecttxt02}
        </Text>
        <Text style={styles.passwordProtecttxt}>
          {StringsName.passwordProtecttxt03}
        </Text>
        <Text style={styles.passwordProtecttxt}>
          {StringsName.passwordProtecttxt04}
        </Text>
        <View
          style={[
            styles.passwordContiaer,
            {
              borderColor: !reConfpassword
                ? Colors.ExtraLightGray
                : Colors.Primary,
              marginTop: hp(2.3),
            },
          ]}>
          <TextInput
            placeholder={StringsName.confirmPassword}
            placeholderTextColor={Colors.Gray}
            style={{
              color: Colors.Black,
              borderRadius: wp(2),
              paddingVertical: hp(0),
              width: '90%',
            }}
            value={reConfpassword}
            onChangeText={setReConfPassword}
            secureTextEntry={!reshowConfPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setReShowConfPassword(!reshowConfPassword)}>
            {reshowConfPassword ? <ActiveEyes /> : <InActiveEyes />}
          </TouchableOpacity>
        </View>
        <ButtonCom
          disabled={password && confpassword && reConfpassword ? false : true}
          containerStyle={{
            marginVertical: hp(5),
            width: '100%',
            backgroundColor:
              password && confpassword && reConfpassword
                ? Colors.Primary
                : Colors.disabled,
          }}
          title={StringsName.submit}
          onPress={() => {
            // setModalVisible(true);
            // _logout()
            _userPasswordChange();
          }}
        />
        <View style={styles.containerModel}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <StatusBar /> */}
                <StatusBar
                  barStyle="light-content"
                  // barStyle='dark-content'
                  backgroundColor="rgba(0,0,0,0.5)"
                />
                <ImageBackground
                  source={ImagePath.passwordResetImgInner}
                  style={styles.passwordResetImgInner}>
                  <Image
                    source={ImagePath.passwordResetImg}
                    style={styles.passwordResetImg}
                  />
                </ImageBackground>

                <Text style={styles.passwordResetSuccessfully}>
                  {StringsName.passwordResetSuccessfully}
                </Text>
                <Text style={styles.loginWithNewPassword}>
                  {StringsName.loginWithNewPassword}
                </Text>

                <ButtonCom
                  containerStyle={{marginVertical: hp(5), width: '100%'}}
                  title={StringsName.proceed}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    // navigation.replace(ScreensName.LOGIN)
                    // _logout()
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(6),
  },
  containerModel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    bottom: hp(0),
    backgroundColor: 'white',
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    paddingHorizontal: wp(6),
    paddingBottom: hp(9),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  passwordResetImgInner: {
    width: wp(70),
    height: wp(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordResetSuccessfully: {
    fontSize: hp(2),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: Colors.Black,
  },
  passwordResetImg: {
    alignItems: 'center',
    width: wp(45),
    height: wp(45),
  },
  loginWithNewPassword: {
    color: Colors.textBlack,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: hp(1.6),
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
  passwordProtecttxt: {
    color: Colors.textBlack,
    fontSize: hp(1.5),
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});
