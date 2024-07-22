import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../Utails/Colors'
import { hp, wp } from '../Utails/Responsive'
import StringsName from '../Utails/StringsName'
import VectorIcon from '../Utails/VectorIcon'
import Fonts from '../Utails/Fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderGoback from '../Components/HeaderGoback'

const TermServices = ({ navigation }) => {
    return (
        <View style={styles.container}>


            <HeaderGoback title={StringsName.termsOfServices} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraScrollHeight={150}>


                <Text style={styles.lastUpdate}>Last updated on 01/04/2024</Text>
                <Text style={styles.cause}>Cause-1</Text>
                <Text style={styles.titleUser}><Text style={styles.hightLight}>Lorem Ipsum </Text>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </Text>

                <Text style={styles.cause}>Cause-2</Text>
                <Text style={styles.titleUser}><Text style={styles.hightLight}>Lorem Ipsum </Text>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </Text>

                <Text style={styles.cause}>Cause-3</Text>
                <Text style={styles.titleUser}><Text style={styles.hightLight}>Lorem Ipsum </Text>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </Text>

            </KeyboardAwareScrollView>
        </View>
    )
}

export default TermServices

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6)
    },
    lastUpdate: {
        fontSize: hp(1.4),
        fontFamily: Fonts.POPPINS_REGULAR
    },
    cause: {
        fontSize: hp(1.8),
        color: Colors.textBlack,
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        marginVertical: hp(1)
    },
    titleUser: {
        color: Colors.textBlack,
        textAlign: 'justify',
        fontSize: hp(1.9),
        lineHeight: hp(3)
    },
    hightLight: {
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: hp(1.8),
        color: Colors.textBlack
    }
})
