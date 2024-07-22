// Library
import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
// Components
import ButtonCom from '../Components/ButtonCom';
// Utails
import { hp, wp } from '../Utails/Responsive';
import Colors from '../Utails/Colors';
import { CommonStyle } from '../Utails/CommonStyle';
import StringsName from '../Utails/StringsName';
import ImagePath from '../Utails/ImagePath';
import ScreensName from '../Utails/ScreensName';
import Fonts from '../Utails/Fonts';

const YourCourse = ({ navigation }) => {
    return (
        <View style={CommonStyle.container}>
            <Text
                style={styles.skip}
                onPress={() => {
                    navigation.navigate(ScreensName.LOGIN);
                }}>
                {StringsName.skip}
            </Text>
            <Image source={ImagePath.yourCourse} style={styles.checkYourIdea} />
            <View style={styles.cricleBtnContainer}>
                <Text
                    style={[styles.cricle1, styles.cricle2]}
                    onPress={() => {
                        navigation.navigate(ScreensName.CHECKYOURIDEA);
                    }}
                />
                <Text
                    style={[styles.cricle2, styles.cricle1]}
                    onPress={() => {
                        // not Required
                    }}
                />
                <Text
                    style={[styles.cricle1, styles.cricle3]}
                    onPress={() => {
                        navigation.navigate(ScreensName.GETCERTIFIED);
                    }}
                />
            </View>
            <Text style={styles.ChooseCourseTxt}>{StringsName.ChooseCourseTxt}</Text>
            <Text style={styles.ChooseIndustryKnowledgeTxt}>
                {StringsName.ChooseIndustryKnowledgeTxt}
            </Text>
            <View style={styles.btnContianer}>
                <ButtonCom
                    title={StringsName.back}
                    containerStyle={styles.btnStylee}
                    titleStyle={styles.titleStyle}
                    onPress={() => {
                        navigation.navigate(ScreensName.CHECKYOURIDEA);
                    }}
                />
                <ButtonCom
                    title={StringsName.next}
                    containerStyle={styles.btnStyle}
                    onPress={() => {
                        navigation.navigate(ScreensName.GETCERTIFIED);
                    }}
                />
            </View>
        </View>
    );
};

export default YourCourse;

const styles = StyleSheet.create({
    checkYourIdea: {
        width: wp(100),
        height: hp(25),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: hp(8.5),
    },
    skip: {
        textAlign: 'right',
        marginRight: wp(6),
        marginTop: hp(2),
        fontSize: hp(2),
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    ChooseCourseTxt: {
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_BOLD,
        marginBottom: hp(1.8),
        fontSize: hp(2.5),
        color: Colors.Primary,
    },
    yourTxt: {
        fontWeight: '400',
    },
    ChooseIndustryKnowledgeTxt: {
        textAlign: 'center',
        fontSize: hp(2),
        paddingHorizontal: hp(8),
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
        backgroundColor: Colors.Primary,
        marginLeft: wp(1),
    },
    cricle2: {
        backgroundColor: Colors.ExtraLightGray,
        marginHorizontal: wp(2),
    },
    cricle3: {
        backgroundColor: Colors.ExtraLightGray,
    },
});
