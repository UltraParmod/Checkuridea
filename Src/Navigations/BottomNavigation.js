// Library
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Keyboard, View} from 'react-native';

// Screens
import Home from '../Screens/BootomTabScreen/Home/Home';
import PostYourIdea from '../Screens/BootomTabScreen/PostYourIdea/PostYourIdea';
import Support from '../Screens/BootomTabScreen/Support/Support';

// Utails
import ScreensName from '../Utails/ScreensName';
import Colors from '../Utails/Colors';
import {hp, wp} from '../Utails/Responsive';
import Fonts from '../Utails/Fonts';

// SvgIcon
import HomeIcon from '../Assets/Svg/HomeIcon.svg';
import AddIcon from '../Assets/Svg/addIcon.svg';
import SupportIcon from '../Assets/Svg/SupportIcon.svg';
import SupportActive from '../Assets/Svg/SupportActive.svg';
import HomeIconINactive from '../Assets/Svg/HomeIconINactive.svg';

import {Image} from 'react-native-svg';
import ImagePath from '../Utails/ImagePath';
import {useEffect, useState} from 'react';

const Tab = createBottomTabNavigator();

// Varables
const borderRadius = wp(3);
const fontSize = hp(1.3);
const iconWidth = wp(28);
const iconHeight = hp(4);
const widthStyle = wp(6);
const heightStyle = hp(6);

// Fonts
const font_Family = Fonts.POPPINS_MEDIUM;
export default BottomNavigation = ({navigation}) => {
  // This is for bottom: isKeyboardVisible ? hp(-10) : 0, this error Start
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
 // This is for bottom: isKeyboardVisible ? hp(-10) : 0, this error End
  return (
    <Tab.Navigator
      initialRouteName={ScreensName.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.White,
        tabBarInactiveTintColor: Colors.White,
        tabBarStyle: {
          height: hp(8.5),
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          backgroundColor: Colors.Primary,
          bottom: isKeyboardVisible ? hp(-10) : 0,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={ScreensName.HOME}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: fontSize,
            position: 'absolute',
            bottom: hp(1),
            fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeIcon
                width={iconWidth}
                height={iconHeight}
                style={{
                  width: widthStyle,
                  height: heightStyle,
                  position: 'absolute',
                  bottom: hp(3.5),
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.MainColor : Colors.White,
                }}
              />
            ) : (
              <HomeIconINactive
                width={iconWidth}
                height={iconHeight}
                style={{
                  width: widthStyle,
                  height: heightStyle,
                  position: 'absolute',
                  bottom: hp(3.5),
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.MainColor : Colors.White,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name={ScreensName.POSTYOURIDEA}
        component={PostYourIdea}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: wp(19),
                height: wp(19),
                borderRadius: wp(19),
                tintColor: focused ? Colors.MainColor : Colors.White,
                marginBottom: hp(6.5),
                borderWidth: wp(3),
                borderColor: Colors.White,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <AddIcon
                // width={100}
                // style={{ position: 'relative', left: wp(-1), top: hp(-0.3) }}
                />
                {/* tabBarIcon */}
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ScreensName.SUPPORT}
        component={Support}
        options={{
          tabBarLabel: 'Support',
          tabBarLabelStyle: {
            fontSize: fontSize,
            position: 'absolute',
            bottom: hp(1),
            fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <SupportActive
                width={wp(28)}
                height={hp(3.5)}
                style={{
                  width: hp(6),
                  height: wp(6),
                  position: 'absolute',
                  bottom: hp(3.5),
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.MainColor : Colors.White,
                }}
              />
            ) : (
              <SupportIcon
                width={wp(28)}
                height={hp(3.5)}
                style={{
                  width: hp(6),
                  height: wp(6),
                  position: 'absolute',
                  bottom: hp(3.5),
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.MainColor : Colors.White,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
