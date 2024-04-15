import { View, Text, StyleSheet, Dimensions } from 'react-native'
import UserLogin from '../screens/UserLogin'
import Listings from '../screens/Listings'
import UserVerification from '../screens/UserVerification'
import UserRegistrationEmail from '../screens/UserRegistrationEmail'
import Post from '../screens/Post'
import Settings from '../screens/Settings'
import ListingItem from '../screens/ListingItem'
import AccountInformation from '../screens/AccountInformation'
import ListingsLoggedOut from '../screens/ListingsLoggedOut'
import Chat from '../screens/Chat'
import Home from './TabNavigator'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { enableScreens } from 'react-native-screens'
import { FontAwesome5 } from '@expo/vector-icons';

enableScreens();

import { NavigationContainer, TabRouter } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const Navigator: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUser ? (
            <>
                {width > 700 ? (
                    <>
                        <Stack.Screen name={'Chat'} component={Chat} options={{headerShown: false}}/>
                        <Stack.Screen name={'Listings'} component={Listings} options={{headerShown: false}}/>
                        <Stack.Screen name={'Post'} component={Post} options={{headerShown: false}}/>
                        <Stack.Screen name={'Settings'} component={Settings} options={{headerShown: false}}/>
                    </>
                ) : (
                    <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
                )}
                <Stack.Screen name={'ListingsLoggedOut'} component={ListingsLoggedOut} options={{headerShown: false}}/>
                <Stack.Screen name={'ListingItem'} component={ListingItem} options={{headerShown: false}}/>
                <Stack.Screen name={'AccountInformation'} component={AccountInformation} options={{headerShown: false}}/>
            </>
        ) : (
            <>
                <Stack.Screen name={'Login/SignUp'} component={UserLogin} options={{headerShown: false}} />
                <Stack.Screen name={'UserRegistrationEmail'} component={UserRegistrationEmail} options={{headerShown: false}} />
                <Stack.Screen name={'UserVerification'} component={UserVerification} options={{headerShown: false}} />
            </>    
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;