import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../Utails/Responsive'
import Colors from '../Utails/Colors'
import Fonts from '../Utails/Fonts'

const TabButtonCom = ({title,onPress,titleStyle,containerStyle}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container,...containerStyle}} activeOpacity={.8}>
          <Text style={{...styles.title,...titleStyle}}>
             {title}
            </Text>
        </TouchableOpacity>
    )
}

export default TabButtonCom

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:wp(1),
        borderBottomWidth:hp(.3),
        borderColor:Colors.White,
    },
    title:{
        fontFamily:Fonts.POPPINS_EXTRALIGHT,
        color:Colors.Gray,
        fontSize:hp(1.8)
    }
})
