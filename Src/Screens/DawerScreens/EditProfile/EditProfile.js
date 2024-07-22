import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../../Utails/Colors';

import VectorIcon from '../../../Utails/VectorIcon';
import { hp, wp } from '../../../Utails/Responsive';
import ScreensName from '../../../Utails/ScreensName';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../../Utails/Fonts';
import StringsName from '../../../Utails/StringsName';
import ImagePath from '../../../Utails/ImagePath';
import InputCom from '../../../Components/InputCom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonCom from '../../../Components/ButtonCom';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState(null);
    const [updateProfile, setUpdateProfile] = useState('')
    const SelectImage = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(image => {
                setImageUrl(image.path);
            })
            .catch(error => {
                console.log('ImagePicker Error', error);
            });
    };

    useEffect(() => {
        const _userName = async () => {
            const storedData = await AsyncStorage.getItem('apiData');
            let data = JSON.parse(storedData)
            setUpdateProfile(data)
            // console.log('userData', data)
        }
        _userName()
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    activeOpacity={0.8}>
                    <VectorIcon
                        type={'AntDesign'}
                        name={'arrowleft'}
                        size={hp(3.5)}
                        color={Colors.textBlack}
                    />
                </TouchableOpacity>
                <Text style={styles.editProfile}>{StringsName.editProfile}</Text>
            </View>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraHeight={150}>
                <View style={styles.userProfileContianer}>
                    {!imageUrl ? (
                        <Image source={ImagePath.userProfile} style={styles.userProfile} />
                    ) : (
                        <Image source={{ uri: imageUrl }} style={styles.userProfile} />
                    )}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.cameraContianer}
                        onPress={SelectImage}>
                        <VectorIcon type={'Entypo'} name={'camera'} size={hp(2.3)} />
                    </TouchableOpacity>
                </View>
                <View>
                    <InputCom placeholder={StringsName.fullName} value={updateProfile?.fullname} onChangeText={setUpdateProfile} />
                    <InputCom placeholder={StringsName.emailId} value={updateProfile?.emailid} editable={false} />
                    <InputCom placeholder={StringsName.designation} />
                    <InputCom placeholder={StringsName.location} />
                    {/* <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Choose file');
                        }}
                        activeOpacity={0.8}>
                        <InputCom
                            placeholder={StringsName.country}
                            Icon={true}
                            type={'AntDesign'}
                            name={'caretdown'}
                            size={hp(2.3)}
                            editable={false}
                        />
                    </TouchableOpacity> */}

                    <View style={styles.btnContainer}>
                        <ButtonCom
                            containerStyle={styles.btnInner}
                            titleStyle={{ color: Colors.Primary }}
                            title={StringsName.cancle}
                            onPress={() => {
                                navigation.replace(ScreensName.DRAWERNAVIGATION)
                            }}
                        />
                        <ButtonCom
                            containerStyle={{ width: '48%' }}
                            title={StringsName.submit}
                            onPress={() => {
                                Alert.alert('Sumbit');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1.5),
    },
    editProfile: {
        marginLeft: wp(1.5),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.Primary,
        fontSize: hp(2.2),
    },
    userProfileContianer: {
        alignSelf: 'center',
        marginVertical: hp(5),
    },
    userProfile: {
        width: wp(35),
        height: wp(35),
        borderRadius: wp(35),
    },
    cameraContianer: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(8),
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: wp(3),
        bottom: hp(0.5),
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(4),
    },
    btnInner: {
        width: '48%',
        backgroundColor: Colors.White,
        borderWidth: 0.8,
        borderColor: Colors.Primary,
    },
});
