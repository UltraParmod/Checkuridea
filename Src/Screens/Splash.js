import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import Colors from '../Utails/Colors'
import ScreensName from '../Utails/ScreensName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         navigation.replace(ScreensName.GETSTARTED);
    //     }, 2000);
    //     return () => clearInterval(timer);
    // }, [navigation]);

    useEffect(() => {
        setTimeout(_getUserData, 2000)
    }, [])
    const _getUserData = async () => {
        const storedData = await AsyncStorage.getItem('apiData');
        let data = JSON.parse(storedData)

        if (data) {
            navigation.replace(ScreensName.DRAWERNAVIGATION)
        } else {
            navigation.replace(ScreensName.GETSTARTED)
        }
        // console.log('parmod data is  splashe screen..', data)
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden />

        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
