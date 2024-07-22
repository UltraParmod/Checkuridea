import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from '../Utails/Colors'
import { hp, wp } from '../Utails/Responsive'
import VectorIcon from '../Utails/VectorIcon'
import Fonts from '../Utails/Fonts'
import StringsName from '../Utails/StringsName'
import Male from '../Assets/Svg/Male.svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonCom from '../Components/ButtonCom'
import ImagePath from '../Utails/ImagePath'
import HeaderGoback from '../Components/HeaderGoback'
import ActiveEyes from '../Assets/Svg/ActiveEyes.svg';
import InActiveEyes from '../Assets/Svg/InActiveEyes.svg';
import ScreensName from '../Utails/ScreensName'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateNewPassword = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confpassword, setConfPassword] = useState('');
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const _logout = () => {
        AsyncStorage.clear();
        navigation.replace(ScreensName.LOGIN)
    }
    return (
        <View style={styles.container}>
            <HeaderGoback title={StringsName.createNewPassword} />
            <KeyboardAwareScrollView extraHeight={150} showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: 'center', marginVertical: hp(5) }}>
                    <Male />
                </View>
                <View
                    style={[
                        styles.passwordContiaer,
                        { borderColor: !password ? Colors.ExtraLightGray : Colors.Primary },
                    ]}>
                    <TextInput
                        placeholder={StringsName.newPassword}
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
                <View
                    style={[
                        styles.passwordContiaer,
                        { borderColor: !confpassword ? Colors.ExtraLightGray : Colors.Primary },
                    ]}>
                    <TextInput
                        placeholderTextColor={Colors.Gray}
                        placeholder={StringsName.confirmPassword}
                        style={{ color: Colors.Black, borderRadius: wp(2), paddingVertical: hp(0), width: '90%' }}
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
                <ButtonCom disabled={
                    password && confpassword ? false : true
                } containerStyle={{ marginVertical: hp(5), width: '100%', backgroundColor: password && confpassword ? Colors.Primary : Colors.disabled }} title={StringsName.submit} onPress={() => {
                    setModalVisible(true)
                }} />
                <View style={styles.containerModel}>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/* <StatusBar /> */}
                                <StatusBar
                                    barStyle="light-content"
                                    // barStyle='dark-content'
                                    backgroundColor='rgba(0,0,0,0.5)' />
                                <ImageBackground source={ImagePath.passwordResetImgInner} style={styles.passwordResetImgInner}>
                                    <Image source={ImagePath.passwordResetImg} style={styles.passwordResetImg} />
                                </ImageBackground>

                                <Text style={styles.passwordResetSuccessfully}>{StringsName.passwordResetSuccessfully}</Text>
                                <Text style={styles.loginWithNewPassword}>{StringsName.loginWithNewPassword}</Text>

                                <ButtonCom containerStyle={{ marginVertical: hp(5), width: '100%' }} title={StringsName.proceed} onPress={() => {
                                    // setModalVisible(!modalVisible)
                                    // navigation.replace(ScreensName.LOGIN)
                                    _logout()
                                }} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default CreateNewPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6)
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
        alignItems: 'center'
    },
    passwordResetSuccessfully: {
        fontSize: hp(2),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.Black
    },
    passwordResetImg: {
        alignItems: 'center',
        width: wp(45),
        height: wp(45)
    },
    loginWithNewPassword: {
        color: Colors.textBlack,
        fontFamily: Fonts.POPPINS_REGULAR,
        fontSize: hp(1.6)
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


})

