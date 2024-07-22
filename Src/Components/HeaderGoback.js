import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../Utails/Responsive';
import Fonts from '../Utails/Fonts';
import Colors from '../Utails/Colors';
import VectorIcon from '../Utails/VectorIcon';
import StringsName from '../Utails/StringsName';
import { useNavigation } from '@react-navigation/native';

const HeaderGoback = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.goBack();
                }}>
                <VectorIcon
                    type={'AntDesign'}
                    name={'arrowleft'}
                    size={hp(3.5)}
                    color={Colors.textBlack}
                />
            </TouchableOpacity>
            <Text style={styles.editProfile}>{title}</Text>
        </View>
    );
};

export default HeaderGoback;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.5),
    },
    editProfile: {
        marginTop: hp(0.5),
        marginLeft: wp(1.5),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.Primary,
        fontSize: hp(2.2),
    },
});
