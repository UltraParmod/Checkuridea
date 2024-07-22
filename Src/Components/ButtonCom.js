import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../Utails/Responsive'
import Colors from '../Utails/Colors'
import Fonts from '../Utails/Fonts'
import VectorIcon from '../Utails/VectorIcon'


const activeOpacity = .8
const ButtonCom = ({ disabled, title, onPress, containerStyle, titleStyle }) => {
    return (

        <TouchableOpacity disabled={disabled} style={{ ...styles.container, ...containerStyle }} onPress={onPress} activeOpacity={activeOpacity}>
            <Text style={{ ...styles.btnTitle, ...titleStyle }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonCom

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '90%',
        paddingHorizontal: wp(2),
        paddingVertical: hp(1.7),
        backgroundColor: Colors.Primary,
        borderRadius: hp(1),
    },
    btnTitle: {
        textAlign: 'center',
        fontSize: hp(1.8),
        color: Colors.White,
        textTransform: 'uppercase',
        fontFamily: Fonts.POPPINS_SEMIBOLD
    },

})
