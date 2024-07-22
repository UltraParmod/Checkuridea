import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import VectorIcon from '../../../Utails/VectorIcon'

import StringsName from '../../../Utails/StringsName'
import { hp, wp } from '../../../Utails/Responsive'
import Fonts from '../../../Utails/Fonts'
import Colors from '../../../Utails/Colors'

const AboutUs = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    activeOpacity={.8}
                >
                    <VectorIcon
                        type={'AntDesign'}
                        name={'arrowleft'}
                        size={hp(3.5)}
                        color={Colors.textBlack}
                    />
                </TouchableOpacity>
                <Text style={styles.editProfile}>{StringsName.aboutUs}</Text>
            </View>
        </View>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(6),
        backgroundColor: Colors.White
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1.5)
    },
    editProfile: {
        marginLeft: wp(1.5),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.Primary,
        fontSize: hp(2.2)
    },
})
