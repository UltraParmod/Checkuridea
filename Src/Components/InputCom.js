import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../Utails/Colors'
import VectorIcon from '../Utails/VectorIcon'
import { hp, wp } from '../Utails/Responsive'
import Fonts from '../Utails/Fonts'

const size = hp(3.2)
const InputCom = ({ onChangeText,value, placeholder, type, name, secureTextEntry, editable, Icon, multiline, containerStyle, size, keyboardType, maxLength, placeholderStyle }) => {
    return (
        <View style={{ ...styles.container, ...containerStyle, }}>
            <TextInput placeholder={placeholder}
                multiline={multiline}
                editable={editable ?? true} style={{ ...styles.placeholder, ...placeholderStyle }} placeholderTextColor={Colors.Gray}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
                keyboardType={!keyboardType ? 'default' : 'phone-pad'}
                maxLength={maxLength}
            />
            {!Icon ?
                null
                :
                <VectorIcon
                    type={type}
                    name={name}
                    size={size ? size : hp(3.2)}
                    color={Colors.Gray}
                />
            }

        </View>
    )
}

export default InputCom

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.ExtraLightGray,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        borderRadius: wp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
        alignItems: 'center',
    },
    placeholder: {
        padding: 0,
        width: '90%',
        fontSize: hp(1.9),
        fontFamily: Fonts.POPPINS_REGULAR,
        color: Colors.Black,
    }
})
