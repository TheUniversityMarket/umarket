import { View, Text, StyleSheet } from 'react-native'
import UserLogin from "./src/screens/UserLogin"
import Listings from './src/screens/Listings'
import UserRegistration from './src/screens/UserRegistration'
import Post from './src/screens/Post'
import Settings from './src/screens/Settings'

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
      <Tab.Screen name={'Listings'} component={Listings} options={{headerShown: false}} />
      <Tab.Screen name={'Post'} component={Post} options={{headerShown: false}} />
      <Tab.Screen name ={'Settings'} component={Settings} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Login/SignUp'} component={UserLogin} options={{headerShown: false}} />
        <Stack.Screen name={'Registration'} component={UserRegistration} options={{headerShown: false}} />
        <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
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