// Library
import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

// Components
import ButtonCom from '../Components/ButtonCom';
// Utails
import { CommonStyle } from '../Utails/CommonStyle';
import ImagePath from '../Utails/ImagePath';
import { hp, wp } from '../Utails/Responsive';
import StringsName from '../Utails/StringsName';
import Colors from '../Utails/Colors';
import ScreensName from '../Utails/ScreensName';
import Fonts from '../Utails/Fonts';

const CheckYourIdea = ({ navigation }) => {
    return (
        <View style={CommonStyle.container}>
            <Text
                style={styles.skip}
                onPress={() => {
                    navigation.navigate(ScreensName.LOGIN);
                }}>
                {StringsName.skip}
            </Text>
            <Image source={ImagePath.checkYourIdea} style={styles.checkYourIdea} />
            <View style={styles.cricleBtnContainer}>
                <Text
                    style={styles.cricle1}
                    onPress={() => {
                        // not Required
                    }}
                />
                <Text
                    style={[styles.cricle1, styles.cricle2]}
                    onPress={() => {
                      navigation.navigate(ScreensName.YOURCOURSE)
                    }}
                />
                <Text
                    style={[styles.cricle1, styles.cricle3]}
                    onPress={() => {
                        navigation.navigate(ScreensName.GETCERTIFIED)
                     
                    }}
                />
            </View>
            <Text style={styles.CheckYourIdeaTxt}>
                {StringsName.CheckYourIdeaTxt}
                <Text style={styles.yourTxt}>{StringsName.yourTxt}</Text>
                <Text>{StringsName.ideaTxt}</Text>
            </Text>
            <Text style={styles.welcomeToLearnTxt}>
                {StringsName.welcomeToLearnTxt}
            </Text>
            <View style={styles.btnContianer}>
                <ButtonCom
                    title={StringsName.back}
                    containerStyle={styles.btnStylee}
                    titleStyle={styles.titleStyle}
                    onPress={() => {
                        navigation.navigate(ScreensName.GETSTARTED);
                    }}
                />
                <ButtonCom
                    titleStyle={styles.titleStylee}
                    title={StringsName.next}
                    containerStyle={styles.btnStyle}
                    onPress={() => {
                        navigation.navigate(ScreensName.YOURCOURSE);
                    }}
                />
            </View>
        </View>
    );
};

export default CheckYourIdea;

const styles = StyleSheet.create({
    checkYourIdea: {
        width: wp(100),
        height: hp(25),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: hp(10),
    },
    skip: {
        textAlign: 'right',
        marginRight: wp(6),
        marginTop: hp(2),
        fontSize: hp(2),
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    CheckYourIdeaTxt: {
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_BOLD,
        marginBottom: hp(1),
        fontSize: hp(2.3),
        color: Colors.Primary,
    },
    yourTxt: {
        fontFamily: Fonts.POPPINS_REGULAR,
    },
    welcomeToLearnTxt: {
        textAlign: 'center',
        fontSize: hp(1.8),
        paddingHorizontal: hp(11),
        color: Colors.Black,
        fontFamily: Fonts.POPPINS_REGULAR,
    },
    btnContianer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: hp(5),
    },
    btnStylee: {
        backgroundColor: Colors.White,
        width: '47%',
        borderWidth: hp(0.1),
        borderColor: Colors.Primary,
    },
    titleStyle: {
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_SEMIBOLD,
    },
    titleStylee: {
        fontFamily: Fonts.POPPINS_SEMIBOLD,
    },
    btnStyle: {
        width: '47%',
    },
    cricleBtnContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: hp(5),
    },
    cricle1: {
        width: wp(2.5),
        height: wp(2.5),
        borderRadius: wp(2.5),
        borderRadius: 5,
        backgroundColor: Colors.Primary,
    },
    cricle2: {
        backgroundColor: Colors.ExtraLightGray,
        marginHorizontal: wp(2),
    },
    cricle3: {
        backgroundColor: Colors.ExtraLightGray,
    },
});
