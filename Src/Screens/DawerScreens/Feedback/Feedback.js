import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../../../Utails/Responsive'
import Colors from '../../../Utails/Colors'
import Fonts from '../../../Utails/Fonts'
import { useNavigation } from '@react-navigation/native'
import StringsName from '../../../Utails/StringsName'
import VectorIcon from '../../../Utails/VectorIcon'
import HeaderGoback from '../../../Components/HeaderGoback'

const Feedback = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <HeaderGoback title={StringsName.feedback} />
        </View>
    )
}

export default Feedback

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(6),
        backgroundColor: Colors.White
    },
})
