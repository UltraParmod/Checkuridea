// Library
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    View,
    Modal,
    StatusBar,
} from 'react-native';
import Colors from '../Utails/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import ButtonCom from '../Components/ButtonCom';

// Utails
import ImagePath from '../Utails/ImagePath';
import { hp, wp } from '../Utails/Responsive';
import StringsName from '../Utails/StringsName';
import Fonts from '../Utails/Fonts';
import ScreensName from '../Utails/ScreensName';

import ActiveEmail from '../Assets/Svg/ActiveEmail.svg';
import InActiveEmail from '../Assets/Svg/InActiveEmail.svg';
import ActiveEyes from '../Assets/Svg/ActiveEyes.svg';
import InActiveEyes from '../Assets/Svg/InActiveEyes.svg';
import axios from 'axios';
import Config from '../Constants/Config';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const [showEmail, setShowEmail] = useState(false);
    const [Loadgin, setLoading] = useState(false);
    const navigation = useNavigation();
   // validation email
   const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
    const _userLogin = async () => {
        if (validateEmail(email)) {
        setLoading(true);
        try {
            const response = await axios.post(
                Config.BaseUrl + Config.loginApi + Config.Apikey,
                {
                    bemailid: email,
                    password: password
                },
            );
            // console.log('data is here.. Login..',  response?.data)   
            await AsyncStorage.setItem('apiData', JSON.stringify(response?.data?.body));
           
            setLoading(false);
            setEmail('')
            setPassword('')
            if (response?.data?.statusCode === 200) {
                navigation.navigate(ScreensName.DRAWERNAVIGATION);
                Toast.show({
                    type: 'success',
                    text1: response?.data?.msg,
                    text2: response?.data?.msg,
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.data?.msg,
                    text2: response?.data?.msg
                })
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

    }else{
        Toast.show({
            type: 'error',
            text1: "Invalid Email Address', 'Please enter a valid email address.",
            text2: "Invalid Email Address', 'Please enter a valid email address.",
          });
    }
    };


    return (
        <View style={styles.contianer}>
            <View style={{zIndex:999}}>
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
                <View style={styles.imgContainer}>
                    <Image source={ImagePath.loginLogo} style={styles.logo} />
                </View>
                <Text style={styles.loginTxt}>{StringsName.loginTxt}</Text>
                <View
                    style={[
                        styles.passwordContiaer,
                        { borderColor: !email ? Colors.ExtraLightGray : Colors.Primary },
                    ]}>
                    <TextInput
                        placeholder={StringsName.email}
                        keyboardType='email-address'
                        placeholderTextColor={Colors.Gray}
                        style={{ color: Colors.Black, borderRadius: wp(2), paddingVertical: hp(0), width: '90%' }}
                        value={email}
                        onChangeText={setEmail}
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
                <View
                    style={[
                        styles.passwordContiaer,
                        { borderColor: !password ? Colors.ExtraLightGray : Colors.Primary },
                    ]}>
                    <TextInput
                        placeholder={StringsName.password}
                        placeholderTextColor={Colors.Gray}
                        style={{ color: Colors.Black, borderRadius: wp(2), paddingVertical: hp(0), width: '90%' }}
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
                <Text
                    onPress={() => {
                        navigation.navigate(ScreensName.FORGOTPASSWORD);
                    }}
                    style={styles.forgotPassword}>
                    {StringsName.forgotPassword}
                </Text>
                <Text style={styles.donthaveAccount}>
                    {StringsName.donthaveAccount}{' '}
                    <Text
                        style={styles.signUp}
                        onPress={() => {
                            navigation.navigate(ScreensName.SIGNUP);
                        }}>
                        {StringsName.signUp}
                    </Text>
                </Text>

                <View style={styles.btnContainer}>
                    <ButtonCom
                        disabled={
                            !email && !password ?
                                true :
                                false
                        }
                        titleStyle={{ fontSize: hp(2) }}
                        containerStyle={{
                            width: '100%',
                            backgroundColor:
                                email && password ? Colors.Primary : 'rgb(229,161,240)',
                        }}
                        title={StringsName.signIn}
                        onPress={() => {
                            // navigation.navigate(ScreensName.SIGNUP);
                            _userLogin()

                        }}
                    />
                </View>


              
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6),
    },
    imgContainer: {
        marginVertical: hp(4),
        marginTop: hp(8),
    },
    logo: {
        alignSelf: 'center',
    },
    loginTxt: {
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        fontSize: hp(4),
        color: Colors.Primary,
        marginBottom: hp(1),
    },
    containerStyle: {
        width: '50%',
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
    enterCaptcherContianer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginTop: hp(-0.4),
    },
    forgotPassword: {
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.Primary,
        fontSize: hp(2.1),
        marginVertical: hp(6),
        marginBottom: hp(1),
    },
    donthaveAccount: {
        fontFamily: Fonts.POPPINS_REGULAR,
        color: Colors.Black,
        textAlign: 'center',
        fontSize:hp(1.8)
    },
    signUp: {
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontSize:hp(1.7)
    },
    btnContainer: {
        marginVertical: hp(5),
    },
});
