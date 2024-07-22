import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import DrawerContent from './DrawerContent';
import ScreensName from '../Utails/ScreensName';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Review from '../Screens/BootomTabScreen/Home/HomeComponents.js/Screens/Review';
import PostYourIdea from '../Screens/BootomTabScreen/PostYourIdea/PostYourIdea';

const Drawer = createDrawerNavigator();

export default DrawerNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      // initialRouteName={ScreensName.MYIDEA}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={ScreensName.BOTTOMNAVIGATION}
        component={BottomNavigation}
      />
      <Drawer.Screen
        name={'pp'}
        component={PostYourIdea}
        // options={{
        //     tabBarLabel: '',
        //     tabBarIcon: ({ focused }) => (

        //         <View
        //             style={{
        //                 width: wp(19),
        //                 height: wp(19),
        //                 borderRadius: wp(19),
        //                 tintColor: focused ? Colors.MainColor : Colors.White,
        //                 marginBottom: hp(6.5),
        //                 borderWidth: wp(3),
        //                 borderColor: Colors.White,
        //             }}>
        //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        //                  <AddIcon
        //                 // width={100}
        //                 // style={{ position: 'relative', left: wp(-1), top: hp(-0.3) }}
        //                  />

        //                 {/* tabBarIcon */}

        //             </View>

        //         </View>

        //     ),
        // }}
      />
    </Drawer.Navigator>
  );
};
