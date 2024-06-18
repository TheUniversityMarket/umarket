import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import Listings from '../screens/Listings'
import Chat from '../screens/Chat';
import Post from '../screens/Post'
import Settings from '../screens/Settings'
import ListingItem from '../screens/ListingItem';
import React from 'react';
import { useWindowDimensions, Text, View, SafeAreaView } from 'react-native';
import { Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function DrawerHome() {

    const {height, width, scale, fontScale} = useWindowDimensions();
    const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
  
    //Default guideline sizes are based on standard ~5" screen mobile device
    const guidelineBaseWidth = 350;
    const guidelineBaseHeight = 680;
  
    function scaleIt(size: number) {
        return shortDimension / guidelineBaseWidth * size;
    }
    function verticalScale(size: number) {
        return longDimension / guidelineBaseHeight * size;
    }
    function moderateScale(size: number, factor = 0.5) {
        return size + (scaleIt(size) - size) * factor;
    }
    function moderateVerticalScale(size: number, factor = 0.5) {
        return size + (verticalScale(size) - size) * factor;
    }

    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={ {drawerStyle: {backgroundColor: 'white'}}}
            drawerContent={
                (props) => {
                return (
                    <SafeAreaView>
                        <View style={{width: "100%", height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(34 197 94)", marginBottom: 10}}>
                            {width < 700 ? <Text style={{fontWeight: "bold", color: "white", fontSize: moderateScale(53)}}>UMarket</Text> : null}
                        </View>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                )
                }
            }
        >
            <Drawer.Screen name={'Listings'} component={Listings} options={{headerShown: false, drawerActiveBackgroundColor: "rgb(34 197 94)", drawerLabel: ({focused}) => {return <Text style={{color: focused ? "white" : "rgb(34 197 94)", fontWeight: "bold"}}>Listings</Text>}, drawerIcon: ({focused}) => {return <FontAwesome6 name="list" style={{marginRight: -20}} size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "white" : "rgb(34 197 94)"} />}}}/>
            <Drawer.Screen name={'Chat'} component={Chat} options={{headerShown: false, drawerActiveBackgroundColor: "rgb(34 197 94)", drawerLabel: ({focused}) => {return <Text style={{color: focused ? "white" : "rgb(34 197 94)", fontWeight: "bold"}}>Chat</Text>}, drawerIcon: ({focused}) => {return <Ionicons name="chatbox" style={{marginRight: -20}} size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "white" : "rgb(34 197 94)"} />}}}/>
            <Drawer.Screen name={'Post'} component={Post} options={{headerShown: false, drawerActiveBackgroundColor: "rgb(34 197 94)", drawerLabel: ({focused}) => {return <Text style={{color: focused ? "white" : "rgb(34 197 94)", fontWeight: "bold"}}>Post</Text>}, drawerIcon: ({focused}) => {return <AntDesign name="pluscircleo" style={{marginRight: -20}} size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "white" : "rgb(34 197 94)"} />}}}/>
            <Drawer.Screen name={'Settings'} component={Settings} options={{headerShown: false, drawerActiveBackgroundColor: "rgb(34 197 94)", drawerLabel: ({focused}) => {return <Text style={{color: focused ? "white" : "rgb(34 197 94)", fontWeight: "bold"}}>Settings</Text>}, drawerIcon: ({focused}) => {return <Ionicons name="settings-sharp" style={{marginRight: -20}} size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "white" : "rgb(34 197 94)"} />}}}/>
            <Drawer.Screen name={'ListingItem'} component={ListingItem} options={{headerShown: false, drawerLabel: () => null, drawerActiveBackgroundColor: "white"}}/>

        </Drawer.Navigator>
    );
}

export default DrawerHome;