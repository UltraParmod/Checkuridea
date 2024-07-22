import React, { useCallback, useEffect, useState } from 'react';
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
import { hp, wp } from '../../../../Utails/Responsive';
import Fonts from '../../../../Utails/Fonts';
import StringsName from '../../../../Utails/StringsName';
import { useNavigation } from '@react-navigation/native';
import Share from '../../../../Assets/Svg/Share.svg';
import FillHeart from '../../../../Assets/Svg/FillHeart.svg';
import UnFillHeart from '../../../../Assets/Svg/UnFillHeart.svg';
import Flag from '../../../../Assets/Svg/Flag.svg';
import Calender from '../../../../Assets/Svg/Calender.svg';
import ScreensName from '../../../../Utails/ScreensName';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import { ShareSocalMedia } from '../../../../Constants/ShareSocalMedia';
import publicIP from 'react-native-public-ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../../../Constants/Config';

// const limit = 3;
let loadMore = true;
const RandomTab = () => {
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
    const [like, setLike] = useState();
    const [disLike, setDisLike] = useState();
    const [ip, setIP] = useState(null);
    const [asyncStorageEmail, setAsyncStorageEmail] = useState(null);
    const [asyncStorageUserId, setAsyncStorageUserId] = useState(null);
    const [likeDislikeBackground, setLikeDislikeBackground] = useState();


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
            // asyncStorageEmail get emailId
        useEffect(() => {
          AsyncStorage.getItem('apiData')
            .then(storedData => {
              let data = JSON.parse(storedData);
              setAsyncStorageEmail(data?.emailid);
              setAsyncStorageUserId(data?.id);
            //   console.log('data?.emailid',asyncStorageEmail)
            //   console.log('data?.id',asyncStorageUserId)
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
          // fetchData()
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
          // fetchData()
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
                  setLikeDislikeBackground(dataaa[0]?.body?.data[0]);
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
    const _reloadData = async (skip,id) => {
        try {
          const response = await fetch(
            `https://www.work4clients.in/checkidea/live/bdlogin/allidea.php?limit=${skip}&fixlimit=10&apikey=2024$$APIKEY$$2023`
          );
          const jsonResponse = await response.json();
          const parsedData = JSON.parse(jsonResponse)[0].body?.data;
          // console.log('data of body length:', parsedData?.length);
          const newData = parsedData?.find(e => e.ideaid == id);
          if (newData) {
            // console.log("Found new data:", newData);
            setData(prevData =>
              prevData.map(item =>
                item.ideaid == newData.ideaid ? {...newData,skip:skip } : item
              )
            );
          } else {
            console.log("No matching data found for id:", id);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    // #####################################
    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://www.work4clients.in/checkidea/live/bdlogin/randomidea.php?limit=${skip}&fixlimit=10&apikey=2024$$APIKEY$$2023`);
            const jsonResponse = await response.json();
            const parsedData = JSON.parse(jsonResponse)[0].body.data;
            //   console.log('hii data is here01..', parsedData);
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
    useEffect(() => {
        fetchData();
    }, []);

    const itemSeparatorComponent = useCallback(() => {
        return <View style={{ height: hp(-1) }}></View>;
    }, [data]);

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <View style={styles.container}>
                    <View style={styles.innerContianer}>
                        <View
                            style={{
                                position: 'absolute',
                                top: hp(10),
                                right: wp(-6),
                                zIndex: 999,
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    _CheckLikeDisLike(item.ideaid);
                                    _Like(item.ideaid, item.skip);
                                }}>
                                <FillHeart width={30} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginTop: hp(0.5) }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    _CheckLikeDisLike(item.ideaid);
                                    _DisLike(item.ideaid,item.skip);
                                }}>
                                <UnFillHeart width={30} />
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
                            onPress={() => {
                                ShareSocalMedia()
                            }}
                            activeOpacity={0.8}>
                            <Share />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.ideas}>{item.title}</Text>
                    <Text style={styles.userPara}>{item.short_description} </Text>
                    <View style={{ position: 'absolute', bottom: hp(.5), width: '100%', alignSelf: 'center' }}>
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
                                    {/* {item?.createddate} */}
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
    const keyExtractor = useCallback((item, index) => {
        return item.id ? item.id.toString() : index.toString();
    }, []);

    const getItemLayout = useCallback((data, index) => (
        { length: 10, offset: 1 * index, index }
    ), []);
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
                style={{ marginVertical: 16 }}
            />
        );
    }, []);

    return (
        <View style={{ flex: 1 }}>
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

export default RandomTab;

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
        paddingBottom: hp(7)
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
