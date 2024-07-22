// Libaray
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Utails
import ScreensName from '../Utails/ScreensName';
// DrawerNavigation
import DrawerNavigation from './DrawerNavigation';
// Screens
import YourCourse from '../Screens/YourCourse';
import GetCertified from '../Screens/GetCertified';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import EditProfile from '../Screens/DawerScreens/EditProfile/EditProfile';
import Feedback from '../Screens/DawerScreens/Feedback/Feedback';
import AboutUs from '../Screens/DawerScreens/AboutUs/AboutUs';
import ForgotPassword from '../Screens/ForgotPassword';
import CheckYourEmail from '../Screens/CheckYourEmail';
import CreateNewPassword from '../Screens/CreateNewPassword';
import Review from '../Screens/BootomTabScreen/Home/HomeComponents.js/Screens/Review';
import TermServices from '../Screens/TermServices';
import Splash from '../Screens/Splash';
import GetStarted from '../Screens/GetStarted';
import CheckYourIdea from '../Screens/CheckYourIdea';
import MyIdea from '../Screens/DawerScreens/MyIdea/MyIdea';
import ChangePassword from '../Screens/DawerScreens/ChangePassword/ChangePassword';
import EditIdea from '../Screens/DawerScreens/EditIdea/EditIdea';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();




  return (
    <NavigationContainer>
      {/* StackNavigtion  */}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ScreensName.SPLASH}>
        <Stack.Screen name={ScreensName.SPLASH} component={Splash} />
        <Stack.Screen name={ScreensName.GETSTARTED} component={GetStarted} />
        <Stack.Screen
          name={ScreensName.CHECKYOURIDEA}
          component={CheckYourIdea}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name={ScreensName.YOURCOURSE}
          component={YourCourse}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name={ScreensName.GETCERTIFIED}
          component={GetCertified}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name={ScreensName.LOGIN} component={Login} />
        <Stack.Screen
          name={ScreensName.FORGOTPASSWORD}
          component={ForgotPassword}
        />
        <Stack.Screen
          name={ScreensName.CHECKYOUREMAIL}
          component={CheckYourEmail}
        />
        <Stack.Screen
          name={ScreensName.CREATENEWPASSWORD}
          component={CreateNewPassword}
        />
        <Stack.Screen name={ScreensName.SIGNUP} component={Signup} />
        {/* Remove  */}
        {/* <Stack.Screen
          name={ScreensName.TERMSERVICES}
          component={TermServices}
        /> */}
        {/* DrawerNavigation */}
        <Stack.Screen
          name={ScreensName.DRAWERNAVIGATION}
          component={DrawerNavigation}
        />
        <Stack.Screen name={ScreensName.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={ScreensName.MYIDEA} component={MyIdea} />
        <Stack.Screen name={ScreensName.EDITIDEA} component={EditIdea} />

        <Stack.Screen name={ScreensName.CHANGEPASSWORD} component={ChangePassword} />

        {/* <Stack.Screen name={ScreensName.FEEDBACK} component={Feedback} /> remove  */}
        {/* <Stack.Screen name={ScreensName.ABOUTUS} component={AboutUs} />  remove  */}
        {/* <Stack.Screen name={ScreensName.BOTTOMNAVIGATION} component={BottomNavigation} /> */}
        <Stack.Screen name={ScreensName.REVIEW} component={Review} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
