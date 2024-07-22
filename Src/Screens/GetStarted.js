// Library
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
// Components
import ButtonCom from '../Components/ButtonCom';
// Utails
import StringsName from '../Utails/StringsName';
import { CommonStyle } from '../Utails/CommonStyle';
import ImagePath from '../Utails/ImagePath';
import { hp } from '../Utails/Responsive';
import Colors from '../Utails/Colors';
import ScreensName from '../Utails/ScreensName';
import Fonts from '../Utails/Fonts';

const GetStarted = ({ navigation }) => {
  return (
    <View style={CommonStyle.container}>
      <View style={styles.innerContainer}>
        <Image source={ImagePath.logo} style={styles.logo} />
        <Text style={styles.welcomeTxt}>{StringsName.welcomeTxt}</Text>
        <Text style={styles.bastPopularTxt}>{StringsName.bastPopularTxt}</Text>
      </View>
      <View style={styles.btnContianer}>
        <ButtonCom
          titleStyle={styles.titleStyle}
          title={StringsName.btnTitle}
          onPress={() => {
            navigation.navigate(ScreensName.CHECKYOURIDEA);
          }}
        />
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: hp(2.5),
  },
  welcomeTxt: {
    fontSize: hp(2.4),
    textAlign: 'center',
    marginVertical: hp(1.2),
    color: Colors.Primary,
    fontFamily: Fonts.POPPINS_SEMIBOLD,
  },
  bastPopularTxt: {
    color: Colors.Gray,
    textAlign: 'center',
    fontSize: hp(1.8),
    width: '65%',
    fontFamily: Fonts.POPPINS_SEMIBOLD,
  },
  btnContianer: {
    marginBottom: hp(5),
  },
  titleStyle: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: hp(1.8),
  },
});
