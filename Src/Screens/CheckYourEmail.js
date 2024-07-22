import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { hp, wp } from '../Utails/Responsive';
import Fonts from '../Utails/Fonts';
import StringsName from '../Utails/StringsName';

import Colors from '../Utails/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderGoback from '../Components/HeaderGoback';
import ScreensName from '../Utails/ScreensName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckYourEmail = ({ navigation }) => {
    const [email, setEmail] = useState('')

    useEffect(() => {
        const _userEmail = async () => {
            const storedData = await AsyncStorage.getItem('apiData');
            let data = JSON.parse(storedData)
            setEmail(data.emailid)


        }
        _userEmail()
    }, []);
    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [count, setCount] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count == 0) {
                clearInterval(interval);
            } else {
                setCount(count - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [count]);
    const otpValidate = () => {
        let otp = '1234';
        let enterOtp = f1 + f2 + f3 + f4;
        if (enterOtp == otp) {
            // Alert.alert('OTP Matched ');
            navigation.navigate(ScreensName.CREATENEWPASSWORD)
        } else {
            Alert.alert('Wrong OTP');
        }
    };
    return (
        <View style={styles.container}>
            <HeaderGoback title={StringsName.checkYourEmail} />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraHeight={150}>
                <Text style={styles.codeTxt}>
                    {StringsName.weSendCode}{' '}
                    <Text style={styles.email}> {email} parmodkumar@gmail.com</Text>
                    {StringsName.fourDigitCode}
                </Text>

                <View style={styles.otpView}>
                    <TextInput
                        ref={et1}
                        style={[
                            styles.inputView,
                            { borderColor: f1.length >= 1 ? 'blue' : '#000' },
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f1}
                        onChangeText={txt => {
                            setF1(txt);
                            if (txt.length >= 1) {
                                et2.current.focus();
                            }
                        }}
                    />
                    <TextInput
                        ref={et2}
                        style={[
                            styles.inputView,
                            { borderColor: f2.length >= 1 ? 'blue' : '#000' },
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f2}
                        onChangeText={txt => {
                            setF2(txt);
                            if (txt.length >= 1) {
                                et3.current.focus();
                            } else if (txt.length < 1) {
                                et1.current.focus();
                            }
                        }}
                    />
                    <TextInput
                        ref={et3}
                        style={[
                            styles.inputView,
                            { borderColor: f3.length >= 1 ? 'blue' : '#000' },
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f3}
                        onChangeText={txt => {
                            setF3(txt);
                            if (txt.length >= 1) {
                                et4.current.focus();
                            } else if (txt.length < 1) {
                                et2.current.focus();
                            }
                        }}
                    />
                    <TextInput
                        ref={et4}
                        style={[
                            styles.inputView,
                            { borderColor: f4.length >= 1 ? 'blue' : '#000' },
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f4}
                        onChangeText={txt => {
                            setF4(txt);
                            if (txt.length >= 1) {
                                et4.current.focus();
                            } else if (txt.length < 1) {
                                et3.current.focus();
                            }
                        }}
                    />
                </View>
                <Text style={styles.haveYouGotYet}>
                    {StringsName.haveYouGotYet}
                    {!count !== 0 && (
                        <Text
                            disabled={count == 0 ? false : true}
                            style={[
                                styles.resendEmail,
                                { color: count == 0 ? Colors.Primary : 'gray' },
                            ]}
                            onPress={() => {
                                setCount(60);
                            }}>
                            {StringsName.resendEmail}
                        </Text>
                    )}{' '}
                    <Text style={{ color: Colors.Primary, fontSize: hp(1.6) }}>
                        {count}
                    </Text>
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        otpValidate();
                    }}
                    disabled={
                        f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true
                    }
                    style={[
                        styles.VerifyBtn,
                        {
                            backgroundColor:
                                f1 !== '' && f2 !== '' && f3 !== '' && f4 !== ''
                                    ? Colors.Primary
                                    : 'rgba(192, 30, 219, .4)',
                        },
                    ]}>
                    <Text style={styles.verifyTxt}>{StringsName.verifyCode}</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default CheckYourEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6),
    },
    otpView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputView: {
        width: wp(19),
        height: wp(15),
        borderRadius: wp(2),
        backgroundColor: Colors.Primary,
        textAlign: 'center',
        color: Colors.White,
        fontSize: hp(3.2),
        fontWeight: '600',
    },
    codeTxt: {
        marginTop: hp(16),
        marginBottom: hp(5),
        alignSelf: 'center',
        color: Colors.textBlack,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontSize: hp(1.5),
    },
    email: {
        fontWeight: 'bold',
    },
    haveYouGotYet: {
        marginVertical: hp(4),
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: hp(1.6),
        color: Colors.Gray,
    },
    resendEmail: {
        color: Colors.Primary,
        textDecorationLine: 'underline',
    },
    VerifyBtn: {
        backgroundColor: Colors.Primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
        paddingVertical: hp(2),
        marginVertical: hp(5),
    },
    verifyTxt: {
        textAlign: 'center',
        fontSize: hp(1.8),
        color: Colors.White,
        textTransform: 'uppercase',
        fontFamily: Fonts.POPPINS_SEMIBOLD,
    },
});
