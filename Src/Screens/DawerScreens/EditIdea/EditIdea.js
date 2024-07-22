import React, { useEffect, useState } from 'react';
import {

    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../../Utails/Colors';
import InputCom from '../../../Components/InputCom';
import { hp, wp } from '../../../Utails/Responsive';
import VectorIcon from '../../../Utails/VectorIcon';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import StringsName from '../../../Utails/StringsName';
import Fonts from '../../../Utails/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePath from '../../../Utails/ImagePath';
import ButtonCom from '../../../Components/ButtonCom';
import ScreensName from '../../../Utails/ScreensName';
import HtmlEditor from '../../../Components/HtmlEditor';
import Config from '../../../Constants/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import publicIP from 'react-native-public-ip';
import Toast from 'react-native-toast-message';
import HeaderGoback from '../../../Components/HeaderGoback';

const size = hp(4);
const PostYourIdea = ({ route }) => {
    const item = route.params;
    const [shortDisc, setShortDisc] = useState(null);
    const [longDisc, setLongDisc] = useState(null);
    const [title, setTitle] = useState(null);
    const [showData, setShowData] = useState('')
    const [loadingg, setLoadingg] = useState(false);

    // const oldData = useRoute()
    const navigation = useNavigation();
    // useEffect(()=>{
    //     setTitle(oldData.params?.data?.title)
    //     setShortDisc(oldData.params?.data?.short_description)
    //     setLongDisc(oldData.params?.data?.slug)
    // },[oldData])
    const [dataStore, setDataStore] = useState('')
    const [ip, setIP] = useState(null);
    const [Loadgin, setLoading] = useState(false);
    const handleCallbackShortDisc = childData => {
        setShortDisc(childData);
    };
    const handleCallbackLongDisc = childData => {
        setLongDisc(childData);
    };
    useEffect(() => {
        publicIP()
            .then(ip => {
                setIP(ip);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Edit idea     
    const _userEditIdea = async () => {
        const storedData = await AsyncStorage.getItem('apiDataBody');
        const data = JSON.parse(storedData);
        try {
            const response = await axios.post(
                Config.BaseUrl + Config.ideaforupdateApi + Config.Apikey,
                {
                    ideaid: data[0]?.ideaid
                },
            );
            const dataaa = JSON.parse(response?.data);
            
            setShowData(dataaa[0]?.body?.data[0])
            // setLoading(false);
            // setTitle('');
            // setShortDisc('');
            // setLongDisc('');
            // setDataStore(dataaa[0]?.body?.data[0])
            // console.log('parmod kumar is loser ', dataStore?.createddate)
            if (dataaa[0]?.statusCode === 200) {
                // navigation.replace(ScreensName.DRAWERNAVIGATION);
                Toast.show({
                    type: 'success',
                    text1: dataaa[0]?.msg,
                    text2: dataaa[0]?.msg,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: dataaa[0]?.msg,
                    text2: dataaa[0]?.msg,
                });
            }
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: error,
                text2: error,
            });
        }
    };
    // console.log('short_descriptionk data is hree..', showData?.short_description)
    // console.log('long_description data is hree', showData?.long_description)
        const handleButtonClick = () => {
            setLoadingg(true);
            setTimeout(() => {
                setLoadingg(false);
            }, 5000);
        };
        useEffect(() => {
            handleButtonClick()
            _userEditIdea()
        }, [])
    
 
    return (
        <View style={styles.container}>

            <View style={{ zIndex: 999 }}>
                <Toast />
            </View>
            {loadingg && (
                <ActivityIndicator
                    color={Colors.Primary}
                    size="large"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 999,
                        alignSelf: 'center',
                    }}
                />
            )


            }
            <View style={{ marginVertical: hp(2) }}>
                <HeaderGoback title={StringsName.editYourPost} />
            </View>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraHeight={150}>
                <InputCom
                    placeholder={StringsName.title}
                    // value={title ? title : dataStore?.title}
                    value={showData?.title}
                    onChangeText={setTitle}
                />
                <View style={styles.shortDescriptionContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontFamily: Fonts.POPPINS_REGULAR,
                                fontSize: hp(2),
                                color: Colors.Gray,
                                marginLeft: wp(2),
                            }}>
                            {StringsName.shortDescription}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Alert.alert('Dotted Alert');
                            }}
                            style={{ marginTop: hp(1.5), position: 'absolute', right: wp(0) }}>
                            <VectorIcon
                                type={'Entypo'}
                                name={'dots-three-vertical'}
                                size={20}
                                color={Colors.textBlack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp(-1.5) }}>
                        <HtmlEditor value={showData?.short_description} parentCallback={handleCallbackShortDisc} />
                    </View>
                </View>
                <View style={styles.shortDescriptionContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontFamily: Fonts.POPPINS_REGULAR,
                                fontSize: hp(2),
                                color: Colors.Gray,
                                marginLeft: wp(2),
                            }}>
                            {StringsName.longDescription}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Alert.alert('Dotted Alert');
                            }}
                            style={{ marginTop: hp(1.5), position: 'absolute', right: wp(0) }}>
                            <VectorIcon
                                type={'Entypo'}
                                name={'dots-three-vertical'}
                                size={20}
                                color={Colors.textBlack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp(-1.5) }}>
                        <HtmlEditor value={showData?.long_description} parentCallback={handleCallbackLongDisc} />

                    </View>
                </View>

                <View style={styles.captchaContainer}>
                    <InputCom
                        placeholder={StringsName.enterCaptcher}
                        containerStyle={styles.captchaCodeContainer}
                    />

                    <View style={{ width: '40%' }}>
                        <Text
                            style={{ fontFamily: Fonts.POPPINS_REGULAR, fontSize: hp(1.5) }}>
                            {StringsName.captchaCode}
                        </Text>
                        <Image source={ImagePath.captchaCode} />
                    </View>
                </View>

                <View style={styles.Btncontianer}>
                    <ButtonCom
                        title={StringsName.cancle}
                        containerStyle={styles.BtncontianerInner}
                        titleStyle={{ color: Colors.Primary }}
                        onPress={() => {
                            navigation.replace(ScreensName.DRAWERNAVIGATION);
                        }}
                    />
                    <ButtonCom
                        disabled={!title || !shortDisc || !longDisc ? true : false}
                        containerStyle={{
                            width: '48%',
                            marginVertical: hp(7),
                            backgroundColor:
                                title && shortDisc && longDisc
                                    ? Colors.Primary
                                    : 'rgb(229,161,240)',
                        }}
                        title={StringsName.post}
                        onPress={() => {
                            // _userEditIdea()
                            // navigation.navigate(ScreensName.DRAWERNAVIGATION)
                        }}
                    />
                </View>

            </KeyboardAwareScrollView>

        </View>
    );
};

export default PostYourIdea;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6),
    },
    shortDescriptionContainer: {
        height: hp(22),
        borderWidth: 1,
        borderColor: Colors.ExtraLightGray,
        borderRadius: wp(2),
        marginBottom: hp(2),
        paddingHorizontal: wp(1),
        paddingVertical: hp(1),
    },
    captchaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerStyle: {
        alignItems: 'flex-start',
        borderColor: Colors.White,
    },
    captchaCodeContainer: {
        width: '52%',
    },
    Btncontianer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(1),
    },
    BtncontianerInner: {
        width: '48%',
        backgroundColor: Colors.White,
        borderWidth: hp(0.1),
        borderColor: Colors.Primary,
    },
});
