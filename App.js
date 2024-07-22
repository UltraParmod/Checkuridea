import React, {useState} from 'react';
import {LogBox, StatusBar, View} from 'react-native';
import StackNavigation from './Src/Navigations/StackNavigation';
import {CommonStyle} from './Src/Utails/CommonStyle';
import Colors from './Src/Utails/Colors';

export default function App() {
  LogBox.ignoreLogs(['warning']);
  LogBox.ignoreAllLogs();
  return (
    <View style={CommonStyle.container}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      {/* <StatusBar translucent backgroundColor='transparent' /> */}
      <StackNavigation />
    </View>
  );
}
