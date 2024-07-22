import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../Utails/Colors';
import {hp, wp} from '../../../Utails/Responsive';
import VectorIcon from '../../../Utails/VectorIcon';
import StringsName from '../../../Utails/StringsName';
import Fonts from '../../../Utails/Fonts';
import InputCom from '../../../Components/InputCom';
import ButtonCom from '../../../Components/ButtonCom';
import DocummentPicker from 'react-native-document-picker';
import Config from '../../../Constants/Config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import ScreensName from '../../../Utails/ScreensName';
import HeaderGoback from '../../../Components/HeaderGoback';

const size = hp(4);
const Support = ({navigation}) => {
  // const [docSave, SetSaveDoc] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [comment, setComment] = useState('');
  const [Loadgin, setLoading] = useState(false);

  // const selectDoc = async () => {
  //     try {
  //         const doc = await DocummentPicker.pick({
  //             type: [DocummentPicker.types.allFiles],
  //             // allowMultiSelection:true
  //         });
  //         SetSaveDoc(doc[0].name);
  //     } catch (err) {
  //         if (DocummentPicker.isCancel(err))
  //             console.log('User cancelled the upload', err);
  //         else console.log(err);
  //     }
  // }
  // api calling
  // name=value&phone=value&emailid=value&message=value

  // validation email
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const _userSupport = async () => {
    if (validateEmail(email)) {
      setLoading(true);
      try {
        const response = await axios.post(
          Config.BaseUrl + Config.supportApi + Config.Apikey,
          {
            name: fullName,
            phone: phoneNo,
            emailid: email,
            message: comment,
          },
        );
        const dataaa = JSON.parse(response?.data);
        // console.log('data is here.. Login..', dataaa);
        setLoading(false);
        setFullName('');
        setEmail('');
        setPhoneNo('');
        setComment('');
        if (dataaa[0]?.statusCode === 200) {
          navigation.replace(ScreensName.DRAWERNAVIGATION);
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
        // console.log(error);
        Toast.show({
          type: 'error',
          text1: error,
          text2: error,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: "Invalid Email Address', 'Please enter a valid email address.",
        text2: "Invalid Email Address', 'Please enter a valid email address.",
      });
    }
  };

  return (
    <View style={styles.contianer}>
      <View style={{zIndex: 999}}>
        <Toast />
      </View>
      {Loadgin && (
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
      )}
      <KeyboardAwareScrollView
        extraHeight={150}
        showsVerticalScrollIndicator={false}>
            <View style={{marginVertical:hp(2)}}>
            <HeaderGoback title={StringsName.support}/>
            </View>

        <InputCom
          placeholder={StringsName.fullName}
          value={fullName}
          onChangeText={setFullName}
          containerStyle={{
            borderColor: !fullName ? Colors.ExtraLightGray : Colors.Primary,
          }}
        />
        <InputCom
          placeholder={StringsName.emailId}
          value={email}
          onChangeText={setEmail}
          containerStyle={{
            borderColor: !email ? Colors.ExtraLightGray : Colors.Primary,
          }}
        />
        <InputCom
          placeholder={StringsName.phoneNo}
          keyboardType={true}
          maxLength={10}
          value={phoneNo}
          onChangeText={setPhoneNo}
          containerStyle={{
            borderColor: !phoneNo ? Colors.ExtraLightGray : Colors.Primary,
          }}
        />
        <InputCom
          placeholder={StringsName.addComment}
          multiline={true}
          containerStyle={{
            height: hp(21),
            alignItems: 'flex-start',
            borderColor: !comment ? Colors.ExtraLightGray : Colors.Primary,
          }}
          placeholderStyle={{textAlignVertical: 'top'}}
          value={comment}
          onChangeText={setComment}
        />
        {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={selectDoc}
            style={{
                borderWidth: 1,
                borderColor: Colors.ExtraLightGray,
                paddingHorizontal: wp(2),
                paddingVertical: hp(1.2),
                borderRadius: wp(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: hp(2),
                alignItems: 'center',
            }}>
            {!docSave ? (
                <Text style={{ width: '90%', color: Colors.Gray }}>
                    {StringsName.browse}{' '}
                </Text>
            ) : (
                <Text style={{ width: '90%' }}>{docSave} </Text>
            )}
            <VectorIcon
                name="attachment"
                type="MaterialCommunityIcons"
                size={hp(3)}
                color={Colors.Gray}
            />
        </TouchableOpacity> */}

        <ButtonCom
          disabled={!fullName || !email || !phoneNo || !comment ? true : false}
          containerStyle={{
            width: '100%',
            marginVertical: hp(7),
            backgroundColor:
              fullName && email && phoneNo && comment
                ? Colors.Primary
                : 'rgb(229,161,240)',
          }}
          title={StringsName.submit}
          onPress={() => {
            // Alert.alert('Sumbit Alert');
            _userSupport();
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(6),
  },
});
