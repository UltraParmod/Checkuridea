import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../../Utails/Colors';
import {hp, wp} from '../../../../Utails/Responsive';
import Fonts from '../../../../Utails/Fonts';
import StringsName from '../../../../Utails/StringsName';
import {useNavigation} from '@react-navigation/native';
import Share from '../../../../Assets/Svg/Share.svg';
import FillHeart from '../../../../Assets/Svg/FillHeart.svg';
import LikeFillHeart from '../../../../Assets/Svg/LikeFillHeart.svg';
import UnFillHeart from '../../../../Assets/Svg/UnFillHeart.svg';
import UnLikeFillHeart from '../../../../Assets/Svg/UnLikeFillHeart.svg';
import Flag from '../../../../Assets/Svg/Flag.svg';
import Calender from '../../../../Assets/Svg/Calender.svg';
import ScreensName from '../../../../Utails/ScreensName';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FirstLetterCapital,
  ShareSocalMedia,
} from '../../../../Constants/ShareSocalMedia';
import Config from '../../../../Constants/Config';
import axios from 'axios';
import publicIP from 'react-native-public-ip';

// const limit = 3;
let loadMore = true;
const AllTab = () => {
  useEffect(() => {
    const un = navigation.addListener('focus', () => {
      setData([]);
      setSkip(0);
    });
    return un;
  }, [navigation]);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [ip, setIP] = useState(null);
  const [asyncStorageEmail, setAsyncStorageEmail] = useState(null);
  const [asyncStorageUserId, setAsyncStorageUserId] = useState(null);
  const [likeDislikeBackground, setLikeDislikeBackground] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Ip get
  useEffect(() => {
    publicIP()
      .then(ip => {
        setIP(ip);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  // dataofResult?.emailid get email id of user
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     _fetchData();
  //   })
  //   return unsubscribe
  // }, []);

  // asyncStorageEmail get emailId
  useEffect(() => {
    AsyncStorage.getItem('apiData')
      .then(storedData => {
        let data = JSON.parse(storedData);
        setAsyncStorageEmail(data?.emailid);
        setAsyncStorageUserId(data?.id);
      })
      .catch(error => {
        console.error('Error fetching data from AsyncStorage:', error);
      });
  }, []);
  // Like api  calling here
  const _Like = async (id, skip) => {
    // console.log('id :', id, skip);
    try {
      const payload = {
        ipaddress: ip,
        emailid: asyncStorageEmail,
        ideaid: id,
      };
      axios
        .post(Config.BaseUrl + Config.likesAPi + Config.Apikey, payload)
        .then(response => {
          const dataaa = JSON.parse(response?.data);
          if (dataaa[0]?.statusCode == 200) {
            // fetchData();
            _reloadData(skip, id);
            Toast.show({
              type: 'success',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
            // fetchData();
            _reloadData(skip, id);
            setLoading(false);
          } else {
            Toast.show({
              type: 'error',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text2: error,
      });
    }
  };
  // _DisLike api  calling here
  const _DisLike = async (id, skip) => {
    try {
      const payload = {
        ipaddress: ip,
        emailid: asyncStorageEmail,
        ideaid: id,
      };
      axios
        .post(Config.BaseUrl + Config.dislikeApi + Config.Apikey, payload)
        .then(response => {
          const dataaa = JSON.parse(response?.data);
          if (dataaa[0]?.statusCode == 200) {
            // fetchData();
            _reloadData(skip, id);
            Toast.show({
              type: 'success',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
            // fetchData();
            _reloadData(skip, id);
            setLoading(false);
          } else {
            Toast.show({
              type: 'error',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text2: error,
      });
    }
  };
  // LikeDislikeCheck api  calling here
  const _CheckLikeDisLike = async (id, skip) => {
    try {
      const payload = {
        ideaid: id,
        user_id: asyncStorageUserId,
      };
      axios
        .post(Config.BaseUrl + Config.likedislikeApi + Config.Apikey, payload)
        .then(response => {
          const dataaa = JSON.parse(response?.data);
          setLikeDislikeBackground(dataaa[0]?.body?.data[0]?.likedislike === 1

          );
          // console.log('like and dislike check ', dataaa[0]?.body?.data[0]?.likedislike === 1)
          if (dataaa[0]?.statusCode == 200) {
            // fetchData();
            _reloadData(skip, id);
            Toast.show({
              type: 'success',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
            // fetchData();
            _reloadData(skip, id);
            setLoading(false);
          } else {
            Toast.show({
              type: 'error',
              text1: dataaa[0]?.msg,
              text2: dataaa[0]?.msg,
            });
          }
        });
      // });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text2: error,
      });
    }
  };
  // reloadData Function calling
  const _reloadData = async (skip, id) => {
    try {
      const response = await fetch(
        `https://www.work4clients.in/checkidea/live/bdlogin/allidea.php?limit=${skip}&fixlimit=10&apikey=2024$$APIKEY$$2023`,
      );
      const jsonResponse = await response.json();
      const parsedData = JSON.parse(jsonResponse)[0].body?.data;

      // console.log('id data is here:', id);
      // console.log('data of body length:', parsedData?.length);

      const newData = parsedData?.find(e => e.ideaid == id);

      if (newData) {
        // console.log("Found new data:", newData);
        setData(prevData =>
          prevData.map(item =>
            item.ideaid == newData.ideaid ? {...newData, skip: skip} : item,
          ),
        );
      } else {
        console.log('No matching data found for id:', id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // #################################
  // // All post api Calling here ...Start
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.work4clients.in/checkidea/live/bdlogin/allidea.php?limit=${skip}&fixlimit=10&apikey=2024$$APIKEY$$2023`,
      );
      const jsonResponse = await response.json();
      const parsedData = JSON.parse(jsonResponse)[0].body.data;
      await AsyncStorage.setItem('apiDataBody', JSON.stringify(parsedData));
      if (parsedData == undefined) {
        loadMore = false;
      }
      const filterdAta = parsedData.map(e => {
        return {
          ...e,
          skip: skip,
        };
      });
      if (data.length == 0) {
        setData([...filterdAta]);
      } else {
        setData([...data, ...filterdAta]);
      }
      // setSkip(skip + 3)
      setShowLoader(false);
    } catch (error) {
      console.error(error);
    }
  };
  // #################################
    // #################################
    // All post api Calling here ...Start
    // const fetchData = async (id) => {
    //   try {
    //     const response = await fetch(
    //       `https://www.work4clients.in/checkidea/live/bdlogin/allidea.php?limit=${skip}&fixlimit=10&apikey=2024$$APIKEY$$2023`,
    //     );
    //     const jsonResponse = await response.json();
    //     const parsedData = JSON.parse(jsonResponse)[0].body.data;
    //     await AsyncStorage.setItem('apiDataBody', JSON.stringify(parsedData));
    //     if (parsedData == undefined) {
    //       loadMore = false;
    //     }
    //     const filterdAta = parsedData.map(e => {
    //       const likeStatusResponse =  axios.post(Config.BaseUrl + Config.likedislikeApi + Config.Apikey, {
    //         ideaid: id,
    //         user_id: asyncStorageUserId,
    //       });
    //       // const likeStatus = likeStatusResponse?.data?.likeStatus;
    //       const dataaa = JSON.parse(likeStatusResponse?.data);
    //       console.log('data is here...',dataaa )
    //       return {
    //         ...e,
    //         skip: skip,
    //       };
    //     });
    //     if (data.length == 0) {
    //       setData([...filterdAta]);
    //     } else {
    //       setData([...data, ...filterdAta]);
    //     }
    //     // setSkip(skip + 3)
    //     setShowLoader(false);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  useEffect(() => {
    fetchData();
  }, []);
  // All post api Calling here ...End
  // #################################
  const itemSeparatorComponent = useCallback(() => {
    return <View style={{height: hp(-1)}}></View>;
  }, [data]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <View style={styles.container}>
          <View style={styles.innerContianer}>
            <View
              style={{
                position: 'absolute',
                top: hp(10),
                right: wp(-5),
                zIndex: 999,
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor:
                  //   likeDislikeBackground == 1 ? Colors.Primary : null,
                  marginBottom: hp(2),
                  marginLeft: wp(0.7),
                  width: wp(7),
                  height: wp(7),
                  borderRadius: wp(7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: wp(0.5),
                }}
                onPress={() => {
                  _CheckLikeDisLike(item.ideaid);
                  _Like(item.ideaid, item.skip);
                  // fetchData()
                }}>
                  {
                  likeDislikeBackground 

                  ?
                  <LikeFillHeart width={30} />
                    :
                    <FillHeart width={30} />
                    // null

                  }
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  // backgroundColor:
                  //   likeDislikeBackground == 0 ? Colors.Primary : null,
                  marginBottom: hp(2),
                  marginLeft: wp(0.7),
                  width: wp(7),
                  height: wp(7),
                  borderRadius: wp(7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: wp(0.5),
                }}
                onPress={() => {
                  _CheckLikeDisLike(item.ideaid);
                  _DisLike(item.ideaid, item.skip);
                  // fetchData();
                }}>
                  {
                    likeDislikeBackground ?
                    <UnLikeFillHeart width={30} />
                    :
                    <UnFillHeart width={30} />
                  // null


                  }
              </TouchableOpacity>
            </View>
            <View style={styles.userContianer}>
              {/* <Text>{item.ideaid}</Text> */}
              <UserAvatar size={wp(9)} name={item.name} />
              <Text style={styles.postedName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.from}>from</Text>

              <Flag width={30} />
            </View>

            <TouchableOpacity
              style={{padding: hp(1)}}
              onPress={ShareSocalMedia}
              activeOpacity={0.8}>
              <Share />
            </TouchableOpacity>
          </View>
          <Text style={styles.ideas}>{item.title}</Text>
          <Text style={styles.userPara}>{item.short_description} </Text>
          <View
            style={{
              position: 'absolute',
              bottom: hp(0.5),
              width: '100%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreensName.REVIEW);
              }}>
              <Text style={styles.readMore}>{StringsName.readMore}</Text>
            </TouchableOpacity>
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
    },
    [data],
  );
  // const keyExtractor = useCallback(item => `${item.id}`);
  // const keyExtractor = useCallback((item) => item.id.toString(), []);
  const keyExtractor = useCallback((item, index) => {
    return item.id ? item.id.toString() : index.toString();
  }, []);

  const getItemLayout = useCallback(
    (data, index) => ({length: 10, offset: 1 * index, index}),
    [],
  );
  const onEndReached = () => {
    if (loadMore) {
      setShowLoader(true);
      setSkip(skip + 10);
      fetchData();
    }
  };
  const listFooterComponent = useCallback(() => {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.Primary}
        style={{marginVertical: 16}}
      />
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        // keyExtractor={keyExtractor}
        // keyExtractor={(item, index) => item.id || index.toString()}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        onEndReached={onEndReached}
        ListFooterComponent={listFooterComponent}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default AllTab;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    borderWidth: hp(0.1),
    borderColor: Colors.Primary,
    minHeight: hp(27),
    borderRadius: hp(2),
    paddingHorizontal: wp(2),
    marginBottom: hp(3),
    marginHorizontal: wp(6),
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
    width: wp(25),
    color: Colors.Black,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: hp(1.9),
    marginLeft: wp(1),
  },
  flag_india: {
    width: wp(7),
    height: hp(7),
    resizeMode: 'contain',
  },
  from: {
    marginHorizontal: wp(1),
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.Gray,
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
    paddingBottom: hp(5),
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
});
