import { Alert, Image, Linking, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { colors } from '../global/styles';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';



import ImagePath from '../Utails/ImagePath';
import { useNavigation } from '@react-navigation/native';
import VectorIcon from '../Utails/VectorIcon';
import { hp, wp } from '../Utails/Responsive';
import Colors from '../Utails/Colors';
import Fonts from '../Utails/Fonts';
import StringsName from '../Utails/StringsName';
import ProfileIcon from '../Assets/Svg/ProfileIcon.svg'
import Support from '../Assets/Svg/Support.svg'
import Feedback from '../Assets/Svg/Feedback.svg'
import AboutIcon from '../Assets/Svg/AboutIcon.svg'
import Logout from '../Assets/Svg/Logout.svg'
import MyIdea from '../Assets/Svg/MyIdea.svg'
import PaaswordChange from '../Assets/Svg/PaaswordChange.svg'


import ScreensName from '../Utails/ScreensName';
import AsyncStorage from '@react-native-async-storage/async-storage';



// varables
const activeOpacity = .6

export default function DrawerContent(props) {
    const navigation = useNavigation()
    const [nameEmail, setNameEmail] = useState('')
    useEffect(() => {
        const _userName = async () => {
            const storedData = await AsyncStorage.getItem('apiData');
            let data = JSON.parse(storedData)
            setNameEmail(data)
            // console.log('userData', data.fullname)
        }
        _userName()
    }, []);

    const _logout = () => {
        AsyncStorage.clear();
        props.navigation.replace(ScreensName.LOGIN)
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.crossBtnContainer}>
                    <TouchableOpacity
                        style={styles.crossBtn}
                        activeOpacity={.8}
                        onPress={() => {
                            props.navigation.closeDrawer()
                        }}
                    >
                        <VectorIcon
                            type='Entypo'
                            name='cross'
                            size={hp(4)}
                            color={Colors.White}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.updateProfileContainer}>
                    <View style={styles.updateProfile}>
                        <Image source={ImagePath.userProfile} style={styles.updateProfileImg} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            navigation.navigate(ScreensName.EDITPROFILE)
                        }}
                        style={styles.editBtn}>
                        <VectorIcon
                            type='MaterialIcons'
                            name='edit'
                            size={hp(2)}
                            color={Colors.Primary}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.userName} numberOfLines={1} >{nameEmail?.fullname} </Text>
                        <Text style={styles.userEmail} numberOfLines={1}>{nameEmail?.emailid}</Text>
                    </View>
                </View>
                <View style={styles.progressContainer}>
                    <Text style={styles.updateProfileName}>{StringsName.updateProfile}</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarInnerContiaer}></View>
                    </View>
                </View>
                {/* User Profile Section End */}
                {/* navigation */}
                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        navigation.navigate(ScreensName.EDITPROFILE)
                    }}
                >
                    <ProfileIcon />
                    <Text style={styles.btnTitle}>{StringsName.profile}</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        //  navigation.navigate(ScreensName.EDITPROFILE)
                        Alert.alert('Alert Support')
                    }}
                >
                    <Support />
                    <Text style={styles.btnTitle}>{StringsName.support}</Text>
                </TouchableOpacity> */}

                {/* ###################### both are some  start*/}
                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        navigation.navigate(ScreensName.MYIDEA)
                    }}
                >
                    <MyIdea />
                    <Text style={styles.btnTitle}>{StringsName.myidea}</Text>
                </TouchableOpacity>
                {/* ################################################## */}
                {/* <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        navigation.navigate(ScreensName.EDITIDEA)
                    }}
                >
                    <MyIdea />
                    <Text style={styles.btnTitle}>{StringsName.myidea}</Text>
                </TouchableOpacity> */}
                {/* ###################### both are some  end*/}


                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        navigation.navigate(ScreensName.CHANGEPASSWORD)
                    }}
                >
                    <PaaswordChange />
                    <Text style={styles.btnTitle}>{StringsName.changePassword}</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        navigation.navigate(ScreensName.FEEDBACK)
                    }}
                >
                    <Feedback />
                    <Text style={styles.btnTitle}>{StringsName.feedback}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.BtnContainer}
                    onPress={() => {
                        // navigation.navigate(ScreensName.ABOUTUS)
                        Linking.openURL('https://www.checkuridea.com/about-us')
                    }}
                >
                    <AboutIcon />
                    <Text style={styles.btnTitle}>{StringsName.aboutUs}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    style={styles.logoutBtnContainer}
                    onPress={() => {
                        _logout()
                    }}
                >
                    <Logout />
                    <Text style={[styles.btnTitle, { color: Colors.White, marginLeft: wp(.7), fontFamily: Fonts.POPPINS_SEMIBOLD, fontSize: hp(1.8) }]}>{StringsName.logout}</Text>
                </TouchableOpacity>






            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    crossBtnContainer: {
        alignItems: 'flex-end',
        backgroundColor: Colors.Primary,
        marginTop: hp(-.5)
    },
    crossBtn: {
        width: wp(8),
        height: wp(8),
        marginHorizontal: wp(5),
        marginVertical: hp(1.5)
    },
    updateProfileContainer: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: wp(4),
        paddingBottom: hp(1),
        flexDirection: 'row',
        alignItems: 'center'
    },
    updateProfile: {
        width: wp(19),
        height: wp(19),
        borderRadius: wp(19),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White
    },
    updateProfileImg: {
        width: wp(18),
        height: wp(18)
    },
    editBtn: {
        backgroundColor: Colors.White,
        width: wp(6),
        height: wp(6),
        justifyContent: 'center',
        borderRadius: wp(6),
        alignItems: 'center',
        position: 'absolute',
        top: hp(6.5),
        left: wp(15)
    },
    titleContainer: {
        marginLeft: wp(2.5)
    },
    userName: {
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.White,
        fontSize: hp(2.2),
        maxWidth: wp(40)
    },
    userEmail: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.White,
        fontSize: hp(1.6),
        marginTop: hp(-1),
        maxWidth: wp(40)
    },
    progressContainer: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: wp(6),
        paddingBottom: hp(2)
    },
    updateProfileName: {
        color: Colors.White,
        fontSize: hp(1.8),
        fontFamily: Fonts.POPPINS_MEDIUM,
        paddingVertical: hp(.8)
    },
    progressBarContainer: {
        height: hp(.8),
        width: '100%',
        backgroundColor: 'rgba(129, 39, 144,.6)',
        borderRadius: wp(2)
    },
    progressBarInnerContiaer: {
        width: '50%',
        backgroundColor: Colors.White,
        height: '100%',
        borderRadius: wp(2)
    },
    drawerContent: {
        marginTop: hp(-2.5)
    },
    BtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp(6),
        marginTop: hp(2),
    },
    btnTitle: {
        marginLeft: wp(3),
        fontSize: hp(2),
        marginTop: hp(.5),
        color: Colors.textBlack,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    logoutBtnContainer: {
        marginTop: hp(9),
        marginLeft: wp(6),
        flexDirection: 'row',
        backgroundColor: Colors.Primary,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.5),
        borderRadius: wp(2),
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});



