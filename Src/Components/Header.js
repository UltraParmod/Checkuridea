
import React, { useState } from 'react'
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePath from '../Utails/ImagePath'
import { hp, wp } from '../Utails/Responsive'
import Colors from '../Utails/Colors'
import MenuLogo from '../Assets/Svg/menuLogo.svg'
import SideMenu from '../Assets/Svg/SideMenu.svg'


const Header = ({ navigation }) => {



return (
<View style={styles.container}>

<View style={styles.menuContianer}>
<TouchableOpacity activeOpacity={.8} onPress={() => {
navigation.toggleDrawer()
}}
style={styles.menu}
>

<SideMenu width={28} height={16} />
</TouchableOpacity>
<MenuLogo style={styles.menuLogo} />
</View>
<Image source={ImagePath.userProfile} style={styles.userProfile} />



</View >
)
}

export default Header

const styles = StyleSheet.create({
container: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',

},
menu: {
backgroundColor: Colors.White,
paddingVertical: 2,
},
menuLogo: {
marginHorizontal: wp(2),
},
menuContianer: {
flexDirection: 'row',
alignItems: 'center'
},
userProfile: {
width: wp(10),
height: hp(12),
resizeMode: 'contain'
}
})
