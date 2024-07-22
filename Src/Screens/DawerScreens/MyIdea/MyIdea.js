import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { hp, wp } from '../../../Utails/Responsive';
import Colors from '../../../Utails/Colors';
import HeaderGoback from '../../../Components/HeaderGoback';
import StringsName from '../../../Utails/StringsName';
import Fonts from '../../../Utails/Fonts';
import Share from './../../../Assets/Svg/Share.svg';
import Calender from './../../../Assets/Svg/Calender.svg';
import UserAvatar from 'react-native-user-avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Constants/Config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import ScreensName from '../../../Utails/ScreensName';
import moment from 'moment';
import { ShareSocalMedia } from '../../../Constants/ShareSocalMedia';
export default function MyIdea({ navigation }) {
  const [Loadgin, setLoading] = useState(false);
  const [userAllPost, setUserAllPost] = useState('');
  // _MyAllPost Api calling ...
  useEffect(() => {
    _MyAllPost();
  }, []);
  const _MyAllPost = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('apiData');
      let data = JSON.parse(storedData);
      const response = await axios.post(
        Config.BaseUrl + Config.myAllpostApi + Config.Apikey,
        {
          bemailid: data?.emailid,
        },
      );
      // dataaa[0].body?.data[0]
      // const dataaa=  JSON.parse(response)
      const dataaa = JSON.parse(response?.data);
      // console.log('data is here..fff..', dataaa[0].body?.data[0]);
      await AsyncStorage.setItem('AllPostId', JSON.stringify(dataaa));
      setUserAllPost(dataaa[0].body?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
    // console.log('data is hre....', userAllPost)


  // _MyPostDelte Api calling ...
  const _MyPostDelte = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('AllPostId');
      let data = JSON.parse(storedData);
      // console.log('sunny datab',data[0]?.body?.data[0]?.ideaid)
      const response = await axios.post(
        Config.BaseUrl + Config.deleteideaApi + Config.Apikey,
        {
          ideaid: data[0]?.body?.data[0]?.ideaid,
        },
      );
      if (response?.data?.statusCode == 200) {
        Toast.show({
          type: 'success',
          text1: response?.data?.msg,
          text2: response?.data?.msg,
        });
        setLoading(false);
        _MyAllPost();
      } else {
        Toast.show({
          type: 'error',
          text1: response?.data?.msg,
          text2: response?.data?.msg,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: Colors.White,
        flex: 1,
        paddingHorizontal: wp(6),
      }}>
      <View style={{ zIndex: 999 }}>
        <Toast />
      </View>
      <HeaderGoback title={StringsName.myideas} />
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
        <View style={{ marginBottom: hp(5) }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userAllPost}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.Gray,
                  }}>
                  No Idea's Found!
                </Text>
              </View>
            )}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={({ item }) => {
              return (
                
                <View style={styles.container}>
                  <View style={styles.innerContianer}>
                    <View style={styles.userContianer}>
                      <UserAvatar size={wp(9)} name={item.name} />
                      <Text style={styles.postedName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        ShareSocalMedia();
                      }}
                      activeOpacity={0.8}>
                      <Share />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: Colors.Primary,
                      fontSize: hp(1.5),
                      marginTop: hp(-1),
                      fontFamily: Fonts.POPPINS_SEMIBOLD,
                    }}>
                    {item.title}
                  </Text>
                  <Text style={styles.userPara}>{item?.short_description}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreensName.REVIEW, {item:item});
                    }}>
                    <Text style={styles.readMore}>{StringsName.readMore}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(1),
                      marginBottom: hp(5),
                      marginTop: hp(1.4),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        _MyPostDelte();
                      }}
                      activeOpacity={0.6}
                      style={styles.ViewEdit}>
                      <Text style={styles.ViewEditTxt}>Delete </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(
                          ScreensName.EDITIDEA,
                          // , { data: item  }
                        );
                      }}
                      activeOpacity={0.6}
                      style={[
                        styles.ViewEdit,
                        { backgroundColor: Colors.Primary },
                      ]}>
                      <Text style={[styles.ViewEditTxt, { color: Colors.White }]}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: hp(0.5),
                      width: '100%',
                      alignSelf: 'center',
                    }}>
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
                              {item?.totallikes}
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
                              {item?.totaldislikes}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.calenderContianer}>
                        <Calender width={wp(6)} />
                        <Text style={styles.containerDateTxt}>
                          {moment(item?.createddate).format('DD-MMMM-YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
    backgroundColor: Colors.White,
  },
  container: {
    backgroundColor: Colors.White,
    borderWidth: hp(0.1),
    borderColor: Colors.Primary,
    minHeight: hp(27),
    borderRadius: hp(2),
    paddingHorizontal: wp(2),
    marginBottom: hp(3),
    marginTop: hp(2),
    // height:200,
  },
  innerContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    alignItems: 'center',
    marginTop: hp(-1.3),
  },
  userContianer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  postedName: {
    width: wp(40),
    color: Colors.Black,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: hp(1.9),
    marginLeft: wp(1),
  },

  ideas: {
    color: Colors.Primary,
    fontSize: hp(1.5),
    marginTop: hp(-1),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
  },
  userPara: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: hp(1.5),
    paddingRight: wp(2.3),
    color: Colors.textBlack,
    paddingBottom: hp(3),
  },
  readMore: {
    color: Colors.Primary,
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: hp(1.6),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  ViewEdit: {
    borderWidth: wp(0.2),
    borderColor: Colors.Primary,
    width: '47%',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(1),
  },
  ViewEditTxt: {
    color: Colors.Primary,
    fontSize: hp(1.8),
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});
