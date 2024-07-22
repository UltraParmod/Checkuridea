import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../../../../Utails/Colors';
import { hp, wp } from '../../../../../Utails/Responsive';
import Fonts from '../../../../../Utails/Fonts';
import StringsName from '../../../../../Utails/StringsName';
import Share from './../../../../../Assets/Svg/Share.svg';
import Calender from './../../../../../Assets/Svg/Calender.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderGoback from '../../../../../Components/HeaderGoback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';
import UserAvatar from 'react-native-user-avatar';
import Config from '../../../../../Constants/Config';
import { ShareSocalMedia } from '../../../../../Constants/ShareSocalMedia';

const Review = ({ navigation }) => {
    const [data, setData] = useState('');
    const [newData, setNewData] = useState('');

    const [Loadgin, setLoading] = useState(false);

    // Api user full desc
    const _detailsReadMore = async () => {
        setLoading(true);
        const storedData = await AsyncStorage.getItem('apiDataBody');
        let data = JSON.parse(storedData);
        console.log('day of data..',data[0]?.ideaid)
        // console.log('data of r')
        try {
            const response = await axios.post(
                Config.BaseUrl + Config.detailsApi + Config.Apikey,
                {
                    // slug: data[0]?.slug,
                    ideaid:data[0]?.ideaid


                },
            );
            const dataaa = JSON.parse(response?.data);
            // console.log('sulg is hree...',response?.data)
            setData(dataaa[0]?.body?.data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // console.log(error);
            Toast.show({
                type: 'error',
                text1: error,
                text2: error,
            });
        }
    };
    useEffect(() => {
        _detailsReadMore();
    }, []);


    // latestidea.php ideas api calling here ..
    const _userLatestIdea = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                Config.BaseUrl + Config.latestideaApi + Config.Apikey,
            );
            const dataaa = JSON.parse(response?.data);
            // console.log('data is here.. _userLatestIdea ...',  dataaa[0]?.body?.data)
            // console.log('data is here.. _userLatestIdea ...',  dataaa[0])
            setNewData(dataaa[0]?.body?.data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // console.log(error);
            Toast.show({
                type: 'error',
                text1: error,
                text2: error,
            });
        }
    };

    useEffect(() => {
        _userLatestIdea();
    }, []);

    return (
        <View style={styles.container}>
            <HeaderGoback title={StringsName.review} />
            {Loadgin ? (
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
            ) : (
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    extraHeight={150}>
                    <View style={styles.reviewContainer}>
                        <View style={styles.reviewInenrContainer}>
                            <View style={styles.userNameContainer}>
                                <UserAvatar size={wp(9)} name={data?.name} />
                                <Text style={styles.userName}>
                                    {data?.name} <Text style={styles.from}>from</Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    ShareSocalMedia()
                                }}>
                                <Share />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.greateIdea}>{data?.title}</Text>
                        <Text
                            style={{
                                fontSize: hp(1.7),
                                lineHeight: hp(3),
                                color: Colors.Gray,
                            }}>
                            <Text
                                style={{
                                    fontFamily: Fonts.POPPINS_MEDIUM,
                                    color: Colors.textBlack,
                                }}></Text>
                            {data?.long_description}
                        </Text>

                        <View style={styles.bottomContainer}>
                            <View style={styles.leftBottomContinaer}>
                                <View style={styles.likeDislike}>
                                    <Text
                                        onPress={() => {
                                            Alert.alert('Like');
                                        }}
                                        style={styles.likeDislikeText}>
                                        {StringsName.likes}
                                    </Text>
                                    <View style={styles.likeDislikeCout}>
                                        <Text
                                            onPress={() => {
                                                Alert.alert('Like');
                                            }}
                                            style={styles.likeDislikeCoutTxt}>
                                            {data?.totallikes}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.likeDislike}>
                                    <Text
                                        onPress={() => {
                                            Alert.alert('Dislike');
                                        }}
                                        style={styles.likeDislikeText}>
                                        {StringsName.dislikes}
                                    </Text>
                                    <View style={styles.likeDislikeCout}>
                                        <Text
                                            onPress={() => {
                                                Alert.alert('Dislike');
                                            }}
                                            style={styles.likeDislikeCoutTxt}>
                                            {data?.totaldislikes}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.calenderContianer}>
                                <Calender width={wp(6)} />
                                <Text style={styles.containerDateTxt}>
                                    {moment(data?.createddate).format('DD-MMMM-YYYY')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ideaContainer}>
                        <Text style={styles.latestIdea}>{StringsName.latestIdea}</Text>
                        <Text style={[styles.NewIdeaiHere, { color: Colors.textBlack }]}>
                            {newData.title}
                        </Text>
                        <Text style={styles.months}>
                            {moment(data?.createddate).format('DD-MMMM-YYYY')}{' '}
                        </Text>
                    </View>
                    <View style={[styles.ideaContainer, { paddingVertical: hp(2.5) }]}>
                        <Text style={styles.NewIdeaiHere}>
                            {moment(newData?.createddate).format('YYYY')}
                        </Text>
                        <Text style={styles.months}>
                            {moment(data?.createddate).format('DD-MMMM-YYYY')}{' '}
                        </Text>
                    </View>
                    <View style={[styles.ideaContainer, { paddingVertical: hp(2.5) }]}>
                        <Text style={styles.NewIdeaiHere}>{newData.title}</Text>
                        <Text style={styles.months}>
                            {moment(data?.createddate).format('DD-MMMM-YYYY')}{' '}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            )}
        </View>
    );
};

export default Review;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: wp(6),
    },
    reviewContainer: {
        borderWidth: 0.7,
        borderColor: Colors.Primary,
        paddingHorizontal: wp(2),
        paddingVertical: hp(2),
        borderRadius: wp(5),
        marginVertical: hp(1),
    },
    reviewInenrContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginHorizontal: wp(2),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        fontSize: hp(1.8),
        color: Colors.textBlack,
    },
    from: {
        fontFamily: Fonts.POPPINS_REGULAR,
        color: Colors.textBlack,
    },
    greateIdea: {
        color: Colors.Primary,
        fontSize: hp(1.8),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        marginTop: hp(1),
        marginLeft: wp(0.5),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2),
    },
    leftBottomContinaer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeDislike: {
        flexDirection: 'row',
    },
    likeDislikeText: {
        fontSize: hp(1.4),
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.textBlack,
    },
    likeDislikeCout: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(4),
        backgroundColor: Colors.Primary,
        marginHorizontal: wp(1),
    },
    likeDislikeCoutTxt: {
        color: Colors.White,
        fontSize: hp(1.3),
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    calenderContianer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerDateTxt: {
        marginHorizontal: wp(1),
        fontSize: hp(1.6),
        color: Colors.Gray,
    },
    ideaContainer: {
        borderWidth: hp(0.1),
        borderColor: Colors.Primary,
        borderRadius: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: hp(1.5),
        marginTop: hp(1),
    },
    latestIdea: {
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: hp(1.5),
    },
    NewIdeaiHere: {
        color: Colors.Primary,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    months: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontSize: hp(1.4),
        color: Colors.textBlack,
    },
});
