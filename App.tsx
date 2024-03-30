import { View, Text, StyleSheet } from 'react-native'
import UserLogin from "./src/screens/UserLogin"
import Listings from './src/screens/Listings'
import UserRegistrationEmail from './src/screens/UserRegistrationEmail'
import Post from './src/screens/Post'
import Settings from './src/screens/Settings'
import ListingItem from './src/screens/ListingItem'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { enableScreens } from 'react-native-screens'
import { FontAwesome5 } from '@expo/vector-icons';

enableScreens();

import { NavigationContainer, TabRouter } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator initialRouteName={'Listings'} screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesome5 name="shopping-cart" size={focused ? 27 : 23} color={focused ? "#22cc5e" : "black"} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#22cc5e',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name={'Listings'} component={Listings} options={{headerShown: false, tabBarIcon: ({focused}) => {return <FontAwesome5 name="shopping-cart" size={focused ? 27 : 23} color={focused ? "#22cc5e" : "black"} />} }} />
      <Tab.Screen name={'Post'} component={Post} options={{headerShown: false, tabBarIcon: ({focused}) => {return <AntDesign name="pluscircleo" size={focused ? 27 : 23} color={focused ? "#22cc5e" : "black"} />} }} />
      <Tab.Screen name={'Settings'} component={Settings} options={{headerShown: false, tabBarIcon: ({focused}) => {return <Ionicons name="settings-sharp" size={focused ? 27 : 23} color={focused ? "#22cc5e" : "black"} />}}}/>
      {/* <Tab.Screen name={'Page'} component={Page} options={{headerShown: false}}/> */}
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Login/SignUp'} component={UserLogin} options={{headerShown: false}} />
        <Stack.Screen name={'UserRegistrationEmail'} component={UserRegistrationEmail} options={{headerShown: false}} />
        <Stack.Screen name={'Registration'} component={UserRegistrationEmail} options={{headerShown: false}} />
        <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
        <Stack.Screen name={'ListingItem'} component={ListingItem} options={{headerShown: false}}/>
        {/*<Stack.Screen name={'Listings'} component={Listings} options={{headerShown: false}} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App