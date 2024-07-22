import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import Colors from '../../../Utails/Colors'
import Header from '../../../Components/Header'
import { hp, wp } from '../../../Utails/Responsive'
import StringsName from '../../../Utails/StringsName'
import Fonts from '../../../Utails/Fonts'
// import { tabsData } from '../../../Constants/tabsData'
import TabButtonCom from '../../../Components/TabButtonCom'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MostLikedTab from './HomeComponents.js/MostLikedTab'
import AllTab from './HomeComponents.js/AllTab'
import NewTab from './HomeComponents.js/NewTab'
import RandomTab from './HomeComponents.js/RandomTab'
import HomeBanner from '../../../Assets/Svg/HomeBanner.svg'
import ImagePath from '../../../Utails/ImagePath'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FirstLetterCapital } from '../../../Constants/ShareSocalMedia'





const Home = ({ navigation }) => {
    const [isTabBution, setIsTabButton] = useState([0]);
    const [userName, setUserName] = useState('')
    const [Loadgin, setLoading] = useState(false);


    useEffect(() => {
        const _userName = async () => {
            const storedData = await AsyncStorage.getItem('apiData');
            let data = JSON.parse(storedData)
            const capitalizedData = FirstLetterCapital(data?.fullname);
            // console.log('userData', data)
            setUserName(capitalizedData)
        }
        _userName()
    }, []);

    return (
        <View style={styles.container}>
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
                        backgroundColor: Colors.White,

                    }}
                />

            ) :
                (
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: wp(6) }}>
                            <View style={{ marginTop: hp(-2) }}>
                                <Header navigation={navigation} />
                            </View>
                            <View style={{ marginTop: hp(-2) }}>
                                <Text style={[styles.helloUserName, { maxWidth: wp(60) }]} numberOfLines={1}>{StringsName.hello} <Text> {userName ? userName : 'Loading...'}</Text></Text>
                                <Text style={styles.postyourIdea}>{StringsName.postyourIdea}<Text style={styles.idea}>{StringsName.idea}</Text></Text>

                                {/* <View style={styles.imgContianer}>
                                    <Image source={ImagePath.postYouIdea} style={styles.postyourIdeaImg} />

                                </View> */}
                            </View>



                            <View style={styles.btnContainer}>
                                <TabButtonCom
                                    title={StringsName.all}
                                    onPress={() => {
                                        setIsTabButton(0)
                                    }}
                                    titleStyle={{ color: isTabBution == 0 ? Colors.Primary : Colors.Gray, fontFamily: Fonts.POPPINS_SEMIBOLD }}
                                    containerStyle={{ borderColor: isTabBution == 0 ? Colors.Primary : Colors.White,}}
                                />
                                <TabButtonCom
                                    title={StringsName.Mostliked}
                                    onPress={() => {
                                        setIsTabButton(1)
                                    }}
                                    titleStyle={{ color: isTabBution == 1 ? Colors.Primary : Colors.Gray, fontFamily: Fonts.POPPINS_SEMIBOLD }}
                                    containerStyle={{ borderColor: isTabBution == 1 ? Colors.Primary : Colors.White }}
                                />
                                <TabButtonCom
                                    title={StringsName.new}
                                    onPress={() => {
                                        setIsTabButton(2)
                                    }}
                                    titleStyle={{ color: isTabBution == 2 ? Colors.Primary : Colors.Gray, fontFamily: Fonts.POPPINS_SEMIBOLD }}
                                    containerStyle={{ borderColor: isTabBution == 2 ? Colors.Primary : Colors.White }}
                                />
                                <TabButtonCom
                                    title={StringsName.random}
                                    onPress={() => {
                                        setIsTabButton(3)
                                    }}
                                    titleStyle={{ color: isTabBution == 3 ? Colors.Primary : Colors.Gray, fontFamily: Fonts.POPPINS_SEMIBOLD }}
                                    containerStyle={{ borderColor: isTabBution == 3 ? Colors.Primary : Colors.White }}
                                />



                            </View>
                        </View>

                        {isTabBution == 0 ? (
                                <AllTab /> 
                        ) : null}
                        {isTabBution == 1 ? (
                            <MostLikedTab />
                        ) : null}
                        {isTabBution == 2 ? (
                            <NewTab />
                        ) : null}
                        {isTabBution == 3 ? (
                            <RandomTab />
                        ) : null}
                    </View>
                )
            }








            {/* </KeyboardAwareScrollView> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    helloUserName: {
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: hp(2.4),
        color: Colors.Black,
    },
    postyourIdea: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontSize: hp(1.6),
        color: Colors.Gray,
        //  backgroundColor:'red',
         marginTop:hp(-1)
    },
    idea: {
        color: Colors.Primary,
        fontWeight: '800',
    },
    imgContianer: {
        width: '100%',
        height: hp(20),
        backgroundColor: Colors.White,
    },
    postyourIdeaImg: {
        width: '100%',
        resizeMode: 'contain',
        height: hp(20)
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(2),
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
        marginTop:hp(1)
        // backgroundColor:'green'

    },
})

