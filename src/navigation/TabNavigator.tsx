import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Listings from '../screens/Listings'
import Post from '../screens/Post'
import Settings from '../screens/Settings'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { enableScreens } from 'react-native-screens'
import { FontAwesome5 } from '@expo/vector-icons';

enableScreens();

import { NavigationContainer, TabRouter } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { moderateScale } from '../components/Scaling';

const Tab = createBottomTabNavigator()

function Home() {
    return (
      <Tab.Navigator initialRouteName={'Listings'} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name="shopping-cart" size={focused ? 27 : 23} color={focused ? "#22cc5e" : "black"} />;
        },
      })}
      screenOptions={{
        "tabBarActiveTintColor": "#22cc5e",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      }}>
        <Tab.Screen name={'Listings'} component={Listings} options={{headerShown: false, tabBarIcon: ({focused}) => {return <FontAwesome5 name="shopping-cart" size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "#22cc5e" : "black"} />} }} />
        <Tab.Screen name={'Post'} component={Post} options={{headerShown: false, tabBarIcon: ({focused}) => {return <AntDesign name="pluscircleo" size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "#22cc5e" : "black"} />} }} />
        <Tab.Screen name={'Settings'} component={Settings} options={{headerShown: false, tabBarIcon: ({focused}) => {return <Ionicons name="settings-sharp" size={focused ? (moderateScale(23) > 30 ? 30 : moderateScale(23)) : (moderateScale(20) > 27 ? 27 : moderateScale(20))} color={focused ? "#22cc5e" : "black"} />}}}/>
        {/* <Tab.Screen name={'Page'} component={Page} options={{headerShown: false}}/> */}
      </Tab.Navigator>
    )
}

export default Home;